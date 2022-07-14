export interface CountProductEntity {
  id: string;
  count: number;
}

export interface UrlProductEntity {
  id?: number;
  idProd: string;
  url: string;
}

export interface ProductEntity extends Omit<CountProductEntity, 'id'>, Omit<UrlProductEntity, 'id' | 'idProd'> {
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

export type GetAllProductsRes = Omit<NewProductEntity, 'count' | 'description'>;

export interface AddProductRes {
  id: string;
  name: string;
}
