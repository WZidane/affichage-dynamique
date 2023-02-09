import { useRouter } from 'vue-router';
import {useUserStore} from "@/stores/user";

export const useGlobal = function() {

    const router = useRouter();
    /**
     * Redirection vers la page de connexion
     */
    function seConnecter() {
        if(useUserStore().isConnected) {
            console.log("OK!");
        } else {
            router.push('/se-connecter');
        }
    }

    return {
        seConnecter
    }
}