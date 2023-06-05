<template>
  <el-dialog v-model="active" title="导入详情" width="60%">
    <el-auto-resizer>
      <template #default="{ width }">
        <el-table-v2 :columns="columns" :data="data" :width="width" :height="500" />
      </template>
    </el-auto-resizer>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RecDefaultVO, growthRecordDetails } from '@/api/collect/index';

const columns = [
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '年级',
    width: 100,
  },
  {
    dataKey: 'className',
    key: 'className',
    title: '班级',
    width: 150,
  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '学生姓名',
    width: 100,
  },
  {
    dataKey: 'studentNo',
    key: 'studentNo',
    title: '学号',
    width: 100,
  },
  {
    dataKey: 'idCard',
    key: 'idCard',
    title: '证件号',
    width: 150,
  },
  {
    dataKey: 'growName',
    key: 'growName',
    title: '项目名称',
    width: 150,
  },
  {
    dataKey: 'createTime',
    key: 'createTime',
    title: '获得时间',
    width: 100,
  },
  {
    dataKey: 'remark',
    key: 'remark',
    title: '备注',
    width: 150,
  },
];
const batchCode = ref<number>();
const active = ref<boolean>(false);
const data = ref<RecDefaultVO[]>([]);
const searchForm = ref({
  firstLeveId: undefined,
  secondLevelId: undefined,
  threeLevelId: undefined,
  growName: undefined,
});

const open = async (growId: number) => {
  batchCode.value = growId;
  // fetchData();
  active.value = true;
};

const fetchData = async () => {
  if (!batchCode.value) return;
  try {
    const { data: res } = await growthRecordDetails(batchCode.value, searchForm.value);
    data.value = res;
  } finally {
  }
};

defineExpose({ open });
</script>

<style scoped lang="scss"></style>
