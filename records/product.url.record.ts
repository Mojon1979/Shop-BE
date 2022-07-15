import { UrlProductEntity } from '../types';
import { poll } from '../utils/db';

export class ProductUrlRecord implements UrlProductEntity {
  id?: number;

  idProd: string;

  url: string;

  constructor(idProd: string, url: string) {
    this.idProd = idProd;
    this.url = url;
  }

  async insert(): Promise<void> {
    await poll.execute(
      'INSERT INTO product_url (idProd, url) VALUES (:idProd, :url)',
      {
        idProd: this.idProd,
        url: this.url,
      }
    );
  }

  async update(): Promise<void> {
    await poll.execute(
      'UPDATE product_url SET url = :url WHERE idProd = :idProd',
      {
        idProd: this.idProd,
        url: this.url,
      }
    );
  }

  async delete(): Promise<void> {
    await poll.execute('DELETE FROM product_url WHERE idProd = :idProd', {
      idProd: this.idProd,
    });
  }
}
