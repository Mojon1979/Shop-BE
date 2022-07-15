import { Request, Response, Router } from 'express';
import { ProductRecord } from '../records/product.record';
import { GetAllProductsRes, GetOneProductRes, UserRole } from '../types';

export const productRouter = Router();

productRouter

  .get('/', async (req: Request, res: Response) => {
    const productsList: GetAllProductsRes[] = await ProductRecord.getAllProducts(UserRole.User);
    res.json(productsList);
  })

  .get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const product: GetOneProductRes = await ProductRecord.getOneProduct(id, UserRole.User);
    res.json(product);
  })
