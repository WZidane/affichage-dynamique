import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useTokenStore = defineStore(
  'token',
  () => {
    const state = reactive({
      BASE: 'https://74b3jzk3.directus.app/items/',
      TOKEN: '',
      OBJ: 'Dispositif_Affichage/'
    });

    return { state };
  },
  {
    persist: true,
  }
);
