<template>
    <div class="leaderboard-container">
        <div class="btn"></div>
        <transition name="fade">
            <div v-show="show_leaderboard" class="leaderboard-content">
                <Space vertical>
                    <TabNav v-model:active="active" @change="handlerTabChange">
                        <TabNavItem label="school">荣耀榜</TabNavItem>
                        <TabNavItem label="class">班级榜</TabNavItem>
                        <TabNavItem label="progress">进步榜</TabNavItem>
                    </TabNav>
                    <Table ref="table" :columns="columns" :data="data" highlight>
                        <TableColumn name="排名" id-key="ranking" :order="0" :width="55" no-ellipsis>
                            <template #default="{ row }">
                                <div style="width: 50px; height: 50px background-color: red">{{ row.ranking }}</div>
                            </template>
                        </TableColumn>
                    </Table>
                </Space>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { defineColumns } from 'vexip-ui';
import type { TableExposed } from 'vexip-ui';
import { config } from './TableConfig';

const table = ref<TableExposed>();

const active = ref<string>('school');
const show_leaderboard = ref<boolean>(false);

const handlerTabChange = (label: string) => {
    const table_config = config.get(label);
    columns.value = table_config;
};

const columns = ref(config.get(active.value));

const data = ref([
    {
        ranking: 1,
        name: '张三张三张三张三',
        class: '一班一班一班一班',
        classTeacher: '李四李四李四李四',
        level: '李四李四李四李四李四李四',
    },
]);

let btn: HTMLDivElement;
let leaderboard_container: HTMLDivElement;

onMounted(() => {
    btn = document.querySelector('.btn') as HTMLDivElement;
    leaderboard_container = document.querySelector('.leaderboard-container') as HTMLDivElement;
    // 排行榜按钮移入事件
    btn.addEventListener('mouseenter', () => {
        // 刷新表格
        table.value?.refresh();
        show_leaderboard.value = true;
    });
    // 排行榜按钮移入事件
    leaderboard_container.addEventListener('mouseleave', () => (show_leaderboard.value = false));
});
</script>

<style scoped lang="scss">
.leaderboard-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: end;
  .btn {
    width: 200px;
    height: 100px;
    border-radius: 0 0 100px 100px;
    box-sizing: border-box;
  }
  .leaderboard-content {
    width: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
  }
}
</style>
