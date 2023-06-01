<template>
  <el-row style="margin: 20px">
    <el-col :span="24">
      <el-card>
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
                  <el-form-item label="一级项目" prop="firstLevelId">
                    <el-select
                      v-model="searchForm.gradeId"
                      placeholder="请选择一级项目"
                      @change="firstLevelChange"
                      style="width: 100%">
                      <el-option
                        v-for="item in FIRST_LEVEL_DICT"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="二级项目" prop="firstLevelId">
                    <el-select v-model="searchForm.secondLevelId" placeholder="请选择二级项目" style="width: 100%">
                      <el-option
                        v-for="item in SECOND_LEVEL_DICT"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
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
import { getGraderList } from '@/api/basic/grade/index';
import { GrowthTreeVO, getGrowthTree } from '@/api/grow/index';

onMounted(() => {
  initGrade();
  initGrowth();
  fetchList();
});

// 字典
const GROWTH_TREE = ref<GrowthTreeVO[]>([]);
const GRADE_DICT = ref();
const FIRST_LEVEL_DICT = ref();
const SECOND_LEVEL_DICT = ref();
const THREE_LEVEL_DICT = ref();

const growthId = ref<number>();
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
  growName: '',
  gradeId: undefined,
  className: undefined,
  studentName: '',
  studentNo: '',
  startTime: undefined,
  endTime: undefined,
});
const searchFormRef = ref<FormInstance>();

const initGrade = async () => {
  const { data: res } = await getGraderList();
  GRADE_DICT.value = res;
};

const initGrowth = async () => {
  const { data: res } = await getGrowthTree();
  GROWTH_TREE.value = res;
  FIRST_LEVEL_DICT.value = res.map(item => {
    return {
      label: item.name,
      value: item.id,
    };
  });
};

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getRecScorePage(Object.assign(page.value, searchForm.value, { growthId }));
    page.value.total = res.total;
    tableData.value = res.records;
  } finally {
    loading.value = false;
  }
};

const findChildrenById = (node: GrowthTreeVO, id: number): GrowthTreeVO[] | [] => {
  if (node.id === id) {
    return node.children ? node.children : [];
  }

  if (node.children) {
    for (let child of node.children) {
      let result = findChildrenById(child, id);
      if (result) {
        return result;
      }
    }
  }
  return [];
};

const firstLevelChange = (val: number) => {
  GROWTH_TREE.value.forEach(item => {
    findChildrenById(item, val);
  });
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
