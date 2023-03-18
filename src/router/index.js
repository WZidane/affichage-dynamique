import { createRouter, createWebHistory } from 'vue-router';
import DisplayDeviceView from '../views/DisplayDeviceView.vue';
import ConnexionView from "@/views/ConnexionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'se-connecter',
      component: ConnexionView,
    },
    {
      path: '/DisplayDevice',
      name: 'DisplayDevice',
      component: DisplayDeviceView,
    }
  ],
});

export default router;
