<template>
  <base-card>
    <Space vertical>
      <div style="width: 100%">
        <ConfigProvider :props="searchProvidedProps">
          <Form :model="search">
            <FormItem label="菜单名称" prop="name">
              <Input />
            </FormItem>
            <FormItem label="菜单编号" prop="code">
              <Input />
            </FormItem>
            <FormItem label="菜单类型" prop="flag">
              <Select :options="sexDict" clearable />
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
        <TableColumn name="操作" id-key="menu" :order="6" text-align="center" :width="300">
          <template #default="{ row }">
            <Button @click="updateRow(row)">修改</Button>
            <Button @click="delRow(row.oid)">删除</Button>
            <Button @click="rolePermission(row.oid)">权限分配</Button>
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
          <FormItem label="父节点" prop="pid">
            <Select />
          </FormItem>
          <FormItem label="菜单名称" prop="name">
            <Input />
          </FormItem>
          <FormItem label="菜单编号" prop="code">
            <Input />
          </FormItem>
          <FormItem label="菜单路径" prop="path">
            <Input />
          </FormItem>
          <FormItem label="菜单图标" prop="icon">
            <Select :options="sexDict" clearable />
          </FormItem>
          <FormItem label="菜单组件路径" prop="componentsPath">
            <Input />
          </FormItem>
          <FormItem label="菜单类型" prop="flag">
            <Select />
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
      name: '菜单名称',
      key: 'name',
      order: 1,
    },
    {
      name: '菜单编号',
      key: 'code',
      order: 2,
    },
    {
      name: '菜单路径',
      key: 'path',
      order: 3,
    },
    {
      name: '菜单图标',
      key: 'icon',
      order: 4,
    },
    {
      name: '菜单组件路径',
      key: 'componentsPath',
      order: 5,
    },
    {
      name: '菜单类型',
      key: 'flag',
      order: 5,
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

const rolePermission = (roleIId: number) => {};

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
