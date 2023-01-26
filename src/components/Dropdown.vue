<template>
  <div class="aselect" :data-value="value" :data-list="list">
    <div class="selector" @click="toggle()">
      <div class="label">
        <span>{{ value || defaultValue }}</span>
      </div>
      <div class="arrow" :class="{ expanded : visible }"></div>
      <div :class="{ hidden : !visible, visible }">
        <ul>
          <li :key="item" :class="{ current : item === value }" v-for="item in list" @click="select(item.id, item.title)">{{ item.title }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonolithDropdown',
  props: ['list', 'attributeId', 'defaultValue'],
  data() {
    return {
      visible: false,
      value: '',
    };
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    select(id, title) {
      this.value = title;

      this.$emit('selectOption', {
        optionId: id,
        attributeId: this.attributeId,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.aselect {
  width: 100%;

  .selector {
    height: 40px;
    display: flex;
    align-items: center;
    border: solid 1px #d5d5d5;
    background-image: linear-gradient(to top, #f7fcfb, #fff);
    position: relative;
    cursor: pointer;

    .arrow {
      position: absolute;
      right: 18px;
      top: 44%;
      width: 0;
      height: 0;
      border: solid #2c2b2a;
      border-width: 0 1.5px 1.5px 0;
      display: inline-block;
      padding: 3px;
      transform: rotate(45deg);
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(.59,1.39,.37,1.01);
    }

    .expanded {
      transform: rotateZ(225deg);
    }

    .label {
      margin-left: 21px;
      font-size: 15px;
      font-weight: 300;
      letter-spacing: 0.38px;
      color: #2c2b2a;
    }
  }

  ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
    border: 1px solid gainsboro;
    position: absolute;
    top: 39px;
    left: 0;
    z-index: 1;
    background: #fff;
  }

  li {
    padding: 12px;
    color: #666;
    &:hover {
      color: white;
      background: seagreen;
    }
  }

  .current {
    background: #eaeaea;
  }

  .hidden {
    visibility: hidden;
  }

  .visible {
    visibility: visible;
  }
}
</style>
