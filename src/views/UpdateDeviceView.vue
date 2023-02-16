<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { useTokenStore } from "@/stores/token";
import {useRouter} from "vue-router";
import {useSessionStore} from "@/stores/sessions";

const axios = inject('axios');
const token = useTokenStore();
const router = useRouter();
const session = useSessionStore();

let state = reactive({
  Device: {},
  Domain: {},
  sequences: [],
  ecrans: [],
  visible: false,
  NameDevice: "",
  Devices: [],
  otherDevices:[],
  NameDomain: "",
  error: ''
});


onMounted(() => {
  /*
    token.setDefaultBasicUrl();
    token.setDeviceObj();
    token.setDefaultToken();
   */
  // console.log(token.state.BASE)
  if(session.exist === null) {
    session.unsetNav();
  } else {
    session.setNav();
  }
  getDeviceInformation();
})

async function getDeviceInformation() {

  await axios.get(`${token.state.BASE}${token.state.OBJ}?fields=id,Nom_Dispositif,Sequences.Ordre_Sequence,Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,Sequences.Sequence_id.Ecrans.Ordre_Ecran,Sequences.Sequence_id.Ecrans.Ecran_id.Duree,Domaine.Nom_Domaine,Ecrans.Ecran_id.Donnees,Ecrans.Ecran_id.Duree&filter[Domaine][_eq]=${token.state.DOMAIN}`).then(response => {
    state.Device = response.data ;
    state.allDevices = state.Device.data
    state.Domain = state.Device.data[0].Domaine;
    state.NameDevice = state.Device.data[0].Nom_Dispositif;
    state.ecrans = state.Device.data[0].Ecrans;
    state.sequences = state.Device.data[0].Sequences;
  })

}
function updateToken(event) {
  token.state.TOKEN = event.target.value;
  console.log(token.state.TOKEN);
}

function displayError() {
  state.error = 'Dispositif Invalide !';
}

function update() {
  session.setExist();

  if(token.state.TOKEN === null || token.state.TOKEN === undefined || token.state.TOKEN === '') {
    displayError();
  } else {
    router.push('/');
  }
}

</script>
<template>
    <h2>Vous êtes actuellement sur le domaine: <span>{{ state.Domain.Nom_Domaine }}</span></h2>
    <!-- <h3>L'url : {{ token.state.BASE }}{{ token.state.OBJ }}</h3> -->
    <!--<h3>TOKEN du dispositif d'affichage :</h3>-->

    <form id="formulaireNewToken" @change="updateToken" @submit.prevent="update">
      <select id="NewTOKEN" :v-model="token.state.TOKEN" name="NewTOKEN">
        <option value="">-- Veuillez choisir un dispositif --</option>
        <option v-for="token in state.allDevices" :key="token.id" :value="token.id">{{ token.Nom_Dispositif }}</option>
      </select>
      <button class="is-primary">Valider !</button>
      <p v-if="state.error !== ''">{{ state.error }}</p>
    </form>
</template>
<style scoped>
p {
  text-align: center;
}
</style>