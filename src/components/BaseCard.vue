<template>
  <div class="bg-card">
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.bg-card {
  margin: var(--base-card-gauge);
  border-radius: var(--base-card-radius);
  border: 1px solid #eee;
  background-color: var(--base-card-bg);

  .card-herader {
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #eee;
  }
  .card-content {
    padding: var(--base-card-gauge);
  }
}
</style>
