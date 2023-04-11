import { defineStore } from 'pinia';
import {reactive, ref} from "vue";
export const useSessionStore = defineStore('session', () => {


    const navbar = ref(false);
    const exist = ref(null);
    const section = reactive({
        class: 'section navbar-absence'
    })
    function setNav() {
        navbar.value = true;
    }
    return {
        navbar,
        exist,
        setNav,
        section
    }
}, {
    persist: true,
})