<script setup>
import { inject, reactive } from 'vue'
import {BASE} from "../../public/config";
import {useUserStore} from "@/stores/user";

const axios = inject('axios');
const router = inject('router');
const session = inject('session');

let user = reactive({
  email: 'canals@gmail.com',
  password: 'canals'
});

let data = reactive({
  status: "",
})

async function validationFormulaire() {
  axios.post(`${BASE}auth/login/`, {email: user.email, password: user.password}).then(function (response) {
    data.status = response.statusText;
  }).catch(() => {
      alert("Adresse e-mail ou mot de passe incorrect !");
  }).then(() => {
    if(data.status === "OK") {
      useUserStore().setConnected();
      console.log(useUserStore().isConnected);
      router.push('/DisplayDevice');
    }
  })

}
</script>

<template>

  <div class="connexionView">

    <h1>SE CONNECTER</h1>

    <form @submit.prevent="validationFormulaire">

      <div class="field">
        <label class="label">E-Mail</label>
        <input class="input" v-model="user.email" type="email" placeholder="email@domaine.com">
      </div>

      <div class="field">
        <label class="label">Mot de passe</label>
        <input class="input" v-model="user.password" type="password" placeholder="Your password">
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button>
            <router-link to="/" >Annuler</router-link>
          </button>
        </div>
        <div class="control">
          <button class="is-primary">Se connecter</button>
        </div>
      </div>
    </form>

  </div>

</template>

<style scoped>

</style>