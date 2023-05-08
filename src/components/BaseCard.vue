<template>
  <div class="bg-card">
    <slot>aaa</slot>
  </div>
</template>

<style scoped lang="scss">
.bg-card {
  margin: var(--base-card-gauge);
  padding: var(--base-card-gauge);
  border-radius: var(--base-card-radius);
  border: 1px solid #eee;
  background-color: var(--base-card-bg);
}
</style>
