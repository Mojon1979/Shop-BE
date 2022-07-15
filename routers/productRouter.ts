import { Request, Response, Router } from 'express';
import { ProductRecord } from '../records/product.record';
import { GetAllProductsRes, GetOneProductRes, UserRole } from '../types';

export const productRouter = Router();

productRouter

  .get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const product: GetOneProductRes = await ProductRecord.getOneProduct(
      id,
      UserRole.User
    );
    res.json(product);
  })

  .get('/:offset/:count', async (req: Request, res: Response) => {
    const { offset, count } = req.params;
    const productsList: GetAllProductsRes[] =
      await ProductRecord.getAllProducts(
        Number(offset),
        Number(count),
        UserRole.User
      );
    res.json(productsList);
  });
