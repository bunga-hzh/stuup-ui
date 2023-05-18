<template>
  <Table :data="data">
    <TableColumn name="成长阶段" id-key="stage" :order="1">
      <template #default="{ row }">
        <img class="flower" :src="row.src" />
      </template>
    </TableColumn>
    <TableColumn name="所需水滴" id-key="integral" :order="2" :width="300">
      <template #default="{ row }">
        <div v-show="!row.edit">{{ row.integral }}</div>
        <div v-show="row.edit">
          <Space>
            <NumberInput />
            <Button circle :icon="Check" @click="row.edit = false" />
          </Space>
        </div>
      </template>
    </TableColumn>
    <TableColumn name="操作" id-key="menu" :order="3" text-align="center" :width="100">
      <template #default="{ row }">
        <Button @click="row.edit = true">修改</Button>
      </template>
    </TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Space, defineColumns } from 'vexip-ui';
import { Check } from '@vexip-ui/icons';
const flowers = import.meta.glob('@/assets/flower_icons/*', { eager: true });

onMounted(() => {
  console.log(flowers);
  for (const key in flowers) {
    console.log(key);
    data.value.push({
      src: key,
      integral: Math.floor(Math.random() * 100),
      edit: false,
    });
  }
  console.log(data.value);
});
const data = ref<any[]>([]);
</script>

<style scoped lang="scss">
.flower {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
