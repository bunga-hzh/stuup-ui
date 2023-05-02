//primevue
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import PrimeVue from 'primevue/config';

// pinia
import { createPinia } from 'pinia';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/index.scss';

const store = createPinia();

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(store);
app.mount('#app');
