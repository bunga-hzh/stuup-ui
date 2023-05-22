<template>
  <div>
    <Card title="成长项目">
      <template #extra>
        <Button @click="active = true">添加项目</Button>
      </template>
      <Input v-model:value="filter" />
      <Tree :data="tree" link-line="solid" :filter="filter" />
    </Card>
    <Modal
      v-model:active="active"
      transfer
      draggable
      resizable
      :width="500"
      :title="modelTitle"
      :loading="modelLoading">
      <ConfigProvider :props="providedProps">
        <Form ref="formRef" :model="form" label-align="top">
          <FormItem label="父节点" prop="pid">
            <Select />
          </FormItem>
          <FormItem label="项目名称" prop="name">
            <Input />
          </FormItem>
        </Form>
      </ConfigProvider>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const providedProps = {
  default: { clearable: true },
  formItem: { required: true },
};

const filter = ref<string>('');
const active = ref<boolean>(false);
const modelTitle = ref<string>('');
const modelLoading = ref<boolean>(false);
const form = reactive({});

const tree = ref([
  {
    id: 1,
    label: '道德与公民素养',
    parent: 0,
    expanded: true,
  },
  {
    id: 2,
    label: '思想品德',
    parent: 1,
  },
  {
    id: 3,
    label: '爱国爱校',
    parent: 2,
  },
  {
    id: 4,
    label: '时政学习',
    parent: 2,
  },
  {
    id: 5,
    label: '安全法制',
    parent: 2,
  },
  {
    id: 6,
    label: '军事训练',
    parent: 2,
  },
]);
</script>

<style scoped lang="scss"></style>
