import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useTokenStore = defineStore(
  'token',
  () => {
    const state = reactive({
      BASE: 'https://74b3jzk3.directus.app/items/',
      TOKEN: 'faaaa268-c9d2-44c9-905f-66c5bb476258',
      OBJ: 'Dispositif_Affichage/',
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
