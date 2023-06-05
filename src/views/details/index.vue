<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <div class="card-header">
          <span>年份管理</span>
          <el-space>
            <el-button type="primary" @click="fetchList" :loading="loading">
              <el-icon><Search /></el-icon>
              查询
            </el-button>
            <el-button @click="searchFormRef?.resetFields()">
              <el-icon><Close /></el-icon>
              清空
            </el-button>
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
    <el-card>
      <el-table :data="tableData" border stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
        <el-table-column prop="firstLevelName" label="一级栏目" show-overflow-tooltip align="center" />
        <el-table-column prop="secondLevelName" label="二级栏目" show-overflow-tooltip align="center" />
        <el-table-column prop="threeLevelName" label="三级栏目" show-overflow-tooltip align="center" />
        <el-table-column prop="growName" label="成长项目" show-overflow-tooltip align="center" />
        <el-table-column prop="yearName" label="获取学年" show-overflow-tooltip align="center" />
        <el-table-column prop="yearName" label="成长值" show-overflow-tooltip align="center" />
        <el-table-column prop="yearName" label="获取时间" show-overflow-tooltip align="center" />
        <el-table-column prop="resone" label="备注" show-overflow-tooltip align="center" />
      </el-table>
      <div class="page-box">
        <el-pagination
          background
          :disabled="loading"
          :total="total"
          v-model:current-page="page.current"
          v-model:page-size="page.size"
          :page-sizes="[10, 20, 30, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next" />
      </div>
    </el-card>
  </div>
  <el-dialog v-model="dialog_active" :title="dialog_title" width="500" draggable @close="resetForm">
    <template #footer>
      <el-button @click="dialog_active = false">
        <el-icon><Close /></el-icon>
        取消
      </el-button>
      <el-button type="primary" :loading="loading" @click="submitForm">
        <el-icon><Check /></el-icon>
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { GrowthTreeVO, getGrowthTree } from '@/api/grow/index';

const GROWTH_TREE = ref<GrowthTreeVO[]>([]);
const YEAR = ref();
const FIRST_LEVEL = ref();
const SECOND_LEVEL = ref();
const THREE_LEVEL = ref();

const loading = ref<boolean>(false);
const dialog_active = ref<boolean>(false);
const dialog_title = ref<string>('');
const tableData = ref([]);
const page = ref({
  current: 1,
  size: 10,
});
const total = ref<number>(0);
const searchForm = ref({
  yearId: undefined,
  firstLevelId: undefined,
  secondLevelId: undefined,
  threeLevelId: undefined,
  growName: undefined,
  datatimeRange: [],
  startTime: undefined,
  endTime: undefined,
});
const form = ref({});
const rules = reactive<FormRules>({});
const searchFormRef = ref<FormInstance>();
const formRef = ref<FormInstance>();

const fetchList = async () => {
  loading.value = true;
  try {
    // TODO
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

const addRow = () => {
  dialog_title.value = '添加';
  dialog_active.value = true;
};
const updateRow = row => {
  dialog_title.value = '修改';
  dialog_active.value = true;
};
const delRow = (oid: number) => {
  ElMessageBox.confirm('确认删除？', '删除学年', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true;
      try {
        // TODO
      } finally {
        loading.value = false;
      }
    })
    .catch(() => {});
};

const submitForm = async () => {
  if (!formRef) return;
  const valid = await formRef.value?.validate();
  if (!valid) return;
  loading.value = true;
  try {
    // TODO
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.value = {
    yearName: '',
    yearRange: [],
    yearStart: '',
    yearEnd: '',
    lastSemester: '',
    nextSemester: '',
  };
  formRef.value?.resetFields();
};
</script>
