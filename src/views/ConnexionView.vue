<script setup>
import { inject, reactive } from 'vue'
import {useUserStore} from "@/stores/user";
import {useTokenStore} from "@/stores/token";
import {onMounted} from "@vue/runtime-core";

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
  domaine: 0,
  error: ""
})


onMounted(() => {
  session.setNav();

})

function DisplayError() {
  data.error = "Adresse e-mail ou mot de passe incorrect !";
}

function DisplaySuccess() {
  data.error = "";
}

async function validationFormulaire() {
  axios.post(`https://74b3jzk3.directus.app/auth/login/`, {email: user.email, password: user.password}).then(function (response) {
    data.status = response.statusText;
    token.state.USER = response.data.data.access_token;
    console.log(response.data.data.refresh_token)
    token.state.REFRESHUSER = response.data.data.refresh_token;

  }).catch(() => {
      DisplayError();
  }).then(() => {
    if(data.status === "OK") {
      DisplaySuccess();
      useUserStore().setConnected();
      recupDomain();
    }
  })

}

async function recupDomain() {
  await axios.get(`https://74b3jzk3.directus.app/users/me?access_token=${token.state.USER}&fields=Domaine`).then((response) => {
      data.domaine = response.data;

      token.setDomain(data.domaine.data.Domaine);
  }).then(() => {
    router.push('/UpdateDevice');
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
        <input class="input" v-model="user.password" type="password" placeholder="Votre mot de passe">
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="is-primary">Connexion</button>
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