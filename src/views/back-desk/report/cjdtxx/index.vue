<template>
  <base-card>
    <table-layout>
      <template #search>
        <Form :model="search" style="width: 100%">
          <FormItem label="年份名称" prop="yearName">
            <Input />
          </FormItem>
        </Form>
      </template>
      <template #searchBtn>
        <Space vertical>
          <Button type="primary">查询</Button>
          <Button>清空</Button>
        </Space>
      </template>
      <template #toolbarLeft>
        <Space>
          <Button type="primary" @click="addRow">添加</Button>
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
          :current-page="current"
          :page-size="size"
          style="min-width: 1000px">
          <TableColumn name="操作" id-key="menu" :order="7" text-align="center" :width="200">
            <template #default="{ row }">
              <Button>修改</Button>
              <Button>删除</Button>
            </template>
          </TableColumn>
        </Table>
      </template>
      <template #page>
        <Pagination
          v-model:active="current"
          :plugins="['total', 'size', 'jump']"
          :total="data.length"
          :page-size="size" />
      </template>
    </table-layout>
  </base-card>
</template>

<script setup lang="ts">
import { defineColumns } from 'vexip-ui';
import { ref, reactive } from 'vue';
const search = reactive({});
const page = reactive({
  
})
const data = ref([]);

const columns = ref(
  defineColumns([
    {
      name: '年份名称',
      key: 'yearName',
      order: 1,
    },
    {
      name: '开始时间',
      key: 'yearStart',
      order: 2,
    },
    {
      name: '结束时间',
      key: 'yearEnd',
      order: 3,
    },
    {
      name: '上学期起止时间',
      key: 'lastSemester',
      order: 4,
    },
    {
      name: '下学期起止时间',
      key: 'nextSemester',
      order: 5,
    },
    {
      name: '创建时间',
      key: 'createTime',
      order: 6,
    },
  ])
);
</script>

<style scoped lang="scss"></style>
