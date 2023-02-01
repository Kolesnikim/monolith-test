import axios from 'axios';

const GET_ALL_PRODUCTS_URL = 'catalog/getAll';
const GET_PRODUCT_URL = 'catalog/get';
const ADD_TO_CART_URL = 'cart/add';

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
