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

    /**
     * La route courante est "ouverte"
     * et ne nécéssite pas d'être identifié
     */
    function isRouteOuverte(route) {
        return routesOuvertes.includes(route.name);
    }

    async function isValid() {
        //console.log('IsValid ?');

        if (useUserStore().isConnected) {
            if(isRouteOuverte(route)) {
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
    }


    return {
        isValid,
        isRouteOuverte
    }
}, {
    persist: true,
})