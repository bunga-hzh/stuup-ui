<template>
  <el-menu v-bind="$attrs" :default-active="$route.path" router>
    <menu-item router :routes="routes" />
  </el-menu>
</template>

<script setup lang="ts">
import type { Menu } from '@/store/modules/premission';
import MenuItem from './MenuItem.vue';

type Props<T> = {
  routes?: T[] | [];
};

defineProps<Props<Menu>>();
</script>

<style scoped lang="scss"></style>
