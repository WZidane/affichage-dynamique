import { ref } from 'vue';
import { defineStore } from 'pinia';
import {useRouter} from "vue-router";
export const useUserStore = defineStore('user', () => {

    const router = useRouter();
    const isConnected = ref(false);

    function setConnected() {
        isConnected.value = true;
    }
    function disconnect() {
        isConnected.value = false;
        router.push('/se-connecter');
    }


    return { isConnected, setConnected, disconnect }
}, {
    persist: true,
})