import { createApp } from 'vue';
import App from './app.vue';
import vuetify from './plugins/Vuetify';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes/index';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router).use(vuetify).mount('#app');