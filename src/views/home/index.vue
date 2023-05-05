<template>
  <div class="container">
    <div class="score">{{ score }}</div>
    <div class="blisters-generate-wrapper" />
    <div class="xhh-seed">
      <a href="#" @click="watering">浇水</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const score = ref<number>(0);

onMounted(() => {
  generateBlisters();
});

const watering = () => {
  const container = document.querySelector('.container') as HTMLDivElement;
  let grassEl = document.createElement('div') as HTMLDivElement;
  grassEl.classList.add('xhh_sprout');
  container.append(grassEl);
};

const generateBlisters = (): void => {
  const wrapper = document.querySelector('.blisters-generate-wrapper') as HTMLDivElement;
  for (let i = 0; i < 10; i++) {
    let blistersEl = document.createElement('div') as HTMLDivElement;
    const score = Math.floor(Math.random() * 10) + 1;
    let textNode = document.createTextNode(`+${score}`);
    blistersEl.setAttribute('score', score);
    blistersEl.append(textNode);
    blistersEl.classList.add('blisters');
    const blistersDiameter: number = 50;
    blistersEl.style.top = `${
      Math.floor(Math.random() * (wrapper.clientWidth - blistersDiameter)) + blistersDiameter
    }px`;
    blistersEl.style.left = `${
      Math.floor(Math.random() * (wrapper.clientWidth - blistersDiameter)) + blistersDiameter
    }px`;
    const delayTime = Math.floor(Math.random() * 2000);
    blistersEl.style.animationDelay = `${delayTime}ms`;

    wrapper.appendChild(blistersEl);
  }

  wrapper.addEventListener('click', e => {
    if (e.target.classList.contains('blisters')) {
      e.target.style.animationPlayState = 'running';
      e.target.style.animationDuration = '2s';
      e.target.style.animationDirection = 'reverse';
      console.log(e.target.getAttribute('score'));
      setTimeout(() => {
        e.target.remove();
      }, 3000);
    }
  });
};
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(src/assets/home_images/background.png) no-repeat left top;
  background-size: cover;
  overflow: hidden;

  .score {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: blue;
    font-size: 48px;
    font-weight: bold;
  }

  .blisters-generate-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 400px;
    height: 400px;
  }
}
</style>

<style lang="scss">
.blisters {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  font-size: 1.15rem;
  font-weight: bold;
  color: red;
  box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.5), 15px 25px 10px rgba(255, 255, 255, 0.05),
    15px 20px 20px rgba(255, 255, 255, 0.05), inset -10px -10px 15px rgba(255, 255, 255, 0.9);
  animation: blisters-show 2s ease forwards;
  opacity: 0;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
  }

  &::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 20px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
  }

  &:hover {
    transform: scale(1.25);
  }
}

@keyframes blisters-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.xhh-seed {
  position: fixed;
  bottom: 20vh;
  left: 26vw;
  width: 10vw;
  height: 10vh;
  background: url(src/assets/home_images/xhh_seed.png) no-repeat left top;
  background-size: contain;

  > a {
    opacity: 0;
  }
  &:hover {
    transform: scale(1.05);

    > a {
      opacity: 1;
    }
  }
}
.xhh_sprout {
  position: fixed;
  bottom: 22vh;
  left: 35vw;
  width: 25vw;
  height: 15vh;
  background: url(src/assets/home_images/xhh_sprout.png) no-repeat left top;
  background-size: contain;

  > a {
    opacity: 0;
  }
  &:hover {
    transform: scale(1.05);

    > a {
      opacity: 1;
    }
  }
}
</style>
