<template>
  <el-card style="margin: 20px">
    <el-row>
      <el-col :span="8" v-for="(item, index) in flowerIcons" :key="index">
        <el-card style="margin: 10px">
          <img :src="index" width="100" height="100" style="border-radius: 50%" />
          <div style="float: right">
            <el-button type="primary">设置兑换值</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
const flowerIcons = import.meta.glob('@/assets/flower_icons/*', { import: 'default', eager: true });
</script>

<style scoped lang="scss"></style>
