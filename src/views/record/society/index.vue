<template>
  <el-row style="margin: 20px">
    <el-col :span="24">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>记录填报</span>
            <el-space>
              <el-button type="primary" @click="fetchList" :loading="loading">查询</el-button>
              <el-button @click="searchFormRef?.resetFields()">清空</el-button>
            </el-space>
          </div>
        </template>
        <el-row>
          <el-col :span="24">
            <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="年级" prop="gradeId">
                    <el-select v-model="searchForm.gradeId" style="width: 100%">
                      <el-option v-for="item in GRADE" :key="item.oid" :label="item.gradeName" :value="item.oid" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="所属班级" prop="className">
                    <el-input v-model="searchForm.className" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="学生姓名" prop="studentName">
                    <el-input v-model="searchForm.studentName" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="社团名称" prop="name">
                    <el-input v-model="searchForm.name" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="级别" prop="level">
                    <el-select v-model="searchForm.level" style="width: 100%">
                      <el-option v-for="item in LEVEL_DICT" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card>
        <template #header>
          <div class="card-header">
            <el-space>
              <el-button type="primary">
                <el-icon><Download /></el-icon>
                导出
              </el-button>
            </el-space>
            <el-space>
              <el-button :disabled="loading" circle @click="fetchList">
                <el-icon><Refresh /></el-icon>
              </el-button>
            </el-space>
          </div>
        </template>

        <el-table :data="tableData" border stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
          <el-table-column prop="yearName" label="学年" show-overflow-tooltip align="center" />
          <el-table-column prop="gradeName" label="年级" show-overflow-tooltip align="center" />
          <el-table-column prop="className" label="班级名称" show-overflow-tooltip align="center" />
          <el-table-column prop="studentName" label="学生姓名" show-overflow-tooltip align="center" />
          <el-table-column prop="studentNo" label="学号" show-overflow-tooltip align="center" />
          <el-table-column prop="idCard" label="证件号" show-overflow-tooltip align="center" />
          <el-table-column prop="name" label="社团名称" show-overflow-tooltip align="center" />
          <el-table-column prop="level" label="级别" show-overflow-tooltip align="center" />
          <el-table-column prop="startTime" label="开始时间" show-overflow-tooltip align="center" />
          <el-table-column prop="endTime" label="结束时间" show-overflow-tooltip align="center" />
          <el-table-column prop="role" label="角色" show-overflow-tooltip align="center" />
        </el-table>
        <div class="page-box">
          <el-pagination
            background
            :total="total"
            v-model:current-page="current"
            v-model:page-size="size"
            :page-sizes="[10, 20, 30, 50, 100]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { FormInstance } from 'element-plus';
import { RecSocietyVO, getRecSocietyPage } from '@/api/record/society/index';
import { getGraderList } from '@/api/basic/grade/index';
import { LEVEL } from '@/utils/constant';
import { LEVEL_NAMES } from '@/utils/dict';

onMounted(() => {
  initGrade();
  fetchList();
});

// 字典
const GRADE = ref();
const LEVEL_DICT = Object.entries(LEVEL_NAMES)
  .filter(([key]) => {
    return Number(key) !== LEVEL.COUNTRY && Number(key) !== LEVEL.INTERNATIONAL;
  })
  .map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

const loading = ref<boolean>(false);
const tableData = ref<RecSocietyVO[]>();
const current = ref<number>(1);
const size = ref<number>(10);
const total = ref<number>(0);
const searchForm = ref({
  gradeId: void 0,
  className: void 0,
  studentName: void 0,
  name: void 0,
  level: void 0,
});
const searchFormRef = ref<FormInstance>();

const initGrade = async () => {
  const { data: res } = await getGraderList();
  GRADE.value = res;
};
const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getRecSocietyPage(
      Object.assign(
        {
          current: current.value,
          size: size.value,
        },
        searchForm.value
      )
    );
    total.value = res.total;
    tableData.value = res.records;
  } finally {
    loading.value = false;
  }
};

const handleCurrentChange = (val: number) => {
  current.value = val;
  fetchList();
};
const handleSizeChange = (val: number) => {
  size.value = val;
  fetchList();
};
</script>

<style lang="scss" scoped>
.el-col {
  margin-top: 10px;
}
</style>
