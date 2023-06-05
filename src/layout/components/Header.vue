<template>
  <div class="bunga-header">
    <div class="bunga-header__logo">
      <img :src="logo" width="200" />
    </div>
    <div class="bunga-header__menu">
      <Menu v-show="!showAside" mode="horizontal" :routes="premissionStore.getFrontAsideRouters" />
    </div>
    <div class="bunga-header__navbar">
      <el-space>
        <el-switch
          v-model="showAside"
          inline-prompt
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-text="前往后台"
          inactive-text="前往前台"
          @change="changeAside" />
        <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import logo from '@/assets/logo.png';
import { usePermissionStore } from '@/store/modules/premission';
import Menu from './Menu.vue';

const premissionStore = usePermissionStore();

const showAside = ref<boolean>(false);

const emit = defineEmits(['change-aside']);

const changeAside = (val: boolean) => {
  emit('change-aside', val);
};
</script>

<style scoped lang="scss">
@include b(header) {
  height: 60px;
  display: flex;
  background-color: var(--aside-menu-background);
  @include e(logo) {
    width: 200px;
    display: flex;
    > img {
      width: 90%;
      margin: auto;
    }
  }
  @include e(menu) {
    flex: 2;
    height: 100%;
  }
  @include e(navbar) {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: end;
  }
}
</style>
