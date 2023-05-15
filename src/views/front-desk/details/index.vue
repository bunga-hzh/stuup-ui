<template>
  <base-card>
    <Table :columns="columns" :data="data" :width="200"></Table>
  </base-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineColumns } from 'vexip-ui';

const columns = ref(
  defineColumns([
    {
      name: '得分标准',
      key: 'standard',
    },
    {
      name: '得分项目',
      key: 'project',
    },
    {
      name: '得分',
      key: 'score',
    },
    {
      name: '获取时间',
      key: 'createTime',
    },
  ])
);
const data = ref([
  {
    key: 1,
    standard: 'Test',
    project: 'test',
    score: '1分',
    createTime: new Date(),
  },
  {
    key: 2,
    standard: 'Test',
    project: 'test',
    score: '1分',
    createTime: new Date(),
  },
  {
    key: 3,
    standard: 'Test',
    project: 'test',
    score: '1分',
    createTime: new Date(),
  },
  {
    key: 4,
    standard: 'Test',
    project: 'test',
    score: '1分',
    createTime: new Date(),
  },
  {
    key: 5,
    standard: 'Test',
    project: 'test',
    score: '1分',
    createTime: new Date(),
  },
  {
    key: 6,
    standard: 'Test',
    project: 'test',
    score: '1分',
    createTime: new Date(),
  },
  {
    key: 7,
    standard: 'Test',
    project: 'test',
    score: '1分',
    createTime: new Date(),
  },
  {
    key: 8,
    standard: 'Test',
    project: 'test',
    score: '1分',
    createTime: new Date(),
  },
  {
    key: 9,
    standard: 'Test',
    project: 'test',
    score: '1分',
    createTime: new Date(),
  },
  {
    key: 10,
    standard: 'Test',
    project: 'test',
    score: '1分',
    createTime: new Date(),
  },
  {
    key: 11,
    standard: 'Test',
    project: 'test',
    score: '1分',
    createTime: new Date(),
  },
  {
    key: 12,
    standard: 'Test',
    project: 'test',
    score: '1分',
    createTime: new Date(),
  },
]);
</script>

<style scoped lang="scss"></style>
