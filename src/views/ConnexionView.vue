<script setup>
import { inject, reactive } from 'vue'
import {useTokenStore} from "@/stores/token";
import {onMounted} from "@vue/runtime-core";

const axios = inject('axios');
const router = inject('router');
const session = inject('session');
const token = useTokenStore();


let data = reactive({
  status: "",
  token: "",
  error: ""
})

onMounted(() => {
  session.setNav();
})

function DisplayError() {
  data.error = "Ce token n'existe pas";
}

function DisplaySuccess() {
  data.error = "";
}

function validationFormulaire() {
  token.state.TOKEN = data.token;

  axios.get(`https://74b3jzk3.directus.app/items/Dispositif_Affichage/?filter[id][_eq]=${token.state.TOKEN}`).then(() => {
    DisplaySuccess();
    console.log('OK!');
     router.push('/DisplayDevice');
  }).catch(() => {
    DisplayError();
  })
}

</script>

<template>
  <div class="connexionView">
    <h1>TOKEN de l'écran</h1>
    <form @submit.prevent="validationFormulaire">
      <div class="field">
        <label class="label">Identifiant du dispositif</label>
        <input class="input" v-model="data.token" placeholder="ID du dispositif">
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="is-primary">Valider</button>
        </div>
      </div>

      <p v-if="data.error !== ''">
        {{ data.error }}
      </p>

    </form>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>