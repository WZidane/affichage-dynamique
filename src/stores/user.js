import { ref } from 'vue';
import { defineStore } from 'pinia';
import {useRouter} from "vue-router";
export const useUserStore = defineStore('user', () => {

    const router = useRouter();
    const isConnected = ref(false);

    async function clear() {
        await localStorage.clear();
    }

    function setConnected() {
        isConnected.value = true;
    }
    async function disconnect() {
        isConnected.value = false;
        await router.push('/se-connecter').then(() => {
            clear();
        });
    }


    return { isConnected, setConnected, disconnect }
}, {
    persist: true,
})