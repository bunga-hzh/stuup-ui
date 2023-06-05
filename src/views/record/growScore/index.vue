<template>
  <el-row style="margin: 20px">
    <el-col :span="24">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>成长积分记录</span>
            <el-space>
              <el-button type="primary" @click="handleSearch" :loading="loading">查询</el-button>
              <el-button @click="searchFormReset">清空</el-button>
            </el-space>
          </div>
        </template>
        <el-row>
          <el-col :span="24">
            <el-form ref="searchFormRef" :model="searchForm" label-width="120px">
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="一级项目" prop="firstLevelId">
                    <el-select v-model="searchForm.firstLevelId" @change="firstLevelChange" style="width: 100%">
                      <el-option v-for="item in FIRST_LEVEL" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="二级项目" prop="secondLevelId">
                    <el-select v-model="searchForm.secondLevelId" @change="secondLevelChange" style="width: 100%">
                      <el-option v-for="item in SECOND_LEVEL" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="三级项目" prop="threeLevelId">
                    <el-select v-model="searchForm.threeLevelId" style="width: 100%">
                      <el-option v-for="item in THREE_LEVEL" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="成长项目" prop="growName">
                    <el-input v-model="searchForm.growName" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="学年" prop="yearId">
                    <el-select v-model="searchForm.yearId" style="width: 100%">
                      <el-option v-for="item in YEAR" :key="item.oid" :label="item.value" :value="item.oid" />
                    </el-select>
                  </el-form-item>
                </el-col>
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
                  <el-form-item label="学号" prop="studentNo">
                    <el-input v-model="searchForm.studentNo" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="获取时间" prop="datatimeRange">
                    <el-date-picker
                      v-model="searchForm.datatimeRange"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      value-format="YYYY-MM-DD HH:mm:ss" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card style="margin: 10px 0">
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
          <el-table-column prop="firstLevelName" label="一级栏目" show-overflow-tooltip align="center" />
          <el-table-column prop="secondLevelName" label="二级栏目" show-overflow-tooltip align="center" />
          <el-table-column prop="threeLevelName" label="三级栏目" show-overflow-tooltip align="center" />
          <el-table-column prop="growName" label="成长项目" show-overflow-tooltip align="center" />
          <el-table-column prop="yearName" label="学年" show-overflow-tooltip align="center" />
          <el-table-column prop="gradeName" label="年级" show-overflow-tooltip align="center" />
          <el-table-column prop="className" label="班级名称" show-overflow-tooltip align="center" />
          <el-table-column prop="studentName" label="学生姓名" show-overflow-tooltip align="center" />
          <el-table-column prop="studentNo" label="学号" show-overflow-tooltip align="center" />
          <el-table-column prop="idCard" label="证件号" show-overflow-tooltip align="center" />
          <el-table-column prop="score" label="获得积分" show-overflow-tooltip align="center" />
          <el-table-column prop="createTime" label="获取时间" show-overflow-tooltip align="center" />
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
import { RecScoreVO, getRecScorePage } from '@/api/record/growScore/index';
import { GrowthTreeVO, getGrowthTree } from '@/api/grow/index';
import { getGraderList } from '@/api/basic/grade/index';
import { getYearList } from '@/api/basic/year/index';

onMounted(() => {
  initYear();
  initGrade();
  initGrowth();
  fetchList();
});

// 字典
const GROWTH_TREE = ref<GrowthTreeVO[]>([]);
const YEAR = ref();
const GRADE = ref();
const FIRST_LEVEL = ref();
const SECOND_LEVEL = ref();
const THREE_LEVEL = ref();

const loading = ref<boolean>(false);
const tableData = ref<RecScoreVO[]>();
const page = ref({
  current: 1,
  size: 10,
  total: 10,
});
const searchForm = ref({
  yearId: undefined,
  firstLevelId: undefined,
  secondLevelId: undefined,
  threeLevelId: undefined,
  growName: undefined,
  gradeId: undefined,
  className: undefined,
  studentName: undefined,
  studentNo: undefined,
  datatimeRange: [],
  startTime: undefined,
  endTime: undefined,
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

const initGrowth = async () => {
  const { data: res } = await getGrowthTree();
  GROWTH_TREE.value = res;
  FIRST_LEVEL.value = res;
};

const handleSearch = () => {
  const timeRange = searchForm.value.datatimeRange;
  if (timeRange && timeRange.length) {
    searchForm.value.startTime = timeRange[0];
    searchForm.value.endTime = timeRange[1];
  }
  fetchList();
};

const fetchList = async () => {
  loading.value = true;
  const { datatimeRange, ...search } = searchForm.value;
  try {
    const { data: res } = await getRecScorePage(Object.assign(page.value, search));
    page.value.total = res.total;
    tableData.value = res.records;
  } finally {
    loading.value = false;
  }
};

const findChildrenById = (list: GrowthTreeVO[], id: number): GrowthTreeVO[] | [] => {
  for (const item of list) {
    if (item.id === id) {
      return item.children || [];
    }
    if (item.children) {
      return findChildrenById(item.children, id);
    }
  }
  return [];
};

const firstLevelChange = (val: number) => {
  searchForm.value.secondLevelId = undefined;
  searchForm.value.threeLevelId = undefined;
  SECOND_LEVEL.value = findChildrenById(GROWTH_TREE.value, val);
};

const secondLevelChange = (val: number) => {
  searchForm.value.threeLevelId = undefined;
  THREE_LEVEL.value = findChildrenById(GROWTH_TREE.value, val);
};

const handleCurrentChange = (val: number) => {
  page.value.current = val;
  fetchList();
};
const handleSizeChange = (val: number) => {
  page.value.size = val;
  fetchList();
};

const searchFormReset = () => {
  searchForm.value = {
    yearId: undefined,
    firstLevelId: undefined,
    secondLevelId: undefined,
    threeLevelId: undefined,
    growName: undefined,
    gradeId: undefined,
    className: undefined,
    studentName: undefined,
    studentNo: undefined,
    datatimeRange: [],
    startTime: undefined,
    endTime: undefined,
  };
};
</script>
