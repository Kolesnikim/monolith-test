<template>
  <div class="product">
    <div class="product-gallery">
      <MonolithImageGallery
        :images="product.images"
        ref="galleryRef"
      />
    </div>
    <div class="product-info">
      <span class="product-info__title">{{ product.title }}</span>
      <span class="product-info__price">${{ product.max_price }}</span>
      <span class="product-info__description">{{ product.description }}</span>
    </div>
    <div class="product-settings">
      <div class="product-settings__dropdowns-wrapper">
        <div
          class="product-settings__dropdown"
          v-for="attribute in attributes"
          :key="attribute.id"
        >
          <MonolithDropdown
            :default-value="'Choose ' + attribute.title"
            :list="attribute.labels"
            :attribute-id="attribute.id"
            @select-option="setSelectedVariants($event)"
          />
        </div>
      </div>

      <div class="product-settings__quantity">
        <MonolithQuantityForm @quantity-changed="quantityChanged($event)"/>
      </div>

      <button
        class="product-settings__submit"
        @click="onVariantSubmit()"
      >
        Add to card
      </button>
    </div>
  </div>
</template>

<script>
import MonolithImageGallery from '@/components/ImageGallery.vue';
import MonolithDropdown from '@/components/Dropdown.vue';
import MonolithQuantityForm from '@/components/QuantityForm.vue';
import { addToCart } from '@/services/api-service';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    MonolithImageGallery,
    MonolithDropdown,
    MonolithQuantityForm,
  },
  data() {
    return {
      selectedAttributes: [],
      quantity: 1,
    };
  },
  mounted() {
    this.loadProduct(this.$route.params.id);
  },
  computed: {
    ...mapGetters(['product', 'attributes', 'variants']),
  },
  methods: {
    ...mapMutations(['setProduct', 'setVariants', 'setAttributes']),
    ...mapActions(['loadProduct']),
    quantityChanged(quantity) {
      this.quantity = quantity;
    },
    async onVariantSubmit() {
      if (this.selectedAttributes.length !== this.attributes.length) return;

      this.selectedAttributes.sort((a, b) => a.attributeId - b.attributeId);

      let variantId;

      this.variants.forEach((variant) => {
        variant.labels.forEach((label, idx) => {
          if (
            label.attribute_id === this.selectedAttributes[idx].attributeId
            && label.label_id === this.selectedAttributes[idx].optionId
          ) variantId = variant.id;
        });
      });

      await addToCart(variantId, this.quantity);
    },
    setSelectedVariants(params) {
      this.setAttributes(this.product.attributes);

      const { optionId, attributeId } = params;

      this.selectedAttributes.push({ optionId, attributeId });

      const variantImage = this.variants
        .find((variant) => variant.labels.find((label) => label.attribute_id === attributeId && label.label_id === optionId));

      this.$refs.galleryRef.activeImageUrl = variantImage.image.url;

      const variantLabels = this.variants
        .map((variant) => variant.labels)
        .filter((variantLabel) => variantLabel.find((label) => label.attribute_id === attributeId && label.label_id === optionId))
        .reduce((acc, cur) => {
          const otherAttributes = cur.filter((el) => el.attribute_id !== attributeId);

          otherAttributes.forEach((attr) => {
            if (!acc.hasOwnProperty(attr.attribute_id)) {
              acc[attr.attribute_id] = [attr.label_id];
            } else acc[attr.attribute_id].push(attr.label_id);
          });

          return acc;
        }, {});

      const selectedAttributes = this.attributes.find((attribute) => attribute.id === attributeId);
      variantLabels[attributeId] = selectedAttributes.labels.map((label) => label.id);

      const filteredAttributes = this.attributes
        .map((filteredAttribute) => {
          const labels = [];

          if (!variantLabels[filteredAttribute.id]) return filteredAttribute;

          const freeLabels = variantLabels[filteredAttribute.id];

          filteredAttribute.labels.forEach((label) => {
            if (freeLabels.find((l) => l === label.id)) labels.push(label);
          });

          filteredAttribute.labels = labels;
          return filteredAttribute;
        });

      this.setAttributes(filteredAttributes);
    },
  },
};
</script>

<style lang="scss">
.product {
  width: 75%;
  margin: 76px auto 0;
  display: flex;

  &-gallery {
    margin-right: 33px;
  }

  &-info {
    font-family: Roboto sans-serif;
    color: #2c2b2a;
    width: 40%;
    display: flex;
    flex-direction: column;
    margin-right: 84px;

    &__title {
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 0.7px;
      margin-bottom: 12px;
    }

    &__price {
      margin-bottom: 38px;
      font-size: 18px;
      font-weight: normal;
      letter-spacing: 0.45px;
    }

    &__description {
      font-size: 15px;
      font-weight: 300;
      line-height: 1.67;
      letter-spacing: 0.38px;
      text-align: left;
      margin-bottom: 57px;
    }
  }

  &-settings {
    width: 290px;
    display: flex;
    flex-direction: column;

    &__dropdown {
      margin-bottom: 30px;

      &:first-child {
        margin-top: 7px;
      }
    }

    &__quantity {
      margin-bottom: 25px;
    }

    &__submit {
      height: 51px;
      border: none;
      box-shadow: 0 1px 3px 0 rgba(7, 7, 8, 0.46);
      background-image: linear-gradient(to top, #31a893, #34ceb3);
      font-size: 18px;
      font-weight: bold;
      line-height: 1.72;
      letter-spacing: 0.45px;
      color: #fff;
    }
  }
}

@media screen and (max-width: 1200px) {
  .product {
    width: 90%;
    display: flex;
    flex-direction: column;

    &-gallery {
      width: 100%;
      margin-right: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &-info {
      width: 100%;
    }

    &-settings {
      width: 100%;

      &__dropdowns-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}
</style>
