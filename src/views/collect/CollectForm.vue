<template>
  <el-dialog v-model="active" title="导入成长项目" width="30%" center>
    <el-form ref="fromRef" :model="form" :disabled="loading" label-position="top">
      <el-form-item label="成长项目" prop="growId">
        <el-radio-group v-model="form.growId">
          <el-radio v-for="item in growItems" :key="item.id" :label="item.id">
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="导入excel">
        <el-upload
          style="width: 100%"
          class="upload-demo"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple>
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or
            <em>click to upload</em>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">导入</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { getUserGrowthItems, GrowthItemVO } from '@/api/grow/index';
import { ElMessage } from 'element-plus';

const fromRef = ref();

const active = ref<boolean>(false);
const loading = ref<boolean>(false);
const growItems = ref<GrowthItemVO[]>([]);
const form = reactive({
  growId: undefined,
});

onMounted(() => {
  initGrowthItem();
});

const initGrowthItem = async () => {
  const { data: res } = await getUserGrowthItems();
  growItems.value = res;
  form.growId = growItems.value[0].id;
};

const open = () => {
  if (growItems.value.length === 0) return ElMessage.error('没有可以导入的项目');
  active.value = true;
};

defineExpose({ open });
</script>

<style scoped lang="scss"></style>
