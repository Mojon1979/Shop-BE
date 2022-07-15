import { CountProductEntity } from '../types';
import { poll } from '../utils/db';

export class ProductCountRecord implements CountProductEntity {
  id: string;

  count: number;

  constructor(id: string, count: number) {
    this.id = id;
    this.count = count;
  }

  async insert(): Promise<void> {
    await poll.execute(
      'INSERT INTO product_count (id, count) VALUES (:id, :count)',
      {
        id: this.id,
        count: this.count,
      }
    );
  }

  async update(): Promise<void> {
    await poll.execute(
      'update product_count SET count = :count WHERE id = :id',
      {
        id: this.id,
        count: this.count,
      }
    );
  }

  async delete(): Promise<void> {
    await poll.execute('DELETE FROM product_count WHERE id = :id', {
      id: this.id,
    });
  }
}
