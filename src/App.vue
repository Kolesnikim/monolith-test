<template>
  <MonolithHeader />
  <router-view/>
</template>

<script>
import MonolithHeader from '@/components/Header.vue';

export default {
  components: {
    MonolithHeader,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,600,700,900&display=swap');
html, body, html * {
  font-family: 'Roboto', sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
  font-family: Roboto sans-serif;
}

* {
  margin: 0;
}

html, body {
  height: 100%;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root, #__next {
  isolation: isolate;
}

</style>
