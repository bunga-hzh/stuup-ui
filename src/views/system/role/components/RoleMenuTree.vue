<template>
  <el-drawer v-model="active" title="设置角色权限" size="20%">
    <template #footer>
      <el-space>
        <el-switch v-model="isSelectAll" active-text="全选" inactive-text="全不选" @change="handleIsSelectAll" />
        <el-switch v-model="isExpandAll" active-text="展开" inactive-text="折叠" @change="handleIsExpandAll" />
        <el-button @click="active = false">关闭</el-button>
        <el-button type="primary">确认</el-button>
      </el-space>
    </template>
    <el-tree
      ref="treeRef"
      node-key="value"
      show-checkbox
      default-expand-all
      :data="treeData"
      :props="props"
      :default-expanded-keys="expandKeys"
      :default-checked-keys="checkdKeys" />
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { menuTree } from '@/api/system/menu';
import { getRoleMenu } from '@/api/system/role';
import { Tree } from '@/types/global';

const props = {
  label: 'key',
  children: 'children',
};
const active = ref<boolean>(false);
const isSelectAll = ref<boolean>(false);
const isExpandAll = ref<boolean>(false);
const treeData = ref<Tree[]>([]);
const expandKeys = ref<number[]>();
const checkdKeys = ref<number[]>();
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

const open = async (roleId: number) => {
  try {
    const { data: res } = await getRoleMenu(roleId);
    checkdKeys.value = res;
    active.value = true;
  } catch {}
};

const initMenuTree = async () => {
  try {
    const { data: res } = await menuTree();
    treeData.value = res;
  } catch {}
};

defineExpose({ open }); // 提供方法
</script>
