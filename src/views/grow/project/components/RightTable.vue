<template>
  <div>
    <Card>
      <table-layout>
        <template #search>
          <Form :model="search" style="width: 100%">
            <FormItem label="项目名称" prop="name">
              <Input />
            </FormItem>
          </Form>
        </template>
        <template #searchBtn>
          <Space vertical>
            <Button type="primary">查询</Button>
            <Button>清空</Button>
          </Space>
        </template>
        <template #toolbarLeft>
          <Space>
            <Button
              type="primary"
              @click="
                modelTitle = '添加';
                active = true;
              ">
              添加
            </Button>
          </Space>
        </template>
        <template #toolbarRight>
          <Space>
            <Button>刷新</Button>
          </Space>
        </template>
        <template #table>
          <Table stripe border highlight :columns="columns" :data="data">
            <TableColumn name="操作" id-key="menu" :order="7" text-align="center" :width="300">
              <template #default="{ row }">
                <Button>修改</Button>
                <Button>删除</Button>
                <Button>分配负责人</Button>
              </template>
            </TableColumn>
          </Table>
        </template>
        <template #page>
          <Pagination
            v-model:active="page.current"
            :plugins="['total', 'size', 'jump']"
            :total="page.total"
            :page-size="page.size" />
        </template>
      </table-layout>
    </Card>
    <Modal
      v-model:active="active"
      transfer
      draggable
      resizable
      :width="500"
      :title="modelTitle"
      :loading="modelLoading">
      <ConfigProvider :props="providedProps">
        <Form ref="formRef" :model="form" label-align="top">
          <FormItem label="项目名称" prop="name">
            <Input />
          </FormItem>
          <FormItem label="项目说明" prop="description">
            <Textarea :max-length="200" />
          </FormItem>
          <FormItem label="填报周期" prop="fillPeriod">
            <Select />
          </FormItem>
          <FormItem label="周期内可填报次数">
            <FormItem pure prop="fillType">
              <Select style="margin-right: 10px" />
            </FormItem>
            <FormItem pure prop="fillNum">
              <NumberInput />
            </FormItem>
          </FormItem>
          <FormItem label="积分刷新周期" prop="integralPeriod">
            <Select />
          </FormItem>
          <FormItem label="周期内积分上限">
            <FormItem pure prop="integralType">
              <Select style="margin-right: 10px" />
            </FormItem>
            <FormItem pure prop="obtainIntegral">
              <NumberInput />
            </FormItem>
          </FormItem>
          <FormItem label="积分类型" prop="type">
            <Select />
          </FormItem>
          <FormItem label="积分" prop="integral">
            <NumberInput />
          </FormItem>
        </Form>
      </ConfigProvider>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { defineColumns } from 'vexip-ui';
import type { Pagination } from '@/types/global';

const providedProps = {
  default: { clearable: true },
  formItem: { required: true },
};

const active = ref<boolean>(false);
const modelTitle = ref<string>('');
const modelLoading = ref<boolean>(false);
const page = reactive<Pagination>({
  current: 1,
  size: 10,
  total: 100,
});
const search = reactive({
  name: '',
});
const form = reactive({
  name: '',
  description: '',
  periodTime: undefined,
  periodNum: undefined,
  periodIntegral: undefined,
  integralUpper: undefined,
  type: undefined,
  integral: undefined,
});

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

<style scoped lang="scss"></style>
