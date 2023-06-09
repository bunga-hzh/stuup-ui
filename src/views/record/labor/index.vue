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
                  <el-form-item label="学年" prop="yearId">
                    <el-select v-model="searchForm.yearId" style="width: 100%">
                      <el-option v-for="item in YEAR" :key="item.oid" :label="item.value" :value="item.oid" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="年级" prop="gradeId">
                    <el-select v-model="searchForm.gradeId" placeholder="请选择年级" style="width: 100%">
                      <el-option v-for="item in GRADE" :key="item.oid" :label="item.gradeName" :value="item.oid" />
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
          <el-table-column prop="yearName" label="学年" show-overflow-tooltip align="center" />
          <el-table-column prop="gradeName" label="年级" show-overflow-tooltip align="center" />
          <el-table-column prop="className" label="班级名称" show-overflow-tooltip align="center" />
          <el-table-column prop="studentName" label="学生姓名" show-overflow-tooltip align="center" />
          <el-table-column prop="studentNo" label="学号" show-overflow-tooltip align="center" />
          <el-table-column prop="idCard" label="证件号" show-overflow-tooltip align="center" />
          <el-table-column prop="hours" label="累计课时" show-overflow-tooltip align="center" />
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
import { RecLaborTimeVO, getRecLaborTimePage } from '@/api/record/labor/index';
import { getYearList } from '@/api/basic/year/index';
import { getGraderList } from '@/api/basic/grade/index';

onMounted(() => {
  initYear();
  initGrade();
  fetchList();
});

// 字典
const YEAR = ref();
const GRADE = ref();

const loading = ref<boolean>(false);
const tableData = ref<RecLaborTimeVO[]>();
const page = ref({
  current: 1,
  size: 10,
  total: 10,
});
const searchForm = ref({
  yearId: undefined,
  gradeId: undefined,
  className: undefined,
  studentName: undefined,
  name: undefined,
  level: undefined,
});
const searchFormRef = ref<FormInstance>();

const initYear = async () => {
  const { data: res } = await getYearList();
  YEAR.value = res;
};

const initGrade = async () => {
  const { data: res } = await getGraderList();
  GRADE.value = res;
};
const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getRecLaborTimePage(Object.assign(page.value, searchForm.value));
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
