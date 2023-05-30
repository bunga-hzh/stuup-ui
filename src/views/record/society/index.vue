<template>
  <el-row :gutter="10" style="margin: 10px">
    <el-col :md="24" :lg="8">
      <ProSociety />
    </el-col>
    <el-col :md="24" :lg="16">
      <RecSociety />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import ProSociety from './ProSociety.vue';
import RecSociety from './RecSociety.vue';
</script>
