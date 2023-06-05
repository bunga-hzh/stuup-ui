<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

const locale = computed(() => zhCn);
</script>
