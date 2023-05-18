<template>
  <base-card>
    <table-layout>
      <template #search>
        <Form :model="search" style="width: 100%">
          <FormItem label="项目名称" prop="name">
            <Input />
          </FormItem>
          <FormItem label="审核状态" prop="state">
            <Input />
          </FormItem>
        </Form>
      </template>
      <template #searchBtn>
        <Space vertical>
          <Button type="primary" @click="handlerSearch">查询</Button>
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
          :current-page="current"
          :page-size="size"
          style="min-width: 1000px">
          <TableColumn name="操作" id-key="menu" :order="7" text-align="center" :width="300">
            <template #default="{ row }">
              <Button>详情</Button>
              <Button>通过</Button>
              <Button>拒绝</Button>
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
          <FormItem label="年份名称" prop="yearName">
            <Input />
          </FormItem>
          <FormItem label="起止时间" prop="yearRange">
            <DatePicker range clearable />
          </FormItem>
          <FormItem label="上学期起止时间" prop="lastSemester">
            <DatePicker range clearable />
          </FormItem>
          <FormItem label="下学期起止时间" prop="nextSemester">
            <DatePicker range clearable />
          </FormItem>
        </Form>
      </ConfigProvider>
    </Modal>
  </base-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { defineColumns } from 'vexip-ui';

interface YearSearchType {
  dataRange?: string[];
}

interface YearTableType {
  oid: number;
  yearName: string;
  yearStart: string;
  yearEnd: string;
  lastSemester: string;
  nextSemester: string;
  createTime?: Date;
}

interface YearFormType {
  oid?: number | null;
  yearName: string;
  yearRange: string[];
  lastSemester: string[];
  nextSemester: string[];
}

const providedProps = {
  default: { clearable: true },
  formItem: { required: true },
};

const active = ref<boolean>(false);
const modelTitle = ref<string>('');
const modelLoading = ref<boolean>(false);
const current = ref<number>(1);
const size = ref<number>(10);
const data = ref<YearTableType[]>([]);
const search = reactive<YearSearchType>({
  dataRange: [],
});
const form = reactive<YearFormType>({
  oid: null,
  yearName: '',
  yearRange: [],
  lastSemester: [],
  nextSemester: [],
});

const formRef = ref();

const columns = ref(
  defineColumns([
    {
      name: '项目名称',
      key: 'name',
      order: 1,
    },
    {
      name: '项目积分',
      key: 'integral',
      order: 2,
    },
    {
      name: '申请人',
      key: 'studentId',
      order: 3,
    },
    {
      name: '审核状态',
      key: 'state',
      order: 4,
    },
  ])
);

onMounted(() => {
  mockData();
});

const mockData = (): void => {
  for (let i = 1; i <= 1000; i++) {
    data.value.push({
      oid: i,
      yearName: 'Test',
      yearStart: 'test',
      yearEnd: 'test',
      lastSemester: `${i}上学期`,
      nextSemester: `${i}下学期`,
      createTime: new Date(),
    });
  }
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
const updateRow = (row: YearTableType) => {
  modelTitle.value = '修改';
  active.value = true;
  form.yearName = row.yearName;
  form.yearRange = [row.yearStart, row.yearEnd];
  form.lastSemester = row.lastSemester.split(',');
  form.nextSemester = row.nextSemester.split(',');
};
const delRow = (oid: number) => {
  console.log(oid);
};
</script>
