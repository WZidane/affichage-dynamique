import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useTokenStore = defineStore(
  'token',
  () => {
    const state = reactive({
      BASE: 'https://74b3jzk3.directus.app/items/',
      TOKEN: '2f998884-e4c3-4cb3-9ae5-6bb2a4f43376',
      OBJ: 'Dispositif_Affichage/',
      DOMAIN: null
    });
    /*
    function setDefaultBasicUrl() {
      state.BASE = 'https://74b3jzk3.directus.app/items/';
    }
    function setDeviceObj() {
      state.OBJ = 'Dispositif_Affichage/';
    }
    function setDefaultToken() {
      state.TOKEN = 'faaaa268-c9d2-44c9-905f-66c5bb476258';
    }
     */

    return { state /*,setDefaultBasicUrl, setDeviceObj, setDefaultToken*/ };
  },
  {
    persist: true,
  }
);
