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
                <el-form-item label="项目名称" prop="yearName">
                  <el-input v-model="searchForm.name" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table :data="tableData" border stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
        <el-table-column prop="name" label="申请项目名称" show-overflow-tooltip align="center" />
        <el-table-column prop="score" label="项目成长值" show-overflow-tooltip align="center" />
        <el-table-column prop="studentName" label="申请人" show-overflow-tooltip align="center" />
        <el-table-column prop="createTime" label="申请时间" show-overflow-tooltip align="center" />
        <el-table-column prop="state" label="审核状态" show-overflow-tooltip align="center" />
        <el-table-column label="操作" width="400" align="center">
          <template #default="{ row }">
            <el-button>查看详情</el-button>
            <el-button>通过</el-button>
            <el-button type="danger">拒绝</el-button>
          </template>
        </el-table-column>
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

const loading = ref<boolean>(false);
const dialog_active = ref<boolean>(false);
const dialog_title = ref<string>('');
const tableData = ref([{}]);
const page = ref({
  current: 1,
  size: 10,
});
const total = ref<number>(0);
const searchForm = ref({
  name: '',
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
