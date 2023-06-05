<template>
  <el-row style="margin: 20px">
    <el-col :span="24">
      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <span>成长积分记录</span>
            <el-space>
              <el-button type="primary" @click="fetchList" :loading="loading">查询</el-button>
              <el-button @click="searchFormRef?.resetFields()">清空</el-button>
            </el-space>
          </div>
        </template>
        <el-row>
          <el-col :span="24">
            <el-form ref="searchFormRef" :model="searchForm" label-width="120px">
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="学年" prop="yearId">
                    <el-select v-model="searchForm.yearId" style="width: 100%">
                      <el-option v-for="item in YEAR" :key="item.oid" :label="item.value" :value="item.oid" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="学生姓名" prop="studentName">
                    <el-input v-model="searchForm.studentName" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="学号" prop="studentNo">
                    <el-input v-model="searchForm.studentNo" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="所属班级" prop="studentNo">
                    <el-input v-model="searchForm.studentNo" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="所属年级" prop="gradeId">
                    <el-select v-model="searchForm.gradeId" style="width: 100%">
                      <el-option v-for="item in GRADE" :key="item.oid" :label="item.gradeName" :value="item.oid" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="所属系部" prop="faculyId">
                    <el-select v-model="searchForm.faculyId" style="width: 100%">
                      <el-option v-for="item in GRADE" :key="item.oid" :label="item.gradeName" :value="item.oid" />
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
      <el-card shadow="never" style="margin: 10px 0">
        <template #header>
          <div class="card-header">
            <el-space>
              <el-button :disabled="loading" circle @click="fetchList">
                <el-icon><Refresh /></el-icon>
              </el-button>
            </el-space>
          </div>
        </template>

        <el-table :data="tableData" border stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
          <el-table-column label="排名" type="index" width="55" align="center" :index="indexRank" />
          <el-table-column prop="yearName" label="学年" show-overflow-tooltip align="center" />
          <el-table-column prop="studentName" label="学生姓名" show-overflow-tooltip align="center" />
          <el-table-column prop="studentNo" label="学号" show-overflow-tooltip align="center" />
          <el-table-column prop="gradeName" label="所属年级" show-overflow-tooltip align="center" />
          <el-table-column prop="className" label="所属班级" show-overflow-tooltip align="center" />
          <el-table-column prop="classTeacher" label="班主任" show-overflow-tooltip align="center" />
          <el-table-column prop="facultyName" label="所属系部" show-overflow-tooltip align="center" />
          <el-table-column prop="score" label="总成长值" show-overflow-tooltip align="center" />
        </el-table>
        <div class="page-box">
          <el-pagination
            background
            :total="total"
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
import { getSchoolStuRank } from '@/api/ranking/school_stu/index';
import { getGraderList } from '@/api/basic/grade/index';
import { getYearList } from '@/api/basic/year/index';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

onMounted(() => {
  initYear();
  initGrade();
  fetchList();
});

// 字典
const GRADE = ref();
const YEAR = ref();

const loading = ref<boolean>(false);
const tableData = ref();
const page = ref({
  current: 1,
  size: 10,
});
const total = ref<number>(0);
const searchForm = ref({
  yearId: userStore.getYearId,
  studentName: void 0,
  studentNo: void 0,
  className: void 0,
  gradeId: void 0,
  faculyId: void 0,
});
const searchFormRef = ref<FormInstance>();

const indexRank = (index: number) => {
  return (page.value.current - 1) * page.value.size + index + 1;
};

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
    const { data: res } = await getSchoolStuRank(Object.assign(page.value, searchForm.value));
    total.value = res.total;
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
