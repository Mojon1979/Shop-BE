import { UrlProductEntity } from '../types';
import { poll } from '../utils/db';

export class ProductUrlRecord implements UrlProductEntity {
  id?: number;

  idProd: string;

  url: string;

  static async insert(idProd: string, url: string): Promise<void> {
    await poll.execute(
      'INSERT INTO product_url (idProd, url) VALUES (:idProd, :url)',
      {
        idProd,
        url,
      }
    );
  }

  static async delete(idProd: string): Promise<void> {
    await poll.execute('DELETE FROM product_url WHERE idProd = :idProd', {
      idProd,
    });
  }
}
