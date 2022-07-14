import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { poll } from '../utils/db';
import {
  AddProductRes,
  GetAllProductsRes,
  NewProductEntity,
  ProductEntity,
} from '../types';
import { ValidationError } from '../utils/error';
import { ProductCountRecord } from './product.count.record';

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
      throw new ValidationError('\n' +
        'Url must be a string of no more than 100 characters.')
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

    await ProductCountRecord.insert(this.id, this.count);

    return {
      id: this.id,
      name: this.name,
    };
  }

  async delete(): Promise<void> {
    await ProductCountRecord.delete(this.id);

    await poll.execute('DELETE FROM product WHERE id = :id', {
      id: this.id,
    });
  }

  static async getAllProducts(): Promise<GetAllProductsRes[] | null> {
    const [results] = (await poll.execute(
      'SELECT p.id, p.name, p.price, u.url  ' +
        'FROM product p ' +
        'INNER JOIN product_url u on u.idProd = p.id ' +
        'WHERE p.endAT is null '
    )) as ProductRecordResult;

    return results.length === 0
      ? null
      : results.map((result) => {
          const { id, name, price, url } = result;
          return { id, name, price, url };
        });
  }
}
