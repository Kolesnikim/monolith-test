<template>
  <img
    :src="imager(activeImageUrl, 425, 90)"
    :alt="activeImageUrl"
    class="gallery-image__active"
  >
  <div class="gallery-images__wrapper">
    <img v-for="image in images"
         @click="activeImageUrl = image.url"
         :key="image.title"
         :src="imager(image.url, 127, 90)"
         :alt="image.title"
         class="gallery-image"
    >
  </div>
</template>

<script>
export default {
  name: 'MonolithImageGallery',
  props: ['images'],
  data() {
    return {
      activeImageUrl: '',
    };
  },
  watch: {
    images(newImages) {
      if (newImages.length) this.activeImageUrl = newImages[0].url;
    },
  },
};
</script>

<style scoped lang="scss">
.gallery {
  &-image {
    margin-bottom: 22px;

    &:not(:last-child) {
      margin-right: 22px;
    }
    &__active {
      margin-bottom: 22px;
    }
  }

  &-images {
    &__wrapper {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: minmax(127px, auto);
    }
  }
}

@media screen and (max-width: 1200px) {
  .gallery {
    &-image {
      margin-bottom: 0;

      &:not(:last-child) {
        margin-right: 0;
      }
    }

    &-images {
      &__wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        justify-content: center;
        justify-items: center;
        grid-auto-rows: minmax(150px, auto);
      }
    }
  }
}
</style>
