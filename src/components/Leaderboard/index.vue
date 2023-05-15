<template>
  <div class="leaderboard-container">
    <div class="btn"></div>
    <transition name="fade">
      <div v-show="show_leaderboard" class="leaderboard-content">
        <Tabs v-model:active="active" card>
          <TabPanel label="全校排名">
            <School />
          </TabPanel>
          <TabPanel label="班级排名">
            <Class />
          </TabPanel>
        </Tabs>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import School from './components/school.vue';
import Class from './components/class.vue';

let btn: HTMLDivElement;
let leaderboard_container: HTMLDivElement;

onMounted(() => {
  btn = document.querySelector('.btn') as HTMLDivElement;
  leaderboard_container = document.querySelector('.leaderboard_container') as HTMLDivElement;
  // 排行榜按钮移入事件
  btn.addEventListener('mouseenter', () => (show_leaderboard.value = true));
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
    position: relative;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    border-radius: 46% 0% 100% 100% / 100% 26% 42% 100%;
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
