<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <div class="card-header">
          <span>菜单管理</span>
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
                <el-form-item label="父菜单" prop="pid">
                  <el-select v-model="searchForm.pid" placeholder="请输入父菜单" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="菜单名称" prop="name">
                  <el-input v-model="searchForm.name" placeholder="请输入菜单名称" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="菜单编号" prop="code">
                  <el-input v-model="searchForm.code" placeholder="请输入菜单编号" />
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
        <el-table-column prop="name" label="菜单名称" show-overflow-tooltip align="center" />
        <el-table-column prop="code" label="菜单编号" show-overflow-tooltip align="center" />
        <el-table-column prop="path" label="菜单路径" show-overflow-tooltip align="center" />
        <el-table-column prop="icon" label="菜单图标" show-overflow-tooltip align="center" />
        <el-table-column prop="flag" label="菜单标识" show-overflow-tooltip align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button @click="updateRow(row)">修改</el-button>
            <el-button @click="delRow(row.oid)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <el-dialog v-model="dialog_active" :title="dialog_title" width="500" draggable @close="resetForm">
    <el-form ref="formRef" :model="form" :rules="rules" :disabled="loading" label-position="top">
      <el-form-item label="父菜单" prop="pid">
        <el-select v-model="form.pid" placeholder="请选择父菜单" style="width: 100%" />
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="菜单编号" prop="code">
        <el-input v-model="form.code" placeholder="请输入菜单编号" />
      </el-form-item>
      <el-form-item label="菜单路径" prop="path">
        <el-input v-model="form.path" placeholder="请输入菜单路径" />
      </el-form-item>
      <el-form-item label="菜单标识" prop="flag">
        <el-select v-model="form.flag" placeholder="请选择菜单标识" style="width: 100%" />
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
import { getMenuTree, saveMenu, MenuVO } from '@/api/system/menu/index';
import { ElMessage } from 'element-plus';

onMounted(() => {
  // fetchList();
});

const loading = ref<boolean>(false);
const dialog_active = ref<boolean>(false);
const dialog_title = ref<string>('');
const tableData = ref<MenuVO[]>();
const searchForm = ref({
  pid: undefined,
  name: '',
  code: '',
});
const form = ref<MenuVO>({
  oid: undefined,
  pid: undefined,
  name: '',
  code: '',
  path: '',
  flag: undefined,
});
const rules = reactive<FormRules>({
  pid: [{ required: true, message: '请选择父菜单', trigger: 'blur' }],
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入菜单编号', trigger: 'blur' }],
  path: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }],
  flag: [{ required: true, message: '请选择菜单标识', trigger: 'blur' }],
});
const searchFormRef = ref<FormInstance>();
const formRef = ref<FormInstance>();

const fetchList = async () => {
  loading.value = true;
  try {
    // const { data: res } = await getMenuTree(searchForm.value);
    // tableData.value = res;
  } finally {
    loading.value = false;
  }
};

const addRow = () => {
  dialog_title.value = '添加';
  dialog_active.value = true;
};
const updateRow = (row: MenuVO) => {
  dialog_title.value = '修改';
  dialog_active.value = true;
  form.value.oid = row.oid;
  //TODO
};
const delRow = (oid: number) => {
  console.log(oid);
};

const submitForm = async () => {
  if (!formRef) return;
  const valid = await formRef.value?.validate();
  if (!valid) return;
  loading.value = true;
  try {
    const data = form.value as unknown as MenuVO;
    const res = await saveMenu(data);
    ElMessage.success(res.message);
    dialog_active.value = false;
    fetchList();
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.value = {
    oid: undefined,
    pid: undefined,
    name: '',
    code: '',
    path: '',
    flag: undefined,
  };
  formRef.value?.resetFields();
};
</script>
