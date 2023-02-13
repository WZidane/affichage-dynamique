import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useTokenStore = defineStore(
  'token',
  () => {
    const state = reactive({
      BASE: 'https://74b3jzk3.directus.app/items/',
      TOKEN: '58526534-8e58-4c8e-b844-227543ebe14a',
      OBJ: 'Dispositif_Affichage/',
      DOMAIN: null
    });

    function setToken(token) {
        return this.state.TOKEN = token;
    }

    function getToken() {
        return state.TOKEN;
    }

    function setDomain(domain) {
        return this.state.DOMAIN = domain;
    }

    function getDomain() {
        return state.DOMAIN;
    }

    return { state, setToken, getToken, setDomain, getDomain };
  },
  {
    persist: true,
  }
);
