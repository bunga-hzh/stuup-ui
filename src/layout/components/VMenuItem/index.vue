<template>
  <div v-for="(route, index) in routes">
    <RouterLink v-if="!route.meta.hidden" :key="route.path + index" :to="route?.children?.length ? '' : route.path">
      <MenuItem :label="route.path + index">
        {{ route.meta.name }}
        <template #icon v-if="route.meta?.icon">
          <component v-if="route.meta?.icon" :is="route.meta.icon" />
        </template>
        <template #group v-if="route?.children?.length">
          <v-menu-item :routes="route.children" />
        </template>
      </MenuItem>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { AsideRoutes } from '@/store/modules/premission';
import VMenuItem from './index.vue';
import { RouterLink } from 'vue-router';

type Props<T> = {
  routes?: AsideRoutes[] | [];
};

defineProps<Props<AsideRoutes>>();
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  outline: none;
  color: #000;
}
</style>
