<template>
  <Card style="margin: 20px">
    <div style="display: flex; justify-content: center">
      <Table :data="data" :width="1000" :head-style="headerStyle" :cell-style="cellStyle" transparent>
        <TableColumn
          name="成长阶段"
          id-key="stage"
          :order="1"
          no-ellipsis
          :style="{ display: 'flex', 'flex-direction': 'column' }">
          <template #default="{ row }">
            <img class="flower" :src="row.src" />
          </template>
        </TableColumn>
        <TableColumn name="阶段名称" id-key="stageName" :order="2" />
        <TableColumn name="所需水滴" id-key="integral" :order="3">
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
        <TableColumn name="操作" id-key="menu" :order="3" :width="100">
          <template #default="{ row }">
            <Button @click="row.edit = true">修改</Button>
          </template>
        </TableColumn>
      </Table>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const headerStyle = {
  'justify-content': 'center',
  'font-size': '24px',
  'font-weight': 'blod',
  'font-family': 'SimHei',
  color: '#24bfa5',
};
const cellStyle = {
  'text-align': 'center',
};
const flowers = import.meta.glob('@/assets/flower_icons/*', { eager: true });

onMounted(() => {
  const stageNames = ['开花', '种子', '结果', '发芽'];
  for (const key in flowers) {
    console.log(key);
    data.value.push({
      src: key,
      integral: Math.floor(Math.random() * 100),
      stageName: stageNames[Math.floor(Math.random() * 3)],
      edit: false,
    });
  }
  console.log(data.value);
});
const data = ref<any[]>([]);
</script>

<style scoped lang="scss">
.flower {
  display: inline;
  width: 100px;
  height: 10 0px;
  border-radius: 50%;
  -webkit-user-drag: none;
}
</style>
