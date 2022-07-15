import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { poll } from '../utils/db';
import {
  AddProductRes,
  GetAllProductsRes,
  GetOneProductForAdminRes,
  GetOneProductRes,
  NewProductEntity,
  ProductEntity,
  UserRole,
} from '../types';
import { ValidationError } from '../utils/error';
import { ProductCountRecord } from './product.count.record';
import { ProductUrlRecord } from './product.url.record';

type ProductRecordResult = [ProductEntity[], FieldPacket[]];

export class ProductRecord implements ProductEntity {
  id?: string;

  name: string;

  description: string;

  price: number;

  url: string;

  count: number;

  createAT?: string;

  endAT?: string;

  modifyAT?: string;

  constructor(obj: NewProductEntity) {
    const { id, name, description, price, url, count } = obj;

    if (typeof name !== 'string' || !name || name.length > 35) {
      throw new ValidationError(
        'Product name cannot be empty and cannot exceed 35 characters.'
      );
    }

    if (
      typeof description !== 'string' ||
      !description ||
      description.length > 255
    ) {
      throw new ValidationError(
        'Product description cannot be empty and cannot exceed 255 characters.'
      );
    }

    if (typeof price !== 'number' || price <= 0 || price > 999999.99) {
      throw new ValidationError(
        'Price must be greater than 0, and must not exceed an amount greater than 999 999.99.'
      );
    }

    if (typeof url !== 'string' || !url || url.length > 100) {
      throw new ValidationError(
        '\n' + 'Url must be a string of no more than 100 characters.'
      );
    }

    if (typeof count !== 'number' || count < 0) {
      throw new ValidationError(
        'The number of products must be a number greater than or equal to 0.'
      );
    }

    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.url = url;
    this.count = count;
  }

  async insert(): Promise<AddProductRes> {
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error(
        'The product with this ID already exists in the database!.'
      );
    }

    await poll.execute(
      'INSERT INTO product (id, name, description, price) VALUES ' +
        '(:id, :name, :description, :price)',
      {
        id: this.id,
        name: this.name,
        description: this.description,
        price: this.price,
      }
    );

    const countItem = new ProductCountRecord(this.id, this.count);
    await countItem.insert();
    const urlItem = new ProductUrlRecord(this.id, this.url);
    await urlItem.insert();

    return {
      id: this.id,
      name: this.name,
    };
  }

  async update(): Promise<void> {
    const sql = `
      UPDATE product SET
        name = :name
        , description = :description
        , price = :price
        , modifyAT = current_timestamp()
      WHERE
        id = :id
    `;

    await poll.execute(sql, {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
    });
    const countItem = new ProductCountRecord(this.id, this.count);
    await countItem.update();
    const urlItem = new ProductUrlRecord(this.id, this.url);
    await urlItem.update();
  }

  async delete(): Promise<void> {
    const countItem = new ProductCountRecord(this.id, this.count);
    await countItem.delete();
    const urlItem = new ProductUrlRecord(this.id, this.url);
    await urlItem.delete();

    await poll.execute('DELETE FROM product WHERE id = :id', {
      id: this.id,
    });
  }

  static async getOneProduct(
    id: string,
    role: UserRole
  ): Promise<GetOneProductRes | GetOneProductForAdminRes | null> {
    const sql =
      role === UserRole.User
        ? `
      SELECT p.id, p.name, p.description, p.price, u.url 
      FROM product p 
        INNER JOIN product_url u on u.idProd = p.id
      WHERE
        p.endAT is null
        and p.id = :id
    `
        : `
      SELECT p.id, p.name, p.description, p.price, u.url, c.count, p.endAT 
      FROM product p 
        INNER JOIN product_url u on u.idProd = p.id
        INNER JOIN product_count c on p.id = c.id
      WHERE
        p.id = :id
    `;

    const [results] = (await poll.execute(sql, {
      id,
    })) as ProductRecordResult;

    return results.length === 0 ? null : results[0];
  }

  static async getAllProducts(
    offset: number,
    count: number,
    role: UserRole
  ): Promise<GetAllProductsRes[] | null> {
    const sql = `
      SELECT a.id, a.name, a.price, a.url, b.count
      FROM (
            SELECT p.id, p.name, p.price, u.url 
            FROM product p
                INNER JOIN product_url u on u.idProd = p.id
                ${role === UserRole.User ? 'WHERE p.endAT is null' : ''}
            )a INNER JOIN (
                SELECT id, COUNT(*) count
                FROM product
            )b
      LIMIT :offset, :count
    `;

    const [results] = (await poll.execute(sql, {
      offset,
      count,
    })) as ProductRecordResult;

    return results.length === 0
      ? null
      : results.map((result) => {
          const { id, name, price, url, count } = result;
          return { id, name, price, url, count };
        });
  }
}
