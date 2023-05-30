<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>项目管理</span>
            <el-space>
              <el-button type="primary" @click="fetchList" :loading="loading">查询</el-button>
              <el-button @click="searchFormRef?.resetFields()">清空</el-button>
            </el-space>
          </div>
        </template>
        <el-row>
          <el-col :span="24">
            <el-form ref="searchFormRef" :model="searchForm" label-position="top">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="活动名称" prop="name">
                    <el-input v-model="searchForm.name" placeholder="请输入活动名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="级别" prop="level">
                    <el-select v-model="searchForm.level" placeholder="请选择级别" style="width: 100%">
                      <el-option
                        v-for="[key, value] in Object.entries(LEVEL_NAMES)"
                        :key="key"
                        :label="value"
                        :value="key" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card>
        <template #header>
          <div class="card-header">
            <el-space>
              <el-button type="primary">
                <el-icon><Download /></el-icon>
                导出
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
          <el-table-column prop="name" label="项目名称" show-overflow-tooltip align="center" />
          <el-table-column prop="level" label="获得奖项（级别）" show-overflow-tooltip align="center" />
          <el-table-column prop="org" label="组织机构（主办方）" show-overflow-tooltip align="center" />
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
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { FormInstance } from 'element-plus';
import { ClassVO, getClassPage } from '@/api/basic/class/index';
import { LEVEL_NAMES } from '@/utils/dict';

onMounted(() => {
  fetchList();
});

const loading = ref<boolean>(false);
const tableData = ref<ClassVO[]>();
const page = ref({
  current: 1,
  size: 10,
  total: 10,
});
const searchForm = ref({
  name: '',
  level: undefined,
  org: '',
});
const searchFormRef = ref<FormInstance>();

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getClassPage(Object.assign(page.value, searchForm.value));
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
</script>

<style lang="scss" scoped>
.el-col {
  margin-top: 10px;
}
</style>
