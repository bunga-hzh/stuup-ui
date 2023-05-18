<template>
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
          <Input />
        </FormItem>
        <FormItem label="学号" prop="studentNo">
          <Input />
        </FormItem>
        <FormItem label="级别" prop="level">
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
        :page-size="page.pageSize" />
    </template>
    <template #page>
      <Pagination
        v-model:active="page.current"
        :plugins="['total', 'size', 'jump']"
        :total="data.length"
        :page-size="page.pageSize" />
    </template>
  </table-layout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { defineColumns } from 'vexip-ui';
const search = reactive({});
const page = reactive({
  current: 1,
  pageSize: 10,
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
      name: '活动名称',
      key: 'name',
      order: 6,
    },
    {
      name: '级别',
      key: 'level',
      order: 7,
    },
    {
      name: '开始时间',
      key: 'stratTime',
      order: 8,
    },
    {
      name: '结束时间',
      key: 'stratTime',
      order: 9,
    },
    {
      name: '角色',
      key: 'role',
      order: 10,
    },
  ])
);
</script>

<style scoped lang="scss"></style>
