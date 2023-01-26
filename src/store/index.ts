import { createStore } from 'vuex';
import { getAllProducts, getProduct, IAttribute, IProduct, IVariant } from '@/services/api-service';
import { cloneDeep } from 'lodash';

export interface IMonolithState {
  products: IProduct[];
  product?: IProduct;
  attributes?: IAttribute[];
  variants?: IVariant[]
}
export default createStore({
  state: (): IMonolithState => ({
    products: [],
    product: {},
    attributes: [],
    variants: [],
  }),

  getters: {
    products: (state): IProduct[] | undefined => state.products,
    product: (state): IProduct | undefined => state?.product,
    attributes: (state): IAttribute[] | undefined => state.attributes,
    variants: (state): IVariant[] | undefined => state.variants,
  },
  mutations: {
    setProducts(state: IMonolithState, products: IProduct[]): void {
      state.products = products;
    },
    setProduct(state: IMonolithState, product: IProduct): void {
      state.product = product;
    },
    setAttributes(state: IMonolithState, attributes: IAttribute[]): void {
      state.attributes = cloneDeep(attributes);
    },
    setVariants(state: IMonolithState, variants: IVariant[]): void {
      state.variants = variants;
    },
  },
  actions: {
    async loadProducts({ commit }) {
      try {
        const response = await getAllProducts();

        commit('setProducts', response.data?.data);
      } catch (error) {
        console.log(error);
      }
    },
    async loadProduct({ commit }, id) {
      try {
        const response = await getProduct(id);

        const product = response?.data?.data;
        const attributes = response.data?.data?.attributes;
        const variants = response.data?.data?.variants;

        commit('setProduct', product);
        commit('setAttributes', attributes);
        commit('setVariants', variants);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
