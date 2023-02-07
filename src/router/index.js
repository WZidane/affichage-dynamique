import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminDomainListView from '../views/AdminDomainListView.vue';

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
  ],
});

export default router;
