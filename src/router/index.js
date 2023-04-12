import {createRouter, createWebHistory} from 'vue-router';
import DisplayDeviceView from '../views/DisplayDeviceView.vue';
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
        },
        {
            path: '/DisplayDevice',
            name: 'DisplayDevice',
            component: DisplayDeviceView,
        }
    ],
});

export default router;
