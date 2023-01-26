<template>
  <div class="products">
    <h2 class="products-header">Products</h2>
    <div class="products-container">
      <MonolithProductCard
        v-for="product in products"
        :key="product.id"
        :is-special-offer="product.direct_sale.is_direct"
        :discount-price="product.discount_price"
        :id="product.id"
        :image-url="imager(product.images[0].url, 281, 70)"
        :price="product.max_price"
        :title="product.title"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import MonolithProductCard from '@/components/ProductCard.vue';

export default defineComponent({
  name: 'ProductsView',
  components: {
    MonolithProductCard,
  },
  mounted() {
    this.loadProducts();
  },
  computed: {
    ...mapGetters(['products']),
  },
  methods: {
    ...mapMutations(['setProducts']),
    ...mapActions(['loadProducts']),
  },
});
</script>

<style lang="scss">
.products {
  width: 75%;
  height: 100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  &-header {
    margin: 72.4px 0 79.6px;
    font-size: 28px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.11;
    letter-spacing: 5.6px;
    text-align: center;
    color: #363636;
    text-transform: uppercase;
  }

  &-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(281px, 1fr));
    justify-content: center;
    justify-items: center;
    grid-auto-rows: 450px;
    grid-column-gap: 43px;
    grid-row-gap: 10px;
  }

  &-pagination {
    display: block;
  }
}
</style>
