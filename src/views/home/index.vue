<template>
  <div class="home-contaienr">
    <div class="operation-layer">
      <div class="hint" v-show="show_hint"></div>
      <Leaderboard class="leaderboard" />
      <div class="blisters-generate-wrapper" />
      <div class="class-name">{{ className }}</div>
      <div class="flower_level">
        <div
          v-for="(item, index) in myFlower"
          :key="index"
          :disabled="item.flowerNum <= 0"
          :content="item.flowerNum"
          type="success"
          class="flower-badge">
          <img :src="item.src" />
        </div>
      </div>
      <div class="bm-cg-flower" />
      <div class="bm-kh-flower" />
      <div class="cj-cg-flower" />
      <div class="cj-kh-flower" />
      <div class="xh-kh-flower" />
      <div class="xh-cg-flower" />
      <!-- <div class="bm-btn b1" />
      <div class="cj-btn b1" />
      <div class="xh-btn b1" /> -->
    </div>
    <video class="background-layer" :src="video" autoplay muted loop />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import video from '@/assets/video/video-background.mp4';
import Leaderboard from '@/components/Leaderboard/index.vue';
const flowerIcons = import.meta.glob('@/assets/flower_icons/*', { import: 'default', eager: true });

type FlowerLevelType = {
  bm_cg?: number;
  bm_fy?: number;
  bm_kh?: number;
  bm_zz?: number;
  cg_fy?: number;
  cj_cg?: number;
  cj_kh?: number;
  cj_zz?: number;
  hh_cg?: number;
  hh_fy?: number;
  hh_kh?: number;
  hh_zz?: number;
};

type FlowerIconType = {
  bm_cg?: () => void;
  bm_fy?: () => void;
  bm_kh?: () => void;
  bm_zz?: () => void;
  cg_fy?: () => void;
  cj_cg?: () => void;
  cj_kh?: () => void;
  cj_zz?: () => void;
  hh_cg?: () => void;
  hh_fy?: () => void;
  hh_kh?: () => void;
  hh_zz?: () => void;
};

type FlowersType = {
  src: () => void;
  flowerNum: number;
};

const mockFlowers = reactive<FlowerLevelType>({
  bm_cg: 2,
  hh_cg: 3,
});

const show_hint = ref<boolean>(false);
const className = ref<string>('三年二班');
const flowerObj = reactive<FlowerIconType>({});
const myFlower = ref<FlowersType[]>();

let hint: HTMLDivElement;

const flowers = new Map([
  [
    'bm-cg-flower',
    `<h3>白梅花</h3>
     <p>异名：绿萼梅</p>
     <p>药用部位：蔷薇科植物梅的花蕾。其根（梅根）、枝（梅梗）、干燥未成熟果实（乌梅）、未成熟果实的盐渍品（白梅）、种仁（梅核仁）亦供药用。</p>
     <p>性味：酸涩，平</p>
     <p>归经：入肝、肺二经</p>
     <p>功效：舒肝，和胃，化痰</p>
     <p>主治：治梅核气，肝胃气痛，食欲不振，头晕，瘰疬</p>
     <p>用法与用量：内服：煎汤或入丸散。外用：敷贴</p>`,
  ],
  [
    'bm-kh-flower',
    `<h3>白梅花</h3>
     <p>梅花：迎寒早开,美丽脱俗。被誉为花中“四君子”之首，因其所处环境恶劣，却仍在凌厉寒风中傲然绽放于枝头，是中华民族最有骨气的花，是民族魂代表。梅的傲骨激励着一代又一代的中国人不畏艰险、奋勇前进、百折不挠。象征正直、纯洁、坚贞、气节、谦虚的品格。</p>`,
  ],
  [
    'cj-cg-flower',
    `<h3>小雏菊</h3>
     <p>雏菊属于菊花的一个类别</p>
     <p>药用菊花包含了：白菊（雏菊）；滁菊；贡菊；杭菊（杭白菊，杭黄菊）</p>
     <p>药用部位：菊科植物菊的头状花序。其根（白菊花根）、嫩茎叶（菊花苗）、叶（菊花叶）亦供药用。</p>
     <p>性味：甘苦；凉</p>
     <p>归经：入肺；肝经</p>
     <p>功效：疏风，清热，明目，解毒</p>
     <p>主治：治头痛，眩晕，目赤，心胸烦热，疔疮，肿毒</p>
     <p>用法与用量：内服；泡茶或入丸散</p>`,
  ],
  [
    'cj-kh-flower',
    `<h3>小雏菊</h3>
     <p>菊花：盛开在百花凋零之后，隽美多姿，素雅坚贞被称之为“傲霜之花”，受国人爱重，视为高尚情操和坚贞不屈的象征。</p>`,
  ],
  [
    'xh-cg-flower',
    `<h3>西红花</h3>
     <p>药用部位：鸢尾科植物番红花花柱的上部及柱头</p>
     <p>又称“女人花”分布在南欧各国及伊朗等地，上海崇明岛成功引种。</p>
     <p>是最名贵的香料及色素。零售价：50元/克</p>
     <p>性味：甘，平</p>
     <p>归经：入心、肝经</p>
     <p>功效：活血化瘀，散瘀开结</p>
     <p>主治：治忧思郁结，胸膈痞闷，吐血，伤寒发狂，惊怖恍惚，妇女经闭，产后瘀血腹痛，跌扑肿痛</p>
     <p>用法用量：内服：煎汤</p>
     <p>保健用法：泡茶：每天5-7根</p>
     <p>保健用法：泡茶：每天5-7根</p>`,
  ],
  [
    'xh-kh-flower',
    `<h3>西红花</h3>
     <p>象征快乐、挂念、真心、多彩、期望和青春的喜悦`,
  ],
]);

onMounted(() => {
  hint = document.querySelector('.hint') as HTMLDivElement;
  initFlowers();
  setFlowers();
  const keys = Array.from(flowers.keys()) as string[];
  console.log(keys);

  addShowTipsEvent(...keys);
  generateBlisters();
});
onUnmounted(() => {
  // 显示底部
  // footer.style.display = 'block';
});

const initFlowers = () => {
  for (const key of Object.keys(flowerIcons)) {
    const splitKey = key.split('/');
    const flowerFileName = splitKey[splitKey.length - 1];
    const flowerName = flowerFileName.split('.')[0];
    flowerObj[flowerName] = flowerIcons[key];
  }
};

const setFlowers = () => {
  const my_flower: FlowersType[] = Object.keys(mockFlowers).map(key => {
    return {
      src: flowerObj[key as keyof FlowerIconType] as () => void,
      flowerNum: mockFlowers[key as keyof FlowerLevelType] as number,
    };
  });
  myFlower.value = my_flower;
};

const addShowTipsEvent = (...args: string[]): void => {
  args.forEach(className => {
    const el = document.querySelector(`.${className}`) as HTMLDivElement;
    el.addEventListener('mouseenter', () => {
      show_hint.value = true;
      hint.innerHTML = flowers.get(className) as string;
      requestAnimationFrame(() => {
        hint.style.left = el.offsetLeft - hint.clientWidth / 2 + el.clientWidth / 2 + 'px';
        hint.style.top = el.offsetTop - hint.clientHeight + 'px';
      });
    });
    el.addEventListener('mouseleave', () => {
      show_hint.value = false;
      hint.innerHTML = '';
      hint.style.top = 0 + 'px';
      hint.style.left = 0 + 'px';
    });
  });
};

const generateBlisters = (): void => {
  const wrapper = document.querySelector('.blisters-generate-wrapper') as HTMLDivElement;
  for (let i = 0; i < 10; i++) {
    let blistersEl = document.createElement('div') as HTMLDivElement;
    const score = Math.floor(Math.random() * 10) + 1;
    let textNode = document.createTextNode(`+${score}`);
    blistersEl.setAttribute('score', score.toString());
    blistersEl.append(textNode);
    blistersEl.classList.add('blisters');
    console.log(devicePixelRatio);
    const blistersDiameter: number = 50 / devicePixelRatio;
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

  wrapper.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains('blisters')) {
      target.remove();
    }
  });
};
</script>

<style scoped lang="scss">
.home-contaienr {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #d5d1c2;
  overflow: hidden;
  user-select: none;

  .background-layer {
    width: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .operation-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 16/9;
    z-index: 1;

    .hint {
      position: absolute;
      top: 0;
      left: 0;
      max-width: 400px;
      font-size: 24px;
      background-color: rgba(136, 134, 127, 0.5);
      padding: 20px;
      margin: 0;
      border-radius: 16px;
      color: #fff;
    }

    .blisters-generate-wrapper {
      position: absolute;
      top: 70vh;
      left: 40vh;
      width: 20vh;
      height: 20vh;
    }

    .class-name {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 5vh);
      font-size: 48px;
      font-family: FZShuTi;
    }

    .flower_level {
      width: 15vw;
      position: absolute;
      left: 2vw;
      top: 80vh;
      display: flex;
      justify-content: start;
      align-items: center;
      flex-wrap: wrap;

      .flower-badge {
        margin-left: 8px;
        > img {
          width: 6vh;
          height: 6vh;
          border-radius: 25%;
          border: 2px solid #336f3f;
          -webkit-user-drag: none;
        }
      }
    }

    .leaderboard {
      position: absolute;
      right: 0;
      top: 0;
    }

    .bm-cg-flower {
      position: absolute;
      top: 70vh;
      left: 24vh;
      width: 10vh;
      height: 10vh;
    }
    .bm-kh-flower {
      position: absolute;
      top: 30vh;
      left: 0;
      width: 30vh;
      height: 40vh;
    }
    .cj-cg-flower {
      position: absolute;
      top: 50vh;
      left: 40vw;
      width: 10vh;
      height: 10vh;
    }
    .cj-kh-flower {
      position: absolute;
      top: 30vh;
      left: 55vw;
      width: 20vw;
      height: 25vh;
    }
    .xh-cg-flower {
      position: absolute;
      top: 64vh;
      left: 72vw;
      width: 10vh;
      height: 10vh;
    }
    .xh-kh-flower {
      position: absolute;
      top: 66vh;
      left: 65vw;
      width: 15vw;
      height: 20vh;
    }
  }
}
</style>

<style lang="scss">
.blisters {
  position: absolute;
  background-color: #d4ff02;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
  color: #1a8e00;
  box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.5), 15px 25px 10px rgba(255, 255, 255, 0.05),
    15px 20px 20px rgba(255, 255, 255, 0.05);
  animation: blisters-show 2s ease forwards;
  opacity: 0;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 5px;
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
</style>
