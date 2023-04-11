import { createApp, provide } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueFullscreen from 'vue-fullscreen'
import axios from 'axios';
import VueAxios from 'vue-axios';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import App from './App.vue';
import router from './router';
import '../public/assets/css/main.css';

const app = createApp(App);

app.use(pinia)
app.use(router);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);
app.use(VueFullscreen)
app.mount('#app');
