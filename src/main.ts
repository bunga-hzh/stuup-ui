// 引入状态管理
import { setupStore } from '@/store';

// VexipIcon
import * as VexipIcon from '@vexip-ui/icons';

// Card
import BaseCard from './components/BaseCard.vue';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/index.scss';
import './premission';

const app = createApp(App);
app.use(router);
setupStore(app);
app.component('BaseCard', BaseCard);

for (const [key, component] of Object.entries(VexipIcon)) {
  app.component(key, component);
}

app.mount('#app');
