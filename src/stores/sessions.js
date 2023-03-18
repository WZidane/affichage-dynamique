import { defineStore } from 'pinia';
import {reactive, ref} from "vue";
export const useSessionStore = defineStore('session', () => {


    const navbar = ref(false);
    const exist = ref(null);
    const section = reactive({
        class: 'section navbar-absence'
    })

    function setExist() {
        exist.value = true;
    }

    function setNav() {
        navbar.value = true;
    }

    function unsetNav() {
        navbar.value = false;
    }

    return {
        navbar,
        exist,
        setExist,
        setNav,
        unsetNav,
        section
    }
}, {
    persist: true,
})