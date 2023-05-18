<template>
  <Menu ref="menu" horizontal :active="$route.path" manual-route accordion>
    <v-menu-item :routes="premissionStore.getFrontAsideRouters" />
  </Menu>
</template>

<script setup lang="ts">
import VMenuItem from '@/layout/components/VMenuItem/index.vue';
import { usePermissionStore } from '@/store/modules/premission';
const premissionStore = usePermissionStore();
</script>
