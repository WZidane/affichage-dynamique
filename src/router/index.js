import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminDomainListView from '../views/AdminDomainListView.vue';
import oneDomainAdminView from '../views/OneAdminDomainView.vue';
import DisplayDeviceView from '../views/DisplayDeviceView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ListOfDomainAdmin',
      name: 'ListOfDomainAdmin',
      component: AdminDomainListView,
    },
    {
      path: '/oneDomainAdmin',
      name: 'oneDomainAdmin',
      component: oneDomainAdminView,
    },
    {
      path: '/DisplayDevice',
      name: 'DisplayDevice',
      component: DisplayDeviceView,
    },

    DisplayDeviceView,
  ],
});

export default router;
