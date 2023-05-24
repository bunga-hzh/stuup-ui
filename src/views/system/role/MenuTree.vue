<template>
  <el-drawer v-model="active" title="设置角色权限" size="20%" @close="handleClose">
    <template #footer>
      <el-space>
        <el-switch
          v-model="isSelectAll"
          active-text="全选"
          inactive-text="全不选"
          @change="handleIsSelectAll"
          :disabled="loading" />
        <el-switch
          v-model="isExpandAll"
          active-text="展开"
          inactive-text="折叠"
          @change="handleIsExpandAll"
          :disabled="loading" />
        <el-button @click="active = false">关闭</el-button>
        <el-button type="primary" @click="handleRoleMenu" :loading="loading">确认</el-button>
      </el-space>
    </template>
    <el-tree
      ref="treeRef"
      v-loading="loading"
      node-key="value"
      show-checkbox
      default-expand-all
      :data="treeData"
      :props="props"
      :default-checked-keys="checkKeys" />
  </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { menuTree } from '@/api/system/menu';
import { getRoleMenu, setRoleMenu } from '@/api/system/role';
import { Tree } from '@/types/global';
import { ElMessage } from 'element-plus';

const props = {
  label: 'key',
  children: 'children',
};
const active = ref<boolean>(false);
const isSelectAll = ref<boolean>(false);
const isExpandAll = ref<boolean>(true);
const roleId = ref<number>();
const treeData = ref<Tree[]>([]);
const checkKeys = ref<number[]>();
const loading = ref<boolean>(false);
const treeRef = ref();

onMounted(() => {
  initMenuTree();
});

const handleIsSelectAll = () => {
  treeRef.value.setCheckedNodes(isSelectAll.value ? treeData.value : []);
};

const handleIsExpandAll = () => {
  const nodes = treeRef.value?.store.nodesMap;
  for (let node in nodes) {
    if (nodes[node].expanded === isExpandAll.value) {
      continue;
    }
    nodes[node].expanded = isExpandAll.value;
  }
};

const open = async (id: number) => {
  roleId.value = id;
  try {
    const { data: res } = await getRoleMenu(id);
    checkKeys.value = res;
    active.value = true;
  } catch {}
};

const initMenuTree = async () => {
  try {
    const { data: res } = await menuTree();
    treeData.value = res;
  } catch {}
};

const handleRoleMenu = async () => {
  loading.value = true;
  try {
    if (roleId.value) {
      const keys = treeRef.value.getCheckedKeys() as number[];
      const res = await setRoleMenu(roleId.value, keys);
      ElMessage.success(res.message);
      active.value = false;
    }
  } finally {
    loading.value = false;
  }
};

const handleClose = () => {
  roleId.value = undefined;
  isSelectAll.value = false;
  isExpandAll.value = true;
  checkKeys.value = [];
  handleIsSelectAll();
  handleIsExpandAll();
  loading.value = false;
};

defineExpose({ open }); // 提供方法
</script>
