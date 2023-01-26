<template>
  <router-link
    :to="'/product/' + id"
    class="product-card__link"
  >
    <div class="product-card">
      <span
        v-if="isSpecialOffer"
        class="product-card__special-offer"
      >
        Special Offer
      </span>
      <img
        :src="imageUrl"
        :alt="title"
        class="product-card__image"
      >
      <span class="product-card__title">{{ title }}</span>
      <span class="product-card__prices">
        <span
          :class="discountPrice ? 'product-card__price--non-discount' : ''"
          class="product-card__price"
        >
        ${{ price }}
      </span>
      <span
        v-if="discountPrice"
        class="product-card__price--discount"
      >
      ${{ price }}
      </span>
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'MonolithProductCard',
  props: ['imageUrl', 'title', 'price', 'id', 'isSpecialOffer', 'discountPrice'],
};
</script>

<style scoped lang="scss">
.product-card {
  width: 281px;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: Roboto sans-serif;

  &__link {
    &:link,
    &:visited,
    &:hover,
    &:active {
      text-decoration: none;
      display: inherit;
    }

    &:hover {
      .product-card__image {
        opacity: .64;
      }
    }
  }

  &__special-offer {
    position: absolute;
    top: 13px;
    left: 0;
    background-color: #31a893;
    width: 171px;
    height: 46px;
    opacity: 1;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    font-weight: 500;
  }

  &__image {
    opacity: 1;
    object-fit: cover;
    height: 63%;
    width: fit-content;
    margin-bottom: 18.4px;
    transition: opacity .3s ease-out;
  }

  &__title {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0.81px;
    color: #363636;
    margin-bottom: 12px;
  }

  &__prices {
    display: flex;
    align-items: center;
  }

  &__price {
    font-size: 15px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.68px;
    color: #363636;
    margin-right: 25px;

    &--non-discount {
      text-decoration: overline;
    }

    &--discount {

    }
  }
}
</style>
