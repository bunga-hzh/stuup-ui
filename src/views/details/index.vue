<template>
  <base-card>
    <Space vertical>
      <Form :model="search" inline>
        <FormItem label="时间范围" prop="dateRange">
          <DatePicker range clearable />
        </FormItem>
        <FormItem action>
          <Button type="primary" @click="handlerSearch">查询</Button>
          <Button>清空</Button>
        </FormItem>
      </Form>
      <Table
        border
        stripe
        highlight
        :columns="columns"
        :data="data"
        :key-config="{ id: 'oid' }"
        :current-page="current"
        :page-size="size"></Table>
      <div style="width: 100%; text-align: right">
        <Pagination
          v-model:active="current"
          :plugins="['total', 'size', 'jump']"
          :total="data.length"
          :page-size="size"></Pagination>
      </div>
    </Space>
  </base-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { defineColumns } from 'vexip-ui';

interface SearchType {
  dataRange?: string[];
}

interface TableData {
  oid: number;
  standard: string;
  project: string;
  score: number;
  year: string;
  semester: string;
  createTime: Date;
}

const current = ref<number>(1);
const size = ref<number>(10);
const search = reactive<SearchType>({});

const columns = ref(
  defineColumns([
    {
      name: '得分项目名称',
      key: 'standard',
    },
    {
      name: '成长值',
      key: 'score',
    },
    {
      name: '获得学年',
      key: 'year',
    },
    {
      name: '获得学期',
      key: 'semester',
    },
    {
      name: '获取时间',
      key: 'createTime',
    },
  ])
);
const data = ref<TableData[]>([]);

onMounted(() => {
  mockData();
});

const mockData = (): void => {
  for (let i = 1; i <= 1000; i++) {
    data.value.push({
      oid: i,
      standard: 'Test',
      project: 'test',
      score: i,
      year: `${i}学年`,
      semester: '上学期',
      createTime: new Date(),
    });
  }
};

const handlerSearch = (): void => {
  console.log(search);
};
</script>

<style scoped lang="scss">
.vxp-table__head {
  z-index: -1;
}
</style>
