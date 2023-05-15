<template>
  <RouterLink v-for="(route, index) in routes" :key="route.path + index" :to="route.children?.length ? '' : route.path">
    <MenuItem :label="route.path">
      <span class="menu-name">{{ route.name }}</span>
      <template #icon v-if="route.icon">
        <component v-if="route.icon" :is="route.icon" />
      </template>
      <template #group v-if="route.children?.length">
        <v-menu-item :routes="route.children" />
      </template>
    </MenuItem>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import VMenuItem from './index.vue';
import { MenuTree } from '@/store/modules/premission';

type Props<T> = {
  routes?: T[] | [];
};

defineProps<Props<MenuTree>>();
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  outline: none;
  color: #000;
}

// .menu-name {
//   font-size: 14px;
// }
</style>
