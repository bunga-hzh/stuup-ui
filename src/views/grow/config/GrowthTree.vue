<template>
  <el-card style="margin-top: 10px">
    <template #header>
      <div class="card-header">
        <span>成长项目</span>
        <el-space>
          <el-button type="primary" :loading="loading" @click="queryAll">
            <el-icon><Search /></el-icon>
            查询全部
          </el-button>
          <el-button type="primary" :loading="loading" @click="addRow">
            <el-icon><Plus /></el-icon>
            添加
          </el-button>
          <el-button type="primary" :loading="loading" @click="updateRow">
            <el-icon><Edit /></el-icon>
            修改
          </el-button>
          <el-button type="danger" :loading="loading" @click="delRow">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </el-space>
      </div>
    </template>
    <el-input v-model="filterText" placeholder="请输入项目名称" />
    <el-tree
      ref="treeRef"
      v-loading="loading"
      default-expand-all
      :data="treeData"
      :props="props"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick" />
    <el-dialog v-model="active" :title="title" width="20%" @close="handleDialogClose">
      <el-form ref="formRef" :model="form" :rules="rules" :disabled="loading" label-position="top">
        <el-form-item label="父项目" prop="pid">
          <el-cascader
            v-model="form.pid"
            placeholder="请选择父项目"
            clearable
            :options="treeData"
            :props="cascaderProps"
            style="width: 100%" />
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            show-word-limit
            maxlength="200"
            placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="顺序" prop="sort">
          <el-input-number v-model="form.sort" :min="1" controls-position="right" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="active = false">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="submitForm">
            <el-icon><Check /></el-icon>
            提 交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, watch, h } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { GrowthTreeVO, GrowthVO, getGrowthTree, saveOrUpdateGrowth, delGrowth } from '@/api/grow/index';
import { ElMessage, ElMessageBox, ElTree } from 'element-plus';
import Bus from '@/utils/bus';

const props = {
  label: 'name',
  children: 'children',
};

const cascaderProps = {
  label: 'name',
  value: 'id',
  children: 'children',
  emitPath: false,
  checkStrictly: true,
  expandTrigger: 'hover',
};

const active = ref<boolean>(false);
const title = ref<string>('');
const loading = ref<boolean>(false);
const filterText = ref<string>();
const treeData = ref<GrowthTreeVO[]>([]);

const treeRef = ref<InstanceType<typeof ElTree>>();
const formRef = ref<FormInstance>();
const form = ref<GrowthVO>({
  id: undefined,
  pid: undefined,
  name: '',
  description: '',
  sort: undefined,
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请填写项目名称', trigger: 'blur' }],
  sort: [{ required: true, message: '请填写顺序', trigger: 'blur' }],
});

onMounted(() => {
  fetchGetGrowthTree();
});

const fetchGetGrowthTree = async () => {
  loading.value = true;
  try {
    const { data: res } = await getGrowthTree();
    treeData.value = res;
    Bus.emit('get-tree', res);
  } finally {
    loading.value = false;
  }
};

const queryAll = () => {
  Bus.emit('reset-id');
};

const addRow = () => {
  resetForm();
  title.value = '添加成长项目';
  active.value = true;
};

const updateRow = () => {
  if (!form.value.id) return ElMessage.warning('请选择要修改的项目');
  title.value = '修改成长项目';
  active.value = true;
};

const delRow = () => {
  if (!form.value.id) return ElMessage.warning('请选择要删除的项目');
  ElMessageBox({
    title: '删除成长项目',
    message: h('p', null, [
      h('span', null, '确认删除项目：'),
      h('strong', { style: 'color: #409EFF; font-size: 18px' }, form.value.name),
    ]),
    showCancelButton: true,
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
  })
    .then(async () => {
      loading.value = true;
      try {
        const res = await delGrowth(form.value.id!);
        ElMessage.success(res.message);
        fetchGetGrowthTree();
      } finally {
        loading.value = false;
      }
    })
    .catch(() => {});
};

const handleNodeClick = (nodeData: GrowthTreeVO, e) => {
  const keys = [];
  form.value.id = nodeData.id;
  form.value.pid = nodeData.pid;
  form.value.name = nodeData.name;
  form.value.description = nodeData.description;
  form.value.sort = nodeData.sort;
  keys.push(nodeData.id);
  let parentNode = e.parent;
  while (parentNode.data?.id) {
    keys.unshift(parentNode.data?.id);
    parentNode = parentNode.parent;
  }
  Bus.emit('node-click', keys);
};

const submitForm = async () => {
  if (!formRef) return;
  const valid = await formRef.value?.validate();
  if (!valid) return;
  if (form.value.id === form.value.pid) return ElMessage.warning('父项目不能为自己');
  loading.value = true;
  try {
    const res = await saveOrUpdateGrowth(form.value);
    ElMessage.success(res.message);
    active.value = false;
    fetchGetGrowthTree();
  } finally {
    loading.value = false;
  }
};

watch(filterText, val => {
  treeRef.value!.filter(val);
});
const filterNode = (value: string, data: GrowthTreeVO) => {
  if (!value) return true;
  return data.name.includes(value);
};

const handleDialogClose = () => {
  loading.value = false;
  title.value = '';
  resetForm();
};

const resetForm = () => {
  form.value = {
    id: undefined,
    pid: undefined,
    name: '',
    description: '',
    sort: undefined,
  };
  formRef.value?.resetFields();
};
</script>
