<template>
  <Card title="班级详情">
    <template #extra>
      <Button type="primary">查询</Button>
      <Button>清空</Button>
    </template>
    <Row :gap="[8, 8]">
      <Form :model="search" style="width: 100%">
        <Column sm="24" :md="12" :xl="8">
          <FormItem label="学年" prop="year">
            <Select />
          </FormItem>
        </Column>
        <Column sm="24" :md="12" :xl="8">
          <FormItem label="学期" prop="semester">
            <Select />
          </FormItem>
        </Column>
        <Column sm="24" :md="12" :xl="8">
          <FormItem label="年级" prop="grade">
            <Select />
          </FormItem>
        </Column>
        <Column sm="24" :md="12" :xl="8">
          <FormItem label="班级" prop="class">
            <Select />
          </FormItem>
        </Column>
        <Column :sm="24" :md="12" :xl="8">
          <FormItem label="姓名" prop="studentName">
            <Select />
          </FormItem>
        </Column>
        <Column :sm="24" :md="12" :xl="8">
          <FormItem label="学号" prop="studentNo">
            <Select />
          </FormItem>
        </Column>
        <Column :sm="24" :md="12" :xl="8">
          <FormItem label="项目名称" prop="name">
            <Select />
          </FormItem>
        </Column>
      </Form>
      <Column :span="24">
        <Table stripe border highlight :columns="columns" :data="data" />
      </Column>
      <Column :span="24" style="text-align: right">
        <Pagination
          v-model:active="page.current"
          :plugins="['total', 'size', 'jump']"
          :total="page.total"
          :page-size="page.size" />
      </Column>
    </Row>
  </Card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { defineColumns } from 'vexip-ui';
import type { Pagination } from '@/types/global';

const page = reactive<Pagination>({
  current: 1,
  size: 10,
  total: 1,
});

const columns = ref(
  defineColumns([
    {
      name: '姓名',
      key: 'studentName',
    },
    {
      name: '学号',
      key: 'studentNo',
    },
    {
      name: '证件号',
      key: 'idCard',
    },
    {
      name: '项目名称',
      key: 'name',
    },
    {
      name: '获得成长值',
      key: 'score',
    },
    {
      name: '获得时间',
      key: 'createTime',
    },
  ])
);

const data = ref([
  {
    grade: '一年级',
    class: '三年二班',
    totalScore: '400',
  },
]);

const search = reactive({});
</script>

<style scoped lang="scss"></style>
