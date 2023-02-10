import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useTokenStore = defineStore(
  'token',
  () => {
    const state = reactive({
      BASE: '',
      TOKEN: '',
      OBJ: '',
    });
    function setDefaultBasicUrl() {
      state.BASE = 'https://74b3jzk3.directus.app/items/';
    }
    function setDeviceObj() {
      state.OBJ = 'Dispositif_Affichage/';
    }
    function setDefaultToken() {
      state.TOKEN = 'a5e3c94f-c480-414b-b092-e6ce0f55c3ca';
    }
    return { state, setDefaultBasicUrl, setDeviceObj, setDefaultToken };
  },
  {
    persist: true,
  }
);
