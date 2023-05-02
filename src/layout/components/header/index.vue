<template>
  <div class="app-header">
    <Menubar :model="premissionStore.getAsideRoutes">
      <template #start>
        <img alt="logo" :src="logo" height="40" class="mr-2" />
      </template>
      <template #end></template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePermissionStore } from '@/store/modules/premission.ts';
import logo from '@/assets/vue.svg';
import Menubar from 'primevue/menubar';

const premissionStore = usePermissionStore();
</script>

<style scoped lang="scss">
.app-header {
  height: 64px;
}
</style>
