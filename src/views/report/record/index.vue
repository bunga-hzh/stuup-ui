<template>
  <Row style="margin: 20px" :gap="row_gap">
    <Column :md="24" :lg="8">
      <Row :gap="row_gap">
        <Column :span="24">
          <Card title="项目列表">
            <Input v-model:value="filter" />
            <Tree :data="tree" link-line="solid" :filter="filter" />
          </Card>
        </Column>
        <Column :span="24">
          <ClassRecord />
        </Column>
      </Row>
    </Column>
    <Column :md="24" :lg="16">
      <ClassDetails />
    </Column>
  </Row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ClassRecord from './components/ClassRecord.vue';
import ClassDetails from './components/ClassDetails.vue';

const filter = ref<string>('');

const row_gap = [8, 8];
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
