<template>
  <section class="main-structure">
    <Header />
    <div class="content">
      <video class="active" src="/src/assets/video/video-background.mp4" autoplay muted loop />
      <video src="/src/assets/video/video-background.mp4" autoplay muted loop />
      <video src="/src/assets/video/video-background.mp4" autoplay muted loop />
      <video src="/src/assets/video/video-background.mp4" autoplay muted loop />
      <video src="/src/assets/video/video-background.mp4" autoplay muted loop />
      <div class="video-overlay"></div>
      <section class="text-description">
        <h1></h1>
        <h2></h2>
        <p></p>
        <a href="#"></a>
      </section>
    </div>
    <footer>Footer</footer>
  </section>
  <section class="main-menu"></section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './components/Header.vue';

const ACTIVE: string = 'active';

onMounted(() => {
  const active_video = document.querySelectorAll('main-structure .content video');
  active_video[0].classList.remove(ACTIVE);
  active_video[0].classList.add(ACTIVE);
});
</script>

<style scoped lang="scss">
// * {
//   box-sizing: border-box;
//   -webkit-user-drag: none;
// }

// html,
// body,
// #app {
//   all: unset;
//   width: 100vw;
//   min-height: 100vh;
//   font-family: 'Poppins', sans-serif;
//   font-size: var(--main-desktop-font-size);
//   background-color: var(--main-background);
// }

.main-structure {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 5px solid red;

  &,
  header,
  .content,
  footer {
    width: 100%;
    user-select: none;
    border: 5px solid red;
  }

  header,
  .content,
  footer {
    padding: var(--screen-desktop-padding-top-bottom) var(--screen-desktop-padding-left-right);
    transition: 0.5s;
  }

  .content {
    video,
    .video-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }

  video {
    object-fit: cover;
    clip-path: ellipse(0% 0% at 0% 50%);
    padding: 0;
    margin: 0;
  }

  video.active {
    clip-path: ellipse(150% 70% at 0% 50%);
  }
}

@media (max-width: 1200px) {
  .main-structure {
    font-size: var(--main-pad-font-size);
  }

  .main-structure header,
  .main-structure.content,
  .main-structure footer {
    padding: var(--screen-pad-padding-top-bottom) var(--screen-pad-padding-left-right);
  }
}
</style>
