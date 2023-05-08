<template>
  <base-card>
    <form class="apply-form">
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">申请标准</label>
        <select
          class="form-select"
          aria-label="请选择申请标准"
          v-model="form.standardId"
          @change="handleStandardChange">
          <option selected="selected" disabled="disabled" style="display: none" value="" />
          <option v-for="item in standards" :key="item.id" :label="item.standardName" :value="item.id" />
        </select>
      </div>
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">申请项目</label>
        <select class="form-select" aria-label="请选择申请项目" v-model="form.projectId">
          <option selected="selected" disabled="disabled" style="display: none" value="" />
          <option v-for="item in projects" :key="item.id" :label="item.projectName" :value="item.id" />
        </select>
      </div>
    </form>
  </base-card>
  <!-- <a-card class="cm16">
    <div class="form-box">
      <a-form ref="form" class="form" :model="form" layout="vertical">
        <a-form-item field="standardId" label="申请标准">
          <a-select v-model="form.standardId" placeholder="请选择申请标准" @change="handleStandardChange" allow-clear>
            <a-option v-for="item in standards" :key="item.id" :label="item.standardName" :value="item.id" />
          </a-select>
        </a-form-item>
        <a-form-item field="projectId" label="申请项目">
          <a-select v-model="form.projectId" placeholder="请选择申请项目" allow-clear>
            <a-option v-for="item in projects" :label="item.projectName" :value="item.id" :key="item.id" />
          </a-select>
        </a-form-item>
        <a-form-item field="description" label="申请说明">
          <a-textarea placeholder="请填写申请说明" :max-length="1000" allow-clear show-word-limit />
        </a-form-item>
        <a-form-item field="fileIds" label="申请附件">
          <a-upload draggable action="/" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button html-type="submit">提交</a-button>
            <a-button @click="$refs.form.resetFields()">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </a-card> -->
</template>

<script setup lang="ts">
interface FormType {
  standardId: number | null;
  projectId: number | null;
}

interface StandardType {
  id: number;
  standardName: string;
  children: Array<ProjectType>;
}
interface ProjectType {
  id: number;
  projectName: string;
}
import { reactive, computed } from 'vue';

const form = reactive<FormType>({
  standardId: null,
  projectId: null,
});

const standards = reactive<Array<StandardType>>([
  {
    id: 1,
    standardName: '时政学习',
    children: [
      { id: 1, projectName: '参加时政学习（1分）' },
      { id: 2, projectName: '时政比赛（2分）' },
    ],
  },
  {
    id: 2,
    standardName: '各类各级比赛',
    children: [
      { id: 1, projectName: '国家级（4分）' },
      { id: 2, projectName: '市级（3分）' },
      { id: 3, projectName: '区级（2分）' },
      { id: 4, projectName: '校级（1分）' },
    ],
  },
]);

const standardsObj = computed(() => {
  let obj = {};
  standards.forEach(item => {
    obj[item.id] = item.children;
  });
  return obj;
});

let projects = reactive<Array<ProjectType>>([]);

const handleStandardChange = (value: number) => {
  console.log(standardsObj.value[value]);
  projects = standardsObj.value[value];
};
</script>

<style scoped lang="scss">
.apply-form {
  width: 50%;
  position: relative;
  margin: 0 auto;
}
</style>
