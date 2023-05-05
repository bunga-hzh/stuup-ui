<template>
  <div class="app-header">
    <a-menu mode="horizontal" :default-selected-keys="[$route.path]">
      <router-link v-for="(route, index) in premissionStore.getAsideRoutes" :key="route.to" :to="route.to">
        <a-menu-item :key="index">
          {{ route.label }}
        </a-menu-item>
      </router-link>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { usePermissionStore } from '@/store/modules/premission';
import logo from '@/assets/logo.png';

const premissionStore = usePermissionStore();
</script>

<style scoped lang="scss"></style>
