<template>
  <el-menu v-bind="$attrs" :default-active="$route.path" unique-opened router>
    <menu-item v-for="(route, index) in routes" :key="route.path + index" :route="route" />
  </el-menu>
</template>

<script setup lang="ts">
import type { MenuVO } from '@/api/system/menu/index';
import MenuItem from './MenuItem.vue';

type Props<T> = {
  routes?: T[] | [];
};

defineProps<Props<MenuVO>>();
</script>

<style lang="scss">
.el-menu {
  background-color: var(--aside-menu-background);
  border: 0;

  .el-menu-item,
  .el-sub-menu__title {
    color: white;
  }

  .el-sub-menu__title:hover,
  .el-menu-item:hover {
    background-color: var(--aside-menu-active-background);
  }
}
</style>
