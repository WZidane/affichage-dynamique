import { defineStore } from 'pinia';
import { useGlobal } from '@/mixins/global';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
export const useSessionStore = defineStore('session', () => {

    const global = useGlobal();
    const route = useRoute();
    const router = useRouter();
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

    async function isValid() {
        //console.log('IsValid ?');
        router.afterEach(() => {
            // Exécuter une fonction à chaque changement de page

            if (useUserStore().isConnected) {
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
        isRouteOuverte
    }
}, {
    persist: true,
})