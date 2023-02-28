import { ref } from 'vue';
import { defineStore } from 'pinia';
import {useRouter} from "vue-router";
import {useSessionStore} from "@/stores/sessions";
export const useUserStore = defineStore('user', () => {

    const router = useRouter();
    const isConnected = ref(false);
    const session = useSessionStore();

    async function clear() {
        await localStorage.clear();
    }

    function setConnected() {
        isConnected.value = true;
    }
    async function disconnect() {
        isConnected.value = false;
        await session.unsetExist();
        await session.unsetNav();
        await router.push('/se-connecter').then(() => {
            clear();
        });
    }


    return { isConnected, setConnected, disconnect }
}, {
    persist: true,
})