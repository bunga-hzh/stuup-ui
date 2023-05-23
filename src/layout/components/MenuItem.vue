<template>
  <div v-for="(route, index) in routes" :key="route.path + index">
    <el-sub-menu v-if="route.children && route.children.length" :index="route.path">
      <template #title>{{ route.name }}</template>
      <menu-item :routes="route.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="route.path">{{ route.name }}</el-menu-item>
  </div>
</template>

<script setup lang="ts">
import type { MenuVO } from '@/api/system/menu/index';
type Props<T> = {
  routes?: T[] | [];
};

defineProps<Props<MenuVO>>();
</script>

<style scoped lang="scss"></style>
