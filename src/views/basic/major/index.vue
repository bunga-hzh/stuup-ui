<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <div class="card-header">
          <span>年份管理</span>
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
                <el-form-item label="专业名称" prop="key">
                  <el-input v-model="searchForm.key" placeholder="请输入专业名称" />
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
        <el-table-column prop="majorCode" label="专业编号" show-overflow-tooltip align="center" />
        <el-table-column prop="majorName" label="专业名称" show-overflow-tooltip align="center" />
        <el-table-column prop="facultyName" label="所属系部" show-overflow-tooltip align="center" />
        <!-- TODO 字典 -->
        <el-table-column prop="system" label="学制" show-overflow-tooltip align="center" />
        <el-table-column prop="state" label="状态" show-overflow-tooltip align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button @click="updateRow(row)">修改</el-button>
            <el-button @click="delRow(row.oid)" type="danger">删除</el-button>
          </template>
        </el-table-column>
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
  </div>
  <el-dialog v-model="dialog_active" :title="dialog_title" width="500" draggable @close="resetForm">
    <el-form ref="formRef" :model="form" :rules="rules" :disabled="loading" label-position="top">
      <el-form-item label="专业编号" prop="majorCode">
        <el-input v-model="form.majorCode" placeholder="请输入专业编号" />
      </el-form-item>
      <el-form-item label="专业名称" prop="majorName">
        <el-input v-model="form.majorName" placeholder="请输入专业名称" />
      </el-form-item>
      <el-form-item label="所属系部" prop="facultyId">
        <el-select v-model="form.facultyId" placeholder="请输入所属系部" style="width: 100%">
          <el-option v-for="item in faculty_list" :key="item.oid" :label="item.facultyName" :value="item.oid" />
        </el-select>
      </el-form-item>
      <el-form-item label="专业编号" prop="system">
        <el-input-number
          v-model="form.system"
          placeholder="请输入学制"
          controls-position="right"
          :min="0"
          :max="5"
          style="width: 100%" />
      </el-form-item>
      <!-- TODO 字典 -->
      <el-form-item label="专业编号" prop="state">
        <el-radio-group v-model="form.state">
          <el-radio label="1" border>有效</el-radio>
          <el-radio label="2" border>无效</el-radio>
        </el-radio-group>
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
import { MajorVO, getMajorPage, saveOrUpdateMajor, delMajor } from '@/api/basic/major/index';
import { FacultyDictVO, getFacultyList } from '@/api/basic/faculty/index';
import { ElMessage, ElMessageBox } from 'element-plus';

onMounted(() => {
  initFacultyList();
  fetchList();
});

// 字典值
const faculty_list = ref<FacultyDictVO[]>();

const loading = ref<boolean>(false);
const dialog_active = ref<boolean>(false);
const dialog_title = ref<string>('');
const tableData = ref<MajorVO[]>();
const page = ref({
  current: 1,
  size: 10,
  total: 10,
});
const searchForm = ref({
  key: '',
});
const form = ref<MajorVO>({
  majorCode: '',
  majorName: '',
  facultyId: undefined,
  system: undefined,
  state: undefined,
});
const rules = reactive<FormRules>({
  majorCode: [{ required: true, message: '请填写专业编号', trigger: 'blur' }],
  majorName: [{ required: true, message: '请填写专业名称', trigger: 'blur' }],
  facultyId: [{ required: true, message: '请选择所属系部', trigger: 'blur' }],
  system: [{ required: true, message: '请输入学制', trigger: 'blur' }],
  state: [{ required: true, message: '请选择专业状态', trigger: 'blur' }],
});
const searchFormRef = ref<FormInstance>();
const formRef = ref<FormInstance>();

const initFacultyList = async () => {
  const { data: res } = await getFacultyList();
  faculty_list.value = res;
};

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getMajorPage(Object.assign(page.value, searchForm.value));
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

const addRow = () => {
  dialog_title.value = '添加';
  dialog_active.value = true;
};
const updateRow = (row: MajorVO) => {
  dialog_title.value = '修改';
  dialog_active.value = true;
  form.value.oid = row.oid;
  form.value.majorCode = row.majorCode;
  form.value.majorName = row.majorName;
  form.value.facultyId = row.facultyId;
  form.value.system = row.system;
  form.value.state = row.state;
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
        const res = await delMajor(oid.toString());
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
  try {
    const data = form.value as unknown as MajorVO;
    const res = await saveOrUpdateMajor(data);
    ElMessage.success(res.message);
    dialog_active.value = false;
    fetchList();
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.value = {
    majorCode: '',
    majorName: '',
    facultyId: undefined,
    system: undefined,
    state: undefined,
  };
  formRef.value?.resetFields();
};
</script>
