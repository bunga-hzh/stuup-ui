<template>
  <base-card>
    <Space vertical>
      <Form :model="search" inline>
        <FormItem label="年份名称" prop="yearName">
          <Input />
        </FormItem>
        <FormItem action>
          <Button type="primary" @click="handlerSearch">查询</Button>
          <Button>清空</Button>
        </FormItem>
      </Form>
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
        :current-page="current"
        :page-size="size">
        <TableColumn name="操作" id-key="menu" :order="7" text-align="center" :width="200">
          <template #default="{ row }">
            <Button @click="updateRow(row)">修改</Button>
            <Button @click="delRow(row.oid)">删除</Button>
          </template>
        </TableColumn>
      </Table>
      <div style="width: 100%; text-align: right">
        <Pagination
          v-model:active="current"
          :plugins="['total', 'size', 'jump']"
          :total="data.length"
          :page-size="size"></Pagination>
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

interface SearchType {
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
const search = reactive<SearchType>({});
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
      name: '年级名称',
      key: 'gradeName',
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
const updateRow = (row: YearFormType) => {
  modelTitle.value = '修改';
  active.value = true;
  console.log(row);
};
const delRow = (oid: number) => {
  console.log(oid);
};
</script>
