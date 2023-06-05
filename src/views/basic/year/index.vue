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
          <el-form ref="searchFormRef" :model="searchForm">
            <el-row>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="年份名称" prop="yearName">
                  <el-input v-model="searchForm.yearName" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <template #header>
        <div class="card-header">
          <el-space>
            <el-button type="primary" @click="addRow">
              <el-icon><Plus /></el-icon>
              添加
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
        <el-table-column prop="yearName" label="年份名称" show-overflow-tooltip align="center" />
        <el-table-column prop="yearStart" label="开始时间" show-overflow-tooltip align="center" />
        <el-table-column prop="yearEnd" label="结束时间" show-overflow-tooltip align="center" />
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip align="center" />
        <el-table-column label="操作" width="300" align="center">
          <template #default="{ row }">
            <el-button :disabled="row.curr === 1" @click="setCurrent(row.oid)" :type="row.curr === 1 ? 'success' : ''">
              {{ row.curr === 1 ? '当前学年' : '设置为当前年' }}
            </el-button>
            <el-button @click="updateRow(row)">修改</el-button>
            <el-button @click="delRow(row.oid)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-box">
        <el-pagination
          background
          :disabled="loading"
          :total="page.total"
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
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :disabled="loading"
      label-position="top"
      style="margin-top: 10px">
      <el-form-item label="年份名称" prop="yearName">
        <el-input v-model="form.yearName" />
      </el-form-item>
      <el-form-item label="起止时间" prop="yearRange">
        <el-date-picker
          v-model="form.yearRange"
          type="daterange"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间" />
      </el-form-item>
    </el-form>
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
import { YearVO, getYearPage, saveOrUpdateYear, delYear, setCurrentYear } from '@/api/basic/year/index';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Message } from '@element-plus/icons-vue/dist/types';

onMounted(() => {
  fetchList();
});

const loading = ref<boolean>(false);
const dialog_active = ref<boolean>(false);
const dialog_title = ref<string>('');
const tableData = ref<YearVO[]>();
const page = ref({
  current: 1,
  size: 10,
  total: 100,
});
const searchForm = ref({
  yearName: '',
});
const form = ref<YearVO>({
  oid: undefined,
  yearName: '',
  yearRange: [],
  yearStart: '',
  yearEnd: '',
  lastSemester: '',
  nextSemester: '',
});
const rules = reactive<FormRules>({
  yearName: [{ required: true, message: '请填写年份名称', trigger: 'blur' }],
  yearRange: [{ required: true, message: '请填写年份起止时间', trigger: 'blur' }],
});
const searchFormRef = ref<FormInstance>();
const formRef = ref<FormInstance>();

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getYearPage(Object.assign(page.value, searchForm.value));
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

const setCurrent = async (id: number) => {
  ElMessageBox.confirm('确认设置为当前年？', '设置为当前年', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true;
      try {
        const res = await setCurrentYear(id);
        ElMessage.success(res.message);
        fetchList();
      } finally {
        loading.value = false;
      }
    })
    .catch(() => {});
};

const addRow = () => {
  dialog_title.value = '添加';
  dialog_active.value = true;
};
const updateRow = (row: YearVO) => {
  dialog_title.value = '修改';
  dialog_active.value = true;
  form.value.oid = row.oid;
  form.value.yearName = row.yearName;
  form.value.yearRange = [row.yearStart, row.yearEnd];
  form.value.lastSemester = row.lastSemester;
  form.value.nextSemester = row.nextSemester;
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
        const res = await delYear(oid.toString());
        ElMessage.success(res.message);
        fetchList();
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
  form.value.yearStart = form.value.yearRange[0];
  form.value.yearEnd = form.value.yearRange[1];
  try {
    const data = form.value as unknown as YearVO;
    const res = await saveOrUpdateYear(data);
    ElMessage.success(res.message);
    dialog_active.value = false;
    fetchList();
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
