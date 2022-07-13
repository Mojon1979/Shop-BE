import { CountProductEntity } from '../types';
import { poll } from '../utils/db';

export class ProductCountRecord implements CountProductEntity {
  id: string;

  count: number;

  static async insert(id: string, count: number): Promise<void> {
    await poll.execute(
      'INSERT INTO product_count (id, count) VALUES (:id, :count)',
      {
        id,
        count,
      }
    );
  }

  static async delete(id: string): Promise<void> {
    await poll.execute('DELETE FROM product_count WHERE id = :id', {
      id,
    });
  }
}
