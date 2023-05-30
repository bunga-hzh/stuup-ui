<template>
  <el-row :gutter="10" style="margin: 10px">
    <el-col :md="24" :lg="8">
      <ProCaucus />
    </el-col>
    <el-col :md="24" :lg="16">
      <RecCaucus />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import ProCaucus from './ProCaucus.vue';
import RecCaucus from './RecCaucus.vue';
</script>
