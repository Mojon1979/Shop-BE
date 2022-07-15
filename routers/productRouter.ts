import { Request, Response, Router } from 'express';
import { ProductRecord } from '../records/product.record';

export const productRouter = Router();

productRouter

  .get('/', async (req: Request, res: Response) => {
    const productsList = await ProductRecord.getAllProducts();
    res.json(productsList);
  })

  .get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await ProductRecord.getOneProduct(id);
    console.log(product);
    res.json(product);
  })
