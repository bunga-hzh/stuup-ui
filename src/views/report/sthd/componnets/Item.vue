<template>
  <table-layout>
    <template #search>
      <Form :model="search" style="width: 100%">
        <FormItem label="社团名称" prop="name">
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
      name: '社团名称',
      key: 'name',
      order: 1,
    },
    {
      name: '级别',
      key: 'level',
      order: 2,
    },
    {
      name: '组织机构（主办方）',
      key: 'org',
      order: 3,
    },
  ])
);
</script>

<style scoped lang="scss"></style>
