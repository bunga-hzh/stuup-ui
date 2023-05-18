<template>
  <div>
    <Row>
      <Column :md="24" :lg="6">
        <base-card>
          <Input v-model:value="filter" />
          <Tree :data="tree" link-line="solid" :filter="filter" />
        </base-card>
      </Column>
      <Column :md="24" :lg="18">
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
                  <Input />
                </FormItem>
                <FormItem label="学号" prop="studentNo">
                  <Input />
                </FormItem>
                <FormItem label="项目名称" prop="name">
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
            <template #toolbarRight>
              <Space>
                <Button>刷新</Button>
              </Space>
            </template>
            <template #table>
              <Table stripe border highlight :columns="columns" :data="data" />
            </template>
            <template #page>
              <Pagination
                v-model:active="page.current"
                :plugins="['total', 'size', 'jump']"
                :total="page.total"
                :page-size="page.pageSize" />
            </template>
          </table-layout>
        </base-card>
      </Column>
    </Row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { defineColumns } from 'vexip-ui';
import type { Pagination } from '@/types/global';

const filter = ref<string>('');
const page = reactive<Pagination>({
  current: 1,
  pageSize: 10,
  total: 100,
});
const search = reactive({
  name: '',
});

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
      name: '项目名称',
      key: 'name',
      order: 6,
    },
    {
      name: '获得积分',
      key: 'integral',
      order: 7,
    },
    {
      name: '获取时间',
      key: 'createTime',
      order: 7,
    },
  ])
);
const data = ref([
  {
    grade: '一年级',
    class: '三年二班',
    studentName: '李子明',
    studentNo: '666666',
    idCard: '111111111111111111',
    name: '时政学习',
    integral: '+1',
    createTime: new Date(),
  },
]);
const tree = ref([
  {
    id: 1,
    label: '道德与公民素养',
    parent: 0,
    expanded: true,
  },
  {
    id: 2,
    label: '思想品德',
    parent: 1,
  },
  {
    id: 3,
    label: '爱国爱校',
    parent: 2,
  },
  {
    id: 4,
    label: '时政学习',
    parent: 2,
  },
  {
    id: 5,
    label: '安全法制',
    parent: 2,
  },
  {
    id: 6,
    label: '军事训练',
    parent: 2,
  },
]);
</script>

<style scoped lang="scss"></style>
