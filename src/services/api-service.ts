import axios from 'axios';

const GET_ALL_PRODUCTS_URL = 'catalog/getAll';
const GET_PRODUCT_URL = 'catalog/get';
const ADD_TO_CART_URL = 'cart/add';

export interface IImage {
  title: string,
  url: string
}
export interface ILabel {
  id: string,
  title: string,
  data: string
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

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function imager(
  url: string,
  size = 1000,
  quality = 70,
) {
  return `https://fedtest.monolith.co.il/api/imager.php?url=${url}&type=fit&width=${size}&height=${size}&quality=${quality}`;
}
export const getAllProducts = () => httpClient.get(GET_ALL_PRODUCTS_URL);
export const getProduct = (id: string) => httpClient.get(`${GET_PRODUCT_URL}?id=${id}`);
export const addToCart = (variantId: string, quantity: number) => httpClient.get(`${ADD_TO_CART_URL}?variant_id=${variantId}&quantity=${quantity}`);
