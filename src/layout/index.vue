<template>
  <div class="app-container">
    <Header />
    <div class="app-main">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { Header, Footer } from './components';
</script>

<style scoped lang="scss">
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .app-main {
    flex: 1;
  }
}
</style>
