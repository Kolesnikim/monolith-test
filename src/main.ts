import { createApp } from 'vue';
import { imager } from '@/core/services/api-service';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.config.globalProperties.imager = imager;

app
  .use(store)
  .use(router)
  .mount('#app');
