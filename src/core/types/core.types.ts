export interface IImage {
  title: string,
  url: string
}
export interface ILabel {
  id: string,
  title: string,
  data: string
}

export interface IVariantsID {
  [id: string | number]: number | string | object;
}
export interface ICustomLabel {
  [id: string | number]: ILabel
}

export interface ILabelAttribute {
  attribute_id: string,
  label_id: string
}
export interface IVariant {
  id: string,
  title: string,
  image: IImage,
  labels: ILabelAttribute[],
  variantIdentifier: string,
  price: number,
}

export interface IAttribute {
  id: string,
  title: string,
  type: string,
  labels: ILabel[],
}
export interface IDirectSale {
  is_direct: boolean;
  type: string;
}

export interface IProduct {
  id?: string,
  direct_sale?: IDirectSale
  discount_price?: string
  title?: string,
  description?: string,
  images?: IImage[],
  min_price?: number,
  max_price?: number,
  variants?: IVariant[]
  attributes?: IAttribute[],
}

export interface IMonolithState {
  products: IProduct[];
  product?: IProduct;
  attributes?: IAttribute[];
  variants?: IVariant[]
}

