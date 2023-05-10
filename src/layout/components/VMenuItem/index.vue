<template>
  <div v-for="(route, index) in routes" :key="route.path + index">
    <div v-if="!route.meta?.hidden">
      <RouterLink v-if="route.meta?.name" :to="route.children?.length ? '' : route.path">
        <MenuItem :label="route.path">
          {{ route.meta?.name }}
          <template #icon v-if="route.meta?.icon">
            <component v-if="route.meta?.icon" :is="route.meta?.icon" />
          </template>
          <template #group v-if="route.children?.length">
            <v-menu-item :routes="route.children" />
          </template>
        </MenuItem>
      </RouterLink>
      <v-menu-item v-else :route="route.children" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouteRecordRaw } from 'vue-router';
import VMenuItem from './index.vue';

type Props<T> = {
  routes?: T[] | [];
};

defineProps<Props<RouteRecordRaw>>();
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  outline: none;
  color: #000;
}
</style>
