<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <RouterView />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const locale = ref(zhCn);
</script>
