import { createRouter, createWebHistory } from 'vue-router';
import DisplayDeviceView from '../views/DisplayDeviceView.vue';
import UpdateDeviceView from '../views/UpdateDeviceView.vue';
import SettingsView from '../views/SettingsView.vue';
import ConnexionView from "@/views/ConnexionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Settings',
      component: SettingsView,
    },
    {
      path: '/se-connecter',
      name: 'se-connecter',
      component: ConnexionView,
    },

    {
      path: '/DisplayDevice',
      name: 'DisplayDevice',
      component: DisplayDeviceView,
    },
    {
      path: '/UpdateDevice',
      name: 'UpdateDevice',
      component: UpdateDeviceView,
    }
  ],
});

export default router;
