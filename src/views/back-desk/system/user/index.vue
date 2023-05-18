<template>
  <base-card>
    <Space vertical>
      <div style="width: 100%">
        <ConfigProvider :props="searchProvidedProps">
          <Form :model="search">
            <FormItem label="用户账号" prop="loginName">
              <Input />
            </FormItem>
            <FormItem label="用户姓名" prop="userName">
              <Input />
            </FormItem>
            <FormItem label="性别" prop="name">
              <Select :options="sexDict" clearable />
            </FormItem>
            <FormItem label="用户类型" prop="userType">
              <Select :options="sexDict" clearable />
            </FormItem>
            <FormItem label="所属部门" prop="deptId">
              <Select :options="deptDict" clearable />
            </FormItem>
            <FormItem label="状态" prop="state">
              <Select :options="stateDict" clearable />
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
        <TableColumn name="操作" id-key="menu" :order="10" text-align="center" :width="200">
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
          :total="total"
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
          <FormItem label="用户账号" prop="loginName">
            <Input />
          </FormItem>
          <FormItem label="用户密码" prop="password">
            <Input />
          </FormItem>
          <FormItem label="用户姓名" prop="userName">
            <Input />
          </FormItem>
          <FormItem label="性别" prop="name">
            <Select :options="sexDict" />
          </FormItem>
          <FormItem label="用户类型" prop="userType">
            <Select :options="sexDict" />
          </FormItem>
          <FormItem label="所属部门" prop="deptId">
            <Select :options="deptDict" />
          </FormItem>
          <FormItem label="身份证号" prop="idCard">
            <Input />
          </FormItem>
          <FormItem label="出生年月" prop="birthday">
            <DatePicker />
          </FormItem>
          <FormItem label="状态" prop="state">
            <Select :options="stateDict" />
          </FormItem>
        </Form>
      </ConfigProvider>
    </Modal>
  </base-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { Select, defineColumns } from 'vexip-ui';
import { PaginationResult } from '@/types/global';
import { queryTeacher, TeacherQueryType } from '@/api/teacher/index';

interface TeacherSearchType {
  naem: string;
  facultyId: number | null;
}

interface TeacherTableType {
  oid: number | null;
  name: string;
  jobNo: string;
  facultyId?: number | null;
  type?: number | null;
}

interface TeacherFormType {
  oid: number | null;
  name: string;
  jobNo: string;
  facultyId?: number | null;
  type?: number | null;
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
const total = ref<number>(10);
const deptDict = ref([]);
const sexDict = ref([]);
const stateDict = ref([]);
const typeDict = ref([]);
const data = ref<TeacherTableType[]>([]);
const search = reactive<TeacherSearchType>({
  naem: '',
  facultyId: null,
});
const form = reactive<TeacherFormType>({
  oid: null,
  name: '',
  jobNo: '',
  facultyId: null,
  type: null,
});

const formRef = ref();

const columns = ref(
  defineColumns([
    {
      name: '用户姓名',
      key: 'userName',
      order: 1,
    },
    {
      name: '性别',
      key: 'sex',
      order: 2,
    },
    {
      name: '手机号',
      key: 'mobile',
      order: 3,
    },
    {
      name: '用户类型',
      key: 'userType',
      order: 4,
    },
    {
      name: '所属部门',
      key: 'deptId',
      order: 5,
    },
    {
      name: '身份证',
      key: 'idCard',
      order: 6,
    },
    {
      name: '出生年月',
      key: 'birthday',
      order: 7,
    },
    {
      name: '用户账号',
      key: 'loginName',
      order: 8,
    },
    {
      name: '状态',
      key: 'state',
      order: 9,
    },
  ])
);

onMounted(() => {
  fetchList();
});

const fetchList = async (query?: TeacherQueryType) => {
  const res = await queryTeacher(
    Object.assign({ currentPage: currentPage.value, pageSize: pageSize.value }, search, query)
  );
  const result = res.data as PaginationResult;
  total.value = result.total;
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
const updateRow = (row: TeacherTableType) => {
  modelTitle.value = '修改';
  active.value = true;
  form.oid = row.oid;
  form.name = row.name;
  form.jobNo = row.jobNo;
  form.facultyId = row.facultyId;
  form.type = row.type;
};
const delRow = (oid: number) => {
  console.log(oid);
};
</script>
