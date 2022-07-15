export interface CountProductEntity {
  id: string;
  count: number;
}

export interface UrlProductEntity {
  id?: number;
  idProd: string;
  url: string;
}

export interface ProductEntity extends Omit<UrlProductEntity, 'id' | 'idProd'> {
  id?: string;
  name: string;
  description: string;
  price: number;
  url: string;
  count?: number;
  createAT?: string;
  endAT?: string;
  modifyAT?: string;
}

export type NewProductEntity = Omit<
  ProductEntity,
  'createAT' | 'endAT' | 'modifyAT'
>;

export type GetOneProductRes = Omit<NewProductEntity, 'count'>;

export type GetOneProductForAdminRes = Omit<
  ProductEntity,
  'createAT' | 'modifyAT'
>;

export type GetAllProductsRes = Omit<NewProductEntity, 'description'>;

export type DeleteProductRes =
  | {
      isDelete: false;
    }
  | {
      isDelete: true;
      id: string;
    };

export interface AddProductRes {
  id: string;
  name: string;
}
