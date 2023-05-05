import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/index.scss';

//arco-design
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

// pinia
import { createPinia } from 'pinia';

const store = createPinia();

const app = createApp(App);
app.use(router);
app.use(ArcoVue);
app.use(store);
app.mount('#app');
