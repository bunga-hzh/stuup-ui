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
                <el-form-item label="系部名称" prop="key">
                  <el-input v-model="searchForm.key" placeholder="请输入系部名称" />
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
        <el-table-column prop="facultyCode" label="系部编号" show-overflow-tooltip align="center" />
        <el-table-column prop="facultyName" label="系部名称" show-overflow-tooltip align="center" />
        <el-table-column prop="adminName" label="管理员" show-overflow-tooltip align="center" />
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip align="center" />
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
      <el-form-item label="系部编号" prop="facultyCode">
        <el-input v-model="form.facultyCode" placeholder="请输入系部编号" />
      </el-form-item>
      <el-form-item label="系部名称" prop="facultyName">
        <el-input v-model="form.facultyName" placeholder="请输入系部名称" />
      </el-form-item>
      <el-form-item label="系部管理员" prop="facultyAdmin">
        <el-select v-model="form.facultyAdmin" placeholder="请选择管理员" style="width: 100%">
          <el-option v-for="item in user_list" :key="item.oid" :label="item.value" :value="item.oid" />
        </el-select>
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
import { FacultyVO, getFacultyPage, saveOrUpdateFaculty, delFaculty } from '@/api/basic/faculty';
import { UserDictVO, getUserList } from '@/api/system/user';
import { ElMessage, ElMessageBox } from 'element-plus';

onMounted(() => {
  fetchUser();
  fetchList();
});

// 字典值
const user_list = ref<UserDictVO[]>();

const loading = ref<boolean>(false);
const dialog_active = ref<boolean>(false);
const dialog_title = ref<string>('');
const tableData = ref<FacultyVO[]>();
const page = ref({
  current: 1,
  size: 10,
  total: 10,
});
const searchForm = ref({
  key: '',
});
const form = ref<FacultyVO>({
  facultyCode: '',
  facultyName: '',
  facultyAdmin: undefined,
});
const rules = reactive<FormRules>({
  facultyCode: [{ required: true, message: '请填写系部编号', trigger: 'blur' }],
  facultyName: [{ required: true, message: '请填写系部名称', trigger: 'blur' }],
  facultyAdmin: [{ required: true, message: '请选择系部管理员', trigger: 'blur' }],
});
const searchFormRef = ref<FormInstance>();
const formRef = ref<FormInstance>();

const fetchUser = async () => {
  const { data: res } = await getUserList();
  user_list.value = res;
};

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getFacultyPage(Object.assign(page.value, searchForm.value));
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
const updateRow = (row: FacultyVO) => {
  dialog_title.value = '修改';
  dialog_active.value = true;
  form.value.oid = row.oid;
  form.value.facultyCode = row.facultyCode;
  form.value.facultyName = row.facultyName;
  form.value.facultyAdmin = row.facultyAdmin;
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
        const res = await delFaculty(oid.toString());
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
    const data = form.value as unknown as FacultyVO;
    const res = await saveOrUpdateFaculty(data);
    ElMessage.success(res.message);
    dialog_active.value = false;
    fetchList();
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.value = {
    facultyCode: '',
    facultyName: '',
    facultyAdmin: undefined,
  };
  formRef.value?.resetFields();
};
</script>
