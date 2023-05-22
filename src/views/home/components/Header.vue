<template>
  <header>
    <a href="#">
      <div class="logo">LOGO</div>
    </a>
    <div class="menu-logo">
      <Icon :icon="Bars" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { Bars } from '@vexip-ui/icons';
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: inline-block;
    text-decoration: none;
    color: #000;
  }
}
</style>
