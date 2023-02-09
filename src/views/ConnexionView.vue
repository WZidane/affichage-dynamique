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

function validationFormulaire() {
  axios.post(`${BASE}auth/login/`, {email: user.email, password: user.password}).then(function (response) {
    data.status = response.statusText;
  })
  if(data.status === "OK") {
    useUserStore().setConnected();
    console.log(useUserStore().isConnected);
    router.push('/DisplayDevice');
  } else {
    alert("Adresse e-mail ou mot de passe incorrect !");
  }
}
</script>

<template>
  <div class="columns">
    <div class="column is-4 is-offset-4">

      <form class="box" @submit.prevent="validationFormulaire">

        <h1 class="title has-text-centered">SE CONNECTER</h1>

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
            <button class="button is-primary">Se connecter</button>
          </div>
          <div class="control">
            <router-link to="/" class="button">Annuler</router-link>
          </div>
        </div>
      </form>

    </div>
  </div>

</template>

<style scoped>

</style>