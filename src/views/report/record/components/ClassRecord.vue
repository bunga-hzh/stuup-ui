<template>
  <Card title="班级成长积分">
    <template #extra>
      <Button type="primary">查询</Button>
      <Button>清空</Button>
    </template>
    <Row :gap="[8, 8]">
      <Form :model="search" style="width: 100%">
        <Column :span="24">
          <FormItem label="学年" prop="year">
            <Select />
          </FormItem>
        </Column>
        <Column :span="24">
          <FormItem label="学期" prop="semester">
            <Select />
          </FormItem>
        </Column>
        <Column :span="24">
          <FormItem label="年级" prop="grade">
            <Select />
          </FormItem>
        </Column>
        <Column :span="24">
          <FormItem label="班级" prop="class">
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

const page = reactive({
  current: 1,
  size: 10,
  total: 1,
});

const columns = ref([
  {
    name: '年纪',
    key: 'grade',
  },
  {
    name: '班级',
    key: 'class',
  },
  {
    name: '总成长值',
    key: 'totalScore',
  },
]);

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
