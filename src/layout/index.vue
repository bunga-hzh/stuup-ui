<template>
  <div class="bunga-container">
    <Header @change-aside="changeAside" />
    <div class="bunga-container__content">
      <Aside v-show="showAside" />
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';
import Main from './components/Main.vue';

const showAside = ref<boolean>(false);

const changeAside = (val: boolean) => {
  showAside.value = val;
  console.log(val);
};
</script>

<style lang="scss" scoped>
@include b(container) {
  @include bfc;
  @include e(content) {
    @include bfc;
    display: flex;
  }
}
</style>
