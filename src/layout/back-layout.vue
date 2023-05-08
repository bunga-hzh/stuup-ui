<template>
  <div class="app-container">
    <Header />
    <div class="app-main">
      <div class="main-side">
        <SideNavbar />
      </div>
      <div class="mian-content">
        <RouterView />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { Header, SideNavbar, Footer } from './components';
</script>

<style scoped lang="scss">
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .app-main {
    flex: 1;
    height: 100%;
    background-color: #f2f3f5;
    display: flex;
    overflow: hidden;

    .main-side {
      height: 100%;
      background: #fff;
    }

    .mian-content {
      flex: 1;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
