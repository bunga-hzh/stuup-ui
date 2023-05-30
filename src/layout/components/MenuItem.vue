<template>
  <el-sub-menu v-if="route.children && route.children.length" :index="route.path">
    <template #title>{{ route.name }}</template>
    <menu-item v-for="(children, index) in route.children" :key="children.path + index" :route="children" />
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">{{ route.name }}</el-menu-item>
</template>

<script setup lang="ts">
import type { MenuVO } from '@/api/system/menu/index';
type Props<T> = {
  route: T;
};

defineProps<Props<MenuVO>>();
</script>

<style scoped lang="scss"></style>
