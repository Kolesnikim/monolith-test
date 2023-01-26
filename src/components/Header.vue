<template>
  <nav class="navigation">
    <img
      class="navigation-title"
      srcset="../assets/images/spectrum-logo.png 1x, ../assets/images/spectrum-logo@2x.png 2x, ../assets/images/spectrum-logo@3x.png 3x"
      src="../assets/images/spectrum-logo.png"
      alt="a">
    <div class="navigation-links">
      <router-link active-class="navigation-link__active" class="navigation-link" to="/">Home</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MonolithHeader',
};
</script>

<style lang="scss" scoped>
.navigation {
  width: 100vw;
  height: 175px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f7fcfb;

  &-title {
    height: 29px;
    width: 239px;
    margin: 44px auto 38px
  }

  &-header {
    width: 100%;
  }

  &-links {
    width: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border-top: 1px solid #d7d7d7;
    flex-grow: 1;
  }

  &-link {
    &:link,
    &:visited,
    &:hover,
    &:active {
      text-decoration: none;
    }

    &:hover,
    &__active {
      color: #31a893;
    }

    font-family: "Roboto" sans-serif;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.38px;
    color: #2c2b2a;
    text-transform: uppercase;
  }
}
</style>
