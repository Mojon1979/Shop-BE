import { Request, Response, Router } from 'express';
import {
  AddProductRes,
  DeleteProductRes,
  GetAllProductsRes,
  GetOneProductForAdminRes,
  NewProductEntity, ProductEntity,
  UserRole
} from '../types';
import { ProductRecord } from '../records/product.record';

export const adminRouter = Router();

adminRouter

  .post('/add', async (req: Request, res: Response) => {
    const data: NewProductEntity = req.body;
    const newProduct = new ProductRecord(data);
    const addProduct: AddProductRes = await newProduct.insert();
    res.json(addProduct);
  })

  .patch('/card', async (req: Request, res: Response) => {
    const data: ProductEntity = req.body;
    const product = new ProductRecord(data);
    await product.update();
    const updatedProduct: GetOneProductForAdminRes = await ProductRecord.getOneProduct(product.id, UserRole.Admin);
    res.json(updatedProduct);
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
  })

  .get('/:offset/:count', async (req: Request, res: Response) => {
    const { offset, count } = req.params;
    const productsList: GetAllProductsRes[] = await ProductRecord.getAllProducts(Number(offset), Number(count), UserRole.Admin);
    res.json(productsList);
  });
