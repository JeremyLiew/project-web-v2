import { createApp } from 'vue';
import App from './app.vue';
import vuetify from './plugins/Vuetify';

const app = createApp(App);

app.use(vuetify).mount('#app');
