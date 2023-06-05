<template>
  <div class="bunga-main">
    <RouterView />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@include b(main) {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
