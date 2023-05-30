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
                    <el-select v-model="searchForm.gradeId" placeholder="请选择年级" style="width: 100%">
                      <el-option v-for="item in GRADE_DICT" :key="item.oid" :label="item.gradeName" :value="item.oid" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="所属班级" prop="className">
                    <el-input v-model="searchForm.className" placeholder="请输入所属班级" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="学生姓名" prop="studentName">
                    <el-input v-model="searchForm.studentName" placeholder="请输入学生姓名" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="荣誉称号" prop="name">
                    <el-input v-model="searchForm.name" placeholder="请输入荣誉称号" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="级别" prop="level">
                    <el-select v-model="searchForm.level" placeholder="请选择级别" style="width: 100%">
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
    <el-col :span="24" style="margin-top: 10px">
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
          <el-table-column prop="gradeName" label="年级" show-overflow-tooltip align="center" />
          <el-table-column prop="className" label="班级名称" show-overflow-tooltip align="center" />
          <el-table-column prop="studentName" label="学生姓名" show-overflow-tooltip align="center" />
          <el-table-column prop="studentNo" label="学号" show-overflow-tooltip align="center" />
          <el-table-column prop="idCard" label="证件号" show-overflow-tooltip align="center" />
          <el-table-column prop="name" label="荣誉称号" show-overflow-tooltip align="center" />
          <el-table-column prop="level" label="级别" show-overflow-tooltip align="center" />
          <el-table-column prop="unit" label="评选单位" show-overflow-tooltip align="center" />
          <el-table-column prop="time" label="评选单位" show-overflow-tooltip align="center" />
        </el-table>
        <div class="page-box">
          <el-pagination
            background
            :total="page.total"
            v-model:current-page="page.current"
            v-model:page-size="page.size"
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
import { ClassVO, getClassPage } from '@/api/basic/class/index';
import { GradeDictVO, getGraderList } from '@/api/basic/grade/index';
import { LEVEL } from '@/utils/constant';
import { LEVEL_NAMES } from '@/utils/dict';

onMounted(() => {
  initGrade();
  fetchList();
});

// 字典
const GRADE_DICT = ref<GradeDictVO[]>();
const LEVEL_DICT = Object.entries(LEVEL_NAMES)
  .filter(([key]) => {
    return Number(key) !== LEVEL.INTERNATIONAL;
  })
  .map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

const loading = ref<boolean>(false);
const tableData = ref<ClassVO[]>();
const page = ref({
  current: 1,
  size: 10,
  total: 10,
});
const searchForm = ref({
  gradeId: undefined,
  className: undefined,
  studentName: undefined,
  name: undefined,
  level: undefined,
});
const searchFormRef = ref<FormInstance>();

const initGrade = async () => {
  const { data: res } = await getGraderList();
  GRADE_DICT.value = res;
};
const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getClassPage(Object.assign(page.value, searchForm.value));
    page.value.total = res.total;
    tableData.value = res.records;
  } finally {
    loading.value = false;
  }
};

const handleCurrentChange = (val: number) => {
  page.value.current = val;
  fetchList();
};
const handleSizeChange = (val: number) => {
  page.value.size = val;
  fetchList();
};
</script>
