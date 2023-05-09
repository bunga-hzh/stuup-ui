<template>
  <div v-for="(route, index) in routes" :key="route.path + index">
    <div v-if="!route.meta?.hidden">
      <RouterLink v-if="route.children?.length === 1" :to="route.children[0].path">
        <MenuItem :label="route.path">
          {{ route.children[0].meta?.name }}
          <template #icon v-if="route.children[0].meta?.icon">
            <component v-if="route.children[0].meta?.icon" :is="route.children[0].meta?.icon" />
          </template>
        </MenuItem>
      </RouterLink>
      <RouterLink v-else :to="route.children?.length ? '' : route.path">
        <MenuItem :label="route.path">
          {{ route.meta?.name }}
          <template #icon v-if="route.meta?.icon">
            <component v-if="route.meta?.icon" :is="route.meta.icon" />
          </template>
          <template #group v-if="route?.children?.length">
            <v-menu-item :routes="route.children" />
          </template>
        </MenuItem>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';
import VMenuItem from './index.vue';
import { RouterLink } from 'vue-router';

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
