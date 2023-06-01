<template>
  <div style="width: 100%">
    <el-upload
      ref="uploadRef"
      :accept="accept"
      drag
      :action="url"
      :headers="headers"
      :data="data"
      :auto-upload="autoUpload"
      :limit="limit"
      :disabled="disabled"
      :on-success="handleSuccess">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
    <el-dialog v-model="active" title="导入错误信息" width="20%" append-to-body>
      <el-table :data="errors" style="width: 100%">
        <el-table-column prop="lineNum" label="行号" />
        <el-table-column prop="errors" label="错误信息" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { getToken } from '@/utils/auth';
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';

type Props = {
  url?: string;
  temp_url?: string;
  data?: any;
  accept?: string;
  disabled?: boolean;
  limit?: number;
  autoUpload?: boolean;
};

interface ExcelError {
  lineNum?: number;
  errors?: string;
}

withDefaults(defineProps<Props>(), {
  url: '',
  temp_url: '',
  data: {},
  accept: '.xlsx, .xls',
  disabled: false,
  limit: 1,
  autoUpload: false,
});

const headers = computed(() => {
  return {
    Authorization: getToken(),
  };
});

const errors = ref<ExcelError[]>([]);

const uploadRef = ref();

const active = ref<boolean>(false);

const submit = () => {
  uploadRef.value.submit();
};

const handleSuccess: UploadProps['onSuccess'] = response => {
  uploadRef.value.clearFiles();
  if (response.code !== 0) return ElMessage.error(response.message);
  if (response.data && response.data.length) {
    errors.value = response.data;
    active.value = true;
  }
  ElMessage.success(response.message);
  emit('success');
};

const reset = () => {
  active.value = false;
  uploadRef.value.clearFiles();
};

const emit = defineEmits(['success']);
defineExpose({ submit, reset });
</script>

<style scoped lang="scss"></style>
