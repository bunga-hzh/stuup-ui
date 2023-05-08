// pinia
import { setupStore } from '@/store';

// VexipIcon
import { setupVexipIcon } from '@/plugins/VexipIcon';

// 路由
import { setupRouter } from '@/router';

// 全局组件
import { setupGlobalComponents } from '@/plugins/GlobalComponents';

import { createApp } from 'vue';

import App from './App.vue';

import './styles/index.scss';

import './premission';

const setupAll = async () => {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  setupVexipIcon(app);
  setupGlobalComponents(app);
  app.mount('#app');
};

setupAll();
