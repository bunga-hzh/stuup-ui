<template>
  <el-row :gutter="10" style="margin: 10px">
    <el-col :md="24" :lg="8">
      <ProNation />
    </el-col>
    <el-col :md="24" :lg="16">
      <RecNation />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import ProNation from './ProNation.vue';
import RecNation from './RecNation.vue';
</script>
