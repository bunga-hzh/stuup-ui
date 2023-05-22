<template>
  <base-card>
    <table-layout>
      <template #search>
        <Form :model="search" style="width: 100%">
          <FormItem label="年级" prop="grade">
            <Select />
          </FormItem>
          <FormItem label="班级" prop="class">
            <Select />
          </FormItem>
          <FormItem label="姓名" prop="studentName">
            <Select />
          </FormItem>
          <FormItem label="学号" prop="studentNo">
            <Select />
          </FormItem>
          <FormItem label="等级" prop="level">
            <Select />
          </FormItem>
          <FormItem label="是否优秀" prop="excellent">
            <Select />
          </FormItem>
        </Form>
      </template>
      <template #searchBtn>
        <Space vertical>
          <Button type="primary">查询</Button>
          <Button>清空</Button>
        </Space>
      </template>
      <template #toolbarRight>
        <Space>
          <Button>刷新</Button>
        </Space>
      </template>
      <template #table>
        <Table
          border
          stripe
          highlight
          :columns="columns"
          :data="data"
          :key-config="{ id: 'oid' }"
          :current-page="page.current"
          :page-size="page.size" />
      </template>
      <template #page>
        <Pagination
          v-model:active="page.current"
          :plugins="['total', 'size', 'jump']"
          :total="data.length"
          :page-size="page.size" />
      </template>
    </table-layout>
  </base-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { defineColumns } from 'vexip-ui';
const search = reactive({});
const page = reactive({
  current: 1,
  size: 10,
  total: 0,
});
const data = ref([]);

const columns = ref(
  defineColumns([
    {
      name: '年纪',
      key: 'grade',
      order: 1,
    },
    {
      name: '班级',
      key: 'class',
      order: 2,
    },
    {
      name: '姓名',
      key: 'studentName',
      order: 3,
    },
    {
      name: '学号',
      key: 'studentNo',
      order: 4,
    },
    {
      name: '证件号',
      key: 'idCard',
      order: 5,
    },
    {
      name: '等级',
      key: 'level',
      order: 6,
    },
    {
      name: '是否优秀',
      key: 'excellent',
      order: 7,
    },
  ])
);
</script>

<style scoped lang="scss"></style>
