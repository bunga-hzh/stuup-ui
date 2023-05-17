<template>
  <base-card>
    <Space vertical>
      <div style="width: 100%">
        <ConfigProvider :props="searchProvidedProps">
          <Form :model="search">
            <FormItem label="年级名称" prop="name">
              <Input />
            </FormItem>
            <FormItem action>
              <Button type="primary" @click="handlerSearch">查询</Button>
              <Button>清空</Button>
            </FormItem>
          </Form>
        </ConfigProvider>
      </div>
      <div>
        <Button type="primary" @click="addRow">添加</Button>
      </div>
      <Table
        border
        stripe
        highlight
        :columns="columns"
        :data="data"
        :key-config="{ id: 'oid' }"
        :current-page="currentPage"
        :page-size="pageSize">
        <TableColumn name="操作" id-key="menu" :order="7" text-align="center" :width="200">
          <template #default="{ row }">
            <Button @click="updateRow(row)">修改</Button>
            <Button @click="delRow(row.oid)">删除</Button>
          </template>
        </TableColumn>
      </Table>
      <div style="width: 100%; text-align: right">
        <Pagination
          v-model:active="currentPage"
          :plugins="['total', 'size', 'jump']"
          :total="data.length"
          :page-size="pageSize"></Pagination>
      </div>
    </Space>

    <Modal
      v-model:active="active"
      transfer
      draggable
      resizable
      :width="500"
      :title="modelTitle"
      :loading="modelLoading"
      :on-before-close="handleModelClose"
      @close="handleModelColse">
      <ConfigProvider :props="providedProps">
        <Form ref="formRef" :model="form" label-align="top">
          <FormItem label="年级名称" prop="name">
            <Input />
          </FormItem>
          <FormItem label="年份" prop="year">
            <DatePicker type="year" />
          </FormItem>
        </Form>
      </ConfigProvider>
    </Modal>
  </base-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { defineColumns } from 'vexip-ui';
import { PaginationResult } from '@/types/global';
import { queryGrade, GradeQueryType } from '@/api/grade/index';

interface GradeSearchType {
  name: string;
}

interface GradeTableType {
  oid: number;
  name: string;
  year: string;
}

interface GradeFormType {
  oid: number | null;
  name: string;
  year: string;
}

const searchProvidedProps = {
  default: { clearable: true },
  formItem: { span: 24, lg: 6 },
};
const providedProps = {
  default: { clearable: true },
  formItem: { required: true },
};

const active = ref<boolean>(false);
const modelTitle = ref<string>('');
const modelLoading = ref<boolean>(false);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const data = ref<GradeTableType[]>([]);
const search = reactive<GradeSearchType>({
  name: '',
});
const form = reactive<GradeFormType>({
  oid: null,
  name: '',
  year: '',
});

const formRef = ref();

const columns = ref(
  defineColumns([
    {
      name: '年级名称',
      key: 'name',
      order: 1,
    },
    {
      name: '年份',
      key: 'year',
      order: 2,
    },
  ])
);

onMounted(() => {
  fetchList();
});

const fetchList = async (query?: GradeQueryType) => {
  const res = await queryGrade(
    Object.assign({ currentPage: currentPage.value, pageSize: pageSize.value }, search, query)
  );
  const result = res.data as PaginationResult;
  data.value = result.records;
};

const handleModelColse = () => {
  modelLoading.value = false;
  formRef.value!.reset();
};

const handleModelClose = async (isConfirm: boolean) => {
  modelLoading.value = true;
  if (isConfirm) {
    const errors = await formRef.value!.validate();
    if (errors.length) {
      modelLoading.value = false;
      return false;
    } else {
      Message.success(`提交成功${JSON.stringify(form)}`);
      return true;
    }
  }
  return true;
};

const handlerSearch = (): void => {
  console.log(search);
};

const addRow = () => {
  modelTitle.value = '添加';
  active.value = true;
};
const updateRow = (row: GradeTableType) => {
  modelTitle.value = '修改';
  active.value = true;
  form.oid = row.oid;
  form.name = row.name;
  form.year = row.year;
};
const delRow = (oid: number) => {
  console.log(oid);
};
</script>
