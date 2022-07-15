import { Request, Response, Router } from 'express';
import {
  AddProductRes,
  DeleteProductRes,
  GetAllProductsRes,
  GetOneProductForAdminRes,
  NewProductEntity,
  UserRole
} from '../types';
import { ProductRecord } from '../records/product.record';

export const adminRouter = Router();

adminRouter

  .get('/', async (req: Request, res: Response) => {
    const productsList: GetAllProductsRes[] = await ProductRecord.getAllProducts(UserRole.Admin);
    res.json(productsList);
  })

  .post('/add', async (req: Request, res: Response) => {
    const data: NewProductEntity = req.body;
    const newProduct = new ProductRecord(data);
    const addProduct: AddProductRes = await newProduct.insert();
    res.json(addProduct);
  })

  .get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const product: GetOneProductForAdminRes = await ProductRecord.getOneProduct(id, UserRole.Admin);
    res.json(product);
  })

  .delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const product: GetOneProductForAdminRes = await ProductRecord.getOneProduct(id, UserRole.Admin);

    if (!product) {
      res.json({
        isDelete: false
      } as DeleteProductRes)
    }

    const deleteProduct = new ProductRecord(product);
    await deleteProduct.delete();

    res.json({
      isDelete: true,
      id,
    } as DeleteProductRes)
  });
