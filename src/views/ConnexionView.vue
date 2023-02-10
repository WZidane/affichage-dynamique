<script setup>
import { inject, reactive } from 'vue'
import {BASE} from "../../public/config";
import {useUserStore} from "@/stores/user";
import {useTokenStore} from "@/stores/token";

const axios = inject('axios');
const router = inject('router');
const session = inject('session');
const token = useTokenStore();

let user = reactive({
  email: '',
  password: ''
});

let data = reactive({
  status: "",
  token: "",
  domaine: 0
})

async function validationFormulaire() {
  axios.post(`${BASE}auth/login/`, {email: user.email, password: user.password}).then(function (response) {
    data.status = response.statusText;
    data.token = response.data.data.access_token;
  }).catch(() => {
      alert("Adresse e-mail ou mot de passe incorrect !");
  }).then(() => {
    if(data.status === "OK") {
      useUserStore().setConnected();
      console.log(useUserStore().isConnected);
      recupDomain();
      router.push('/');
    }
  })

}

function recupDomain() {
  axios.get(`https://74b3jzk3.directus.app/users/me?access_token=${data.token}&fields=Domaine`).then((response) => {
      data.domaine = response.data;
      token.state.DOMAIN = data.domaine.data.Domaine;
  });
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
          <button class="is-primary">Connexion</button>
        </div>
      </div>
    </form>

  </div>

</template>

<style scoped>

</style>