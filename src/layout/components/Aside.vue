<template>
  <el-scrollbar class="bunga-aside">
    <Menu :routes="premissionStore.getBackAsideRouters" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { usePermissionStore } from '@/store/modules/premission';
import Menu from './Menu.vue';

const premissionStore = usePermissionStore();
</script>

<style scoped lang="scss">
@include b(aside) {
  width: 200px;
  height: 100%;
  background-color: var(--aside-menu-background);
}
</style>
