<template>
  <div class="leaderboard-container">
    <div class="btn"></div>
    <transition name="fade">
      <div v-show="show_leaderboard" class="leaderboard-content">
        <Table ref="table" :columns="columns" :data="data"></Table>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { defineColumns } from 'vexip-ui';
import type { TableExposed } from 'vexip-ui';

const table = ref<TableExposed>();

const columns = ref(
  defineColumns([
    {
      name: 'First Name',
      key: 'firstName',
    },
    {
      name: 'Last Name',
      key: 'lastName',
    },
    {
      name: 'Job',
      key: 'job',
      accessor(row) {
        return row.job;
      },
    },
    {
      name: 'Age',
      key: 'age',
    },
  ])
);

const data = ref([
  {
    id: '1',
    job: 'Cashier',
    email: 'Angelique_Walsh2268@twace.org',
    firstName: 'Angelique',
    lastName: 'Walsh',
    age: '58',
  },
  {
    id: '2',
    job: 'Stockbroker',
    email: 'Aeris_Drake5867@gmail.com',
    firstName: 'Aeris',
    lastName: 'Drake',
    age: '40',
  },
  {
    id: '3',
    job: 'Machine Operator',
    email: 'Elisabeth_Rogers7566@sheye.org',
    firstName: 'Elisabeth',
    lastName: 'Rogers',
    age: '56',
  },
  {
    id: '4',
    job: 'Audiologist',
    email: 'Sharon_Tanner5855@nickia.com',
    firstName: 'Sharon',
    lastName: 'Tanner',
    age: '58',
  },
  {
    id: '5',
    job: 'Cashier',
    email: 'Evie_Farmer6650@typill.biz',
    firstName: 'Evie',
    lastName: 'Farmer',
    age: '26',
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

const show_leaderboard = ref<boolean>(false);
const active = ref('全校排名');
</script>

<style scoped lang="scss">
.leaderboard-container {
  position: relative;
  border: 2px solid red;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: end;
  .btn {
    width: 200px;
    height: 100px;
    border-radius: 0 0 100px 100px;
    border: 2px solid #eee;
    box-sizing: border-box;
  }
  .leaderboard-content {
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid #eee;
    box-sizing: border-box;
  }
}
</style>
