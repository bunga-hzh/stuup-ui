<template>
  <el-card style="margin: 20px">
    <template #header>
      <div>
        <span>申请</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <Space vertical>
      <el-form :model="search" inline>
        <el-form-item label="时间范围" prop="dateRange">
          <el-date-picker
            v-model="search.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :size="size" />
        </el-form-item>
        <el-form-item action>
          <el-button type="primary">查询</el-button>
          <el-button>清空</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="data" style="width: 100%">
        <el-table-column prop="date" label="申请项目名称" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column fixed="right" label="Operations" width="200">
          <template #default="{ row }">
            <el-button>重新提交</el-button>
            <el-button>详情</el-button>
            <el-button>审核记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 100%; text-align: right">
        <Pagination
          v-model:active="current"
          :plugins="['total', 'size', 'jump']"
          :total="data.length"
          :page-size="size"></Pagination>
      </div>
    </Space>

    <el-dialog v-model:active="active" transfer title="申请成长积分" :width="500">

        <Form :model="form" label-align="top">
          <FormItem label="申请项目" prop="projectId">
            <Cascader :options="project" clearable />
          </FormItem>
          <FormItem label="申请说明" prop="description">
            <Textarea :max-length="1000" />
          </FormItem>
          <FormItem label="证明附件" prop="fileIds">
            <Upload multiple allow-drag manual url="//jsonplaceholder.typicode.com/posts/" />
          </FormItem>
        </Form>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';

const active = ref<boolean>(false);
const current = ref<number>(1);
const size = ref<number>(10);
const search = reactive({});
const form = reactive({});

const project: Array<Record<string, any>> = [
  {
    label: '时政学习',
    children: [
      {
        label: '参加时政学习(1分)',
        value: 1,
      },
      {
        label: '时政比赛(2分)',
        value: 2,
      },
    ],
  },
  {
    label: '各类各级比赛',
    children: [
      {
        label: '国家级(4分))',
        value: 3,
      },
      {
        label: '市级(3分)',
        value: 4,
      },
      {
        label: '区级(2分)',
        value: 4,
      },
      {
        label: '校级(1分)',
        value: 4,
      },
    ],
  },
];

const columns = ref([
  {
    name: '申请项目名称',
    key: 'name',
    order: 1,
  },
  {
    name: '成长值',
    key: 'score',
    order: 2,
  },
  {
    name: '审核状态',
    key: 'state',
    order: 3,
  },
  {
    name: '申请时间',
    key: 'createTime',
    order: 4,
  },
]);
const data = ref([]);

onMounted(() => {
  mockData();
});

const mockData = (): void => {
  for (let i = 1; i <= 1000; i++) {
    data.value.push({
      name: '社团活动',
      score: '2分',
      state: '待审核',
      createTime: new Date(),
    });
  }
};
</script>
