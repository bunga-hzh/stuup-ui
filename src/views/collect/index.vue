<template>
  <el-row style="margin: 20px">
    <el-col :span="24">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>成长数据采集</span>
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
                <el-col :sm="24" :md="12" :xl="6">
                  <el-form-item label="一级项目" prop="firstLevelId">
                    <el-select v-model="searchForm.firstLevelId" @change="firstLevelChange" style="width: 100%">
                      <el-option v-for="item in FIRST_LEVEL" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="6">
                  <el-form-item label="二级项目" prop="secondLevelId">
                    <el-select v-model="searchForm.secondLevelId" @change="secondLevelChange" style="width: 100%">
                      <el-option v-for="item in SECOND_LEVEL" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="6">
                  <el-form-item label="三级项目" prop="threeLevelId">
                    <el-select v-model="searchForm.threeLevelId" style="width: 100%">
                      <el-option v-for="item in THREE_LEVEL" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="6">
                  <el-form-item label="成长项目" prop="growName">
                    <el-input v-model="searchForm.growName" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24" style="margin-top: 10px">
      <el-card>
        <template #header>
          <div class="card-header">
            <el-space>
              <el-button type="primary" @click="collectFormRef.open()">
                <el-icon class="el-icon--left"><Upload /></el-icon>
                导入
              </el-button>
            </el-space>
            <el-space>
              <el-button :disabled="loading" circle @click="fetchList">
                <el-icon><Refresh /></el-icon>
              </el-button>
            </el-space>
          </div>
        </template>
        <el-row style="width: 100%">
          <el-col :span="24">
            <el-table :data="tableData" border stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
              <el-table-column prop="firstLevelName" label="一级栏目" show-overflow-tooltip align="center" />
              <el-table-column prop="secondLevelName" label="二级栏目" show-overflow-tooltip align="center" />
              <el-table-column prop="threeLevelName" label="三级栏目" show-overflow-tooltip align="center" />
              <el-table-column prop="growName" label="成长项目" show-overflow-tooltip align="center" />
              <el-table-column prop="createUser" label="创建人" show-overflow-tooltip align="center" />
              <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip align="center" />
              <el-table-column label="操作" width="200" align="center">
                <template #default="{ row }">
                  <el-button @click="collectDetailsRef.open(row.id)">
                    <el-icon class="el-icon--left"><View /></el-icon>
                    查看详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24">
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
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <CollectForm ref="collectFormRef" />
    <CollectDetails ref="collectDetailsRef" />
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { FormInstance } from 'element-plus';
import { getRecLogPage } from '@/api/collect/index';
import { GrowthTreeVO, getGrowthTree } from '@/api/grow/index';
import CollectForm from './CollectForm.vue';
import CollectDetails from './CollectDetails.vue';

onMounted(() => {
  initGrowth();
  fetchList();
});

// 字典
const GROWTH_TREE = ref<GrowthTreeVO[]>([]);
const FIRST_LEVEL = ref();
const SECOND_LEVEL = ref();
const THREE_LEVEL = ref();

// DomRef
const collectFormRef = ref();
const collectDetailsRef = ref();

const loading = ref<boolean>(false);
const tableData = ref();
const page = ref({
  current: 1,
  size: 10,
  total: 10,
});
const searchForm = ref({
  firstLevelId: undefined,
  secondLevelId: undefined,
  threeLevelId: undefined,
  growName: undefined,
});
const searchFormRef = ref<FormInstance>();

const initGrowth = async () => {
  const { data: res } = await getGrowthTree();
  GROWTH_TREE.value = res;
  FIRST_LEVEL.value = res;
};

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getRecLogPage(Object.assign(page.value, searchForm.value));
    page.value.total = res.total;
    tableData.value = res.records;
  } finally {
    loading.value = false;
  }
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

const handleCurrentChange = (val: number) => {
  page.value.current = val;
  fetchList();
};
const handleSizeChange = (val: number) => {
  page.value.size = val;
  fetchList();
};
</script>
