<template>
  <el-row :gutter="10" style="margin: 20px">
    <el-col :sm="24" :xl="6">
      <GrowthTree />
    </el-col>
    <el-col :sm="24" :xl="18">
      <GrowthItem />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import GrowthTree from './GrowthTree.vue';
import GrowthItem from './GrowthItem.vue';
</script>

<style scoped lang="scss"></style>
