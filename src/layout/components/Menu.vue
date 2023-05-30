<template>
  <el-menu v-bind="$attrs" :default-active="$route.path" router>
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

<style scoped lang="scss"></style>
