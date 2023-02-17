import { reactive } from 'vue';
import { defineStore } from 'pinia';
import {inject} from "@vue/runtime-core";
import axios from 'axios';

export const useTokenStore = defineStore(
  'token',
  () => {
    const state = reactive({
      BASE: 'https://74b3jzk3.directus.app/items/',
      TOKEN: '',
      OBJ: 'Dispositif_Affichage/',
      DOMAIN: null,
      USER: '',
        REFRESHUSER:''
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
