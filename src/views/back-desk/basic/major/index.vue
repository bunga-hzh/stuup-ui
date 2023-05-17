<template>
  <base-card>
    <Space vertical>
      <div style="width: 100%">
        <ConfigProvider :props="searchProvidedProps">
          <Form :model="search">
            <FormItem label="专业名称" prop="majorName">
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
          <FormItem label="专业编号" prop="majorCode">
            <Input />
          </FormItem>
          <FormItem label="专业名称" prop="majorName">
            <Input />
          </FormItem>
          <FormItem label="所属部门" prop="facultyId">
            <Select :options="dept" clearable />
          </FormItem>
          <FormItem label="学制" prop="system">
            <NumberInput :min="0" :max="10" />
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
import { queryMajor, MajorQueryType } from '@/api/major/index';

interface MajorSearchType {
  majorName: string;
}

interface MajorTableType {
  oid: number | null;
  majorCode: string;
  majorName: string;
  facultyId?: number | null;
  facultyName?: string;
  system?: string;
}

interface MajorFormType {
  oid: number | null;
  majorCode: string;
  majorName: string;
  facultyId?: number | null;
  system?: string;
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
const dept = ref([]);
const data = ref<MajorTableType[]>([]);
const search = reactive<MajorSearchType>({
  majorName: '',
});
const form = reactive<MajorFormType>({
  oid: null,
  majorCode: '',
  majorName: '',
  facultyId: null,
  system: '',
});

const formRef = ref();

const columns = ref(
  defineColumns([
    {
      name: '专业代码',
      key: 'majorCode',
      order: 1,
    },
    {
      name: '专业名称',
      key: 'majorName',
      order: 2,
    },
    {
      name: '所属系部',
      key: 'facultyName',
      order: 3,
    },
    {
      name: '学制',
      key: 'system',
      order: 4,
    },
  ])
);

onMounted(() => {
  fetchList();
});

const fetchList = async (query?: MajorQueryType) => {
  const res = await queryMajor(
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
const updateRow = (row: MajorTableType) => {
  modelTitle.value = '修改';
  active.value = true;
  form.oid = row.oid;
  form.majorCode = row.majorCode;
  form.majorName = row.majorName;
  form.facultyId = row.facultyId;
  form.system = row.system;
};
const delRow = (oid: number) => {
  console.log(oid);
};
</script>
