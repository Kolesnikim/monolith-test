import { createStore } from 'vuex';
import {
  getAllProducts,
  getProduct,
} from '@/core/services/api-service';
import { cloneDeep } from 'lodash';
import stringComparator from '@/helpers/helpers';
import {
  IAttribute,
  IMonolithState,
  IProduct,
  IVariant,
  IVariantsID,
} from '@/core/types/core.types';

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

        const product: IProduct = response?.data?.data;
        const defaultAttributes: IAttribute[] = response.data?.data?.attributes;
        const defaultVariants: IVariant[] = response.data?.data?.variants;

        const transformedVariants = defaultVariants.map((variant) => {
          const variantsById = variant.labels.reduce((acc: IVariantsID, cur) => {
            acc[cur.attribute_id] = cur.label_id;
            acc.variantIdentifier = !acc.variantIdentifier ? `${cur.attribute_id}${cur.label_id}` : `${acc.variantIdentifier}${cur.attribute_id}${cur.label_id}`;
            acc[`attribute${cur.attribute_id}`] = cur.label_id;

            if (!acc.hasOwnProperty('customAttributes')) {
              acc.customAttributes = {};
            }

            // @ts-ignore
            acc.customAttributes[cur.attribute_id] = cur.label_id;
            return acc;
          }, {});

          return {
            ...variant,
            ...variantsById,
          };
        });

        transformedVariants.forEach((variant) => {
          variant.variantIdentifier = variant.variantIdentifier
            .split('')
            .sort(stringComparator)
            .join('');
        });

        commit('setProduct', product);
        commit('setAttributes', defaultAttributes);
        commit('setVariants', transformedVariants);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
