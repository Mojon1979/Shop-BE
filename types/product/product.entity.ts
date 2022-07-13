export interface CountProductEntity {
  id: string;
  count: number;
}

export interface ProductEntity extends Omit<CountProductEntity, 'id'> {
  id?: string;
  name: string;
  description: string;
  price: number;
  createAT?: string;
  endAT?: string;
  modifyAT?: string;
}

export type NewProductEntity = Omit<
  ProductEntity,
  'createAT' | 'endAT' | 'modifyAT'
>;

export type GetAllProductsToShopRes = Omit<NewProductEntity, 'count'>;

export interface AddProductRes {
  id: string;
  name: string;
}
