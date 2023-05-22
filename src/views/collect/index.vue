<template>
  <Card style="margin: 20px">
    <Table :columns="columns" :data="data" :head-style="headerStyle" :cell-style="cellStyle" border>
      <TableColumn name="操作" id-key="menu" :order="9" :width="200">
        <template #default="{ row }">
          <Button @click="model_active = true">导入</Button>
          <Button @click="drawer_active = true">导入记录</Button>
        </template>
      </TableColumn>
    </Table>
    <Modal
      v-model:active="model_active"
      transfer
      draggable
      resizable
      :width="500"
      title="导入"
      :loading="model_loading">
      <template #footer>
        <Button @click="model_active = false">取消</Button>
        <Button type="primary">下载模板</Button>
        <Button type="primary">确认</Button>
      </template>
      <ConfigProvider :props="providedProps">
        <Form ref="formRef" :model="form" label-align="top">
          <FormItem label="导入记录填报" prop="fileIds">
            <Upload multiple allow-drag manual url="//jsonplaceholder.typicode.com/posts/" />
          </FormItem>
          <FormItem label="导入项目管理" prop="fileIds">
            <Upload multiple allow-drag manual url="//jsonplaceholder.typicode.com/posts/" />
          </FormItem>
        </Form>
      </ConfigProvider>
    </Modal>
    <Drawer v-model:active="drawer_active" title="导入记录" transfer width="600">
      <Table
        :columns="[
          {
            name: '项目名称',
            key: 'name',
          },
          {
            name: '导入时间',
            key: 'time',
          },
        ]"
        :data="[]"
        border />
    </Drawer>
  </Card>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { defineColumns } from 'vexip-ui';

const headerStyle = {
  'justify-content': 'center',
};
const cellStyle = {
  'text-align': 'center',
};

const providedProps = {
  default: { clearable: true },
  formItem: { required: true },
};

const model_active = ref<boolean>(false);
const drawer_active = ref<boolean>(false);
const model_loading = ref<boolean>(false);
const form = reactive({});

const columns = ref(
  defineColumns([
    {
      name: '项目名称',
      key: 'name',
    },
    {
      name: '填报说明',
      key: 'description',
    },
    {
      name: '填报周期',
      key: 'fillPeriod',
    },
    {
      name: '周期内可填报次数',
      key: 'fillNum',
    },
    {
      name: '积分刷新周期',
      key: 'integralPeriod',
    },
    {
      name: '周期可获得积分',
      key: 'obtainIntegral',
    },
    {
      name: '录入类型',
      key: 'type',
    },
    {
      name: '积分',
      key: 'integral',
    },
  ])
);
const data = ref([
  {
    name: '主题教育活动',
    description: '班会课，升旗仪式，主题教育活动',
    fillPeriod: '不限',
    fillNum: '不限',
    integralPeriod: '不限',
    obtainIntegral: '2',
    type: '加分',
    integral: 1,
  },
]);
</script>
