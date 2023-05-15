<template>
  <div class="home-contaienr">
    <div class="operation-layer">
      <div class="hint">
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
      </div>
      <Leaderboard class="leaderboard" />
    </div>
    <video class="background-layer" src="src/assets/video/backgroud-vodeo.mp4" autoplay muted loop />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Leaderboard from '@/components/Leaderboard/index.vue';

let footer: HTMLDivElement;
let hint: HTMLDivElement;

onMounted(() => {
  footer = document.getElementById('app-footer') as HTMLDivElement;
  hint = document.querySelector('.hint') as HTMLDivElement;
  // 隐藏底部
  footer.style.display = 'none';
});
onUnmounted(() => {
  footer.style.display = 'block';
});
</script>

<style scoped lang="scss">
.home-contaienr {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #d5d1c2;
  overflow-x: hidden;

  .background-layer {
    width: 100%;
    aspect-ratio: 16/9;
    z-index: -1;
  }

  .operation-layer {
    position: absolute;
    width: 100%;
    aspect-ratio: 16/9;
    z-index: 1;

    .hint {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      background-color: rgba(136, 134, 127, 0.3);
      padding: 20px;
      border-radius: 16px;
      color: #fff;
    }

    .leaderboard {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
