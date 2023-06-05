<template>
  <div class="leaderboard-container">
    <div class="btn"></div>
    <transition name="fade">
      <div v-show="show_leaderboard" class="leaderboard-content">
        <el-table :data="tableData" stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
          <el-table-column label="排名" type="index" width="55" align="center" />
          <el-table-column prop="studentName" label="学生姓名" show-overflow-tooltip align="center" />
          <el-table-column prop="studentNo" label="学号" show-overflow-tooltip align="center" />
          <el-table-column prop="className" label="所属班级" show-overflow-tooltip align="center" />
          <el-table-column prop="classTeacher" label="班主任" show-overflow-tooltip align="center" />
          <el-table-column prop="score" label="成长值" show-overflow-tooltip align="center" />
        </el-table>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { getSchoolStuRank } from '@/api/ranking/school_stu/index';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

const tableData = ref();
const loading = ref<boolean>(false);
const show_leaderboard = ref<boolean>(false);

let btn: HTMLDivElement;
let leaderboard_container: HTMLDivElement;
const page = ref({
  current: 1,
  size: 10,
});

onMounted(() => {
  btn = document.querySelector('.btn') as HTMLDivElement;
  leaderboard_container = document.querySelector('.leaderboard-container') as HTMLDivElement;
  // 排行榜按钮移入事件
  btn.addEventListener('mouseenter', () => {
    show_leaderboard.value = true;
  });
  // 排行榜按钮移入事件
  leaderboard_container.addEventListener('mouseleave', () => (show_leaderboard.value = false));
  fetchList();
});

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getSchoolStuRank(Object.assign(page.value, { yearId: userStore.getYearId }));
    tableData.value = res.records;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.leaderboard-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: end;
  .btn {
    width: 10vw;
    height: 5vw;
    border-radius: 0 0 50% 50%;
    box-sizing: border-box;
  }
  .leaderboard-content {
    width: 20vw;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
  }
}
</style>
