<template>
  <div class="quantity">
    <span class="quantity__title">Quantity:</span>
    <div class="quantity__toggle">
      <button :disabled="quantity === 1" @click="decrement()">&mdash;</button>
      <input type="text" :value="quantity" readonly>
      <button @click="increment()">&#xff0b;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonolithQuantityForm',
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    increment() {
      this.quantity += 1;
      this.$emit('quantityChanged', this.quantity);
    },
    decrement() {
      this.quantity -= 1;
      this.$emit('quantityChanged', this.quantity);
    },
  },
};
</script>

<style scoped lang="scss">

.quantity {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__toggle {
    display: flex;
    align-items: center;

    *:not(:last-child) {
      margin-right: 9px;
    }

    input {
      width: 85px;
      height: 40px;
      border-radius: 5px;
      border: solid 0.3px #c4c4c4;
      text-align: center;
      font-size: 16px;
      font-weight: 300;
      letter-spacing: 0.4px;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 17px;
      height: 17px;
      border: solid 1px #d5d5d5;
      background-image: linear-gradient(to top, #f7fcfb, #fff);
      color: #888;
      cursor: pointer;
    }
  }

  &__title {
    margin-left: 22px;
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 0.38px;
  }
}

</style>
