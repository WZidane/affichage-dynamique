import { defineStore } from 'pinia';
import { useGlobal } from '@/mixins/global';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import {ref} from "vue";
export const useSessionStore = defineStore('session', () => {

    const global = useGlobal();
    const route = useRoute();
    const router = useRouter();
    const user = useUserStore();

    const navbar = ref(true);

    const routesOuvertes = ['se-connecter'];

    const rout = router.options.routes;

    const routesTab = [];

    rout.forEach(element => {
        routesTab.push(element.name);
    })

    /**
     * La route courante est "ouverte"
     * et ne nécéssite pas d'être identifié
     */
    function isRouteOuverte(route) {
        return routesOuvertes.includes(route.name);
    }

    function isRouteAllowed(route) {
        return routesTab.includes(route.name);
    }

    function setNav() {
        navbar.value = true;
    }
    function rmNav() {
        navbar.value = false;
    }

    async function isValid() {
        //console.log('IsValid ?');
        router.afterEach(() => {
            // Exécuter une fonction à chaque changement de page

            if (user.isConnected) {
                if((isRouteOuverte(route)) || (isRouteAllowed(route) === false)) {
                    router.push('/');
                } else {
                    return true;
                }
            } else {
                if (isRouteOuverte(route)) {
                    return true;
                } else {
                    global.seConnecter();
                }
            }
        })
    }
    return {
        isValid,
        isRouteOuverte,
        navbar,
        setNav,
        rmNav
    }
}, {
    persist: true,
})