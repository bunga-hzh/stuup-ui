<template>
  <el-dialog v-model="active" title="导入成长项目" width="30%" center @close="handleClose">
    <el-form ref="fromRef" :model="form" :disabled="loading" label-position="top">
      <el-form-item label="成长项目" prop="rec_code">
        <el-radio-group v-model="form.rec_code">
          <el-row>
            <el-col :span="8" v-for="item in growItems" :key="item.id">
              <el-radio :label="item.code" border style="margin: 5px">
                {{ item.name }}
              </el-radio>
            </el-col>
          </el-row>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <UploadVue ref="uploadRef" url="/api/grow/import" :data="form" :disabled="loading" @success="handleSuccess" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="active = false">取 消</el-button>
        <el-button type="primary" @click="uploadRef.submit()">导入</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { getUserGrowthItems, GrowthItemVO } from '@/api/grow/index';
import { ElMessage } from 'element-plus';
import UploadVue from '@/components/UploadVue.vue';

const fromRef = ref();
const uploadRef = ref();

const active = ref<boolean>(false);
const loading = ref<boolean>(false);
const growItems = ref<GrowthItemVO[]>([]);
const form = reactive({
  rec_code: '',
});

onMounted(() => {
  initGrowthItem();
});

const initGrowthItem = async () => {
  const { data: res } = await getUserGrowthItems();
  growItems.value = res;
  form.rec_code = growItems.value[0].code;
};

const open = () => {
  if (growItems.value.length === 0) return ElMessage.error('没有可以导入的项目');
  active.value = true;
};

const handleSuccess = () => {
  active.value = false;
};

const handleClose = () => {
  form.rec_code = growItems.value[0].code;
  uploadRef.value.reset();
};

defineExpose({ open });
</script>
