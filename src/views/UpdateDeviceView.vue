<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { useTokenStore } from "@/stores/token";
import {useRouter} from "vue-router";

const axios = inject('axios');
const token = useTokenStore();
const router = useRouter();

let state = reactive({
  Device: {},
  Domain: {},
  sequences: [],
  ecrans: [],
  visible: false,
  NameDevice: "",
  Devices: [],
  otherDevices:[],
  NameDomain: ""
});


onMounted(() => {
  /*
    token.setDefaultBasicUrl();
    token.setDeviceObj();
    token.setDefaultToken();
   */
  // console.log(token.state.BASE)
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

function update() {
  router.push('/');
}

</script>
<template>
    <h2>Vous êtes actuellement sur le domaine: <span>{{ state.Domain.Nom_Domaine }}</span></h2>
    <!-- <h3>L'url : {{ token.state.BASE }}{{ token.state.OBJ }}</h3> -->
    <!--<h3>TOKEN du dispositif d'affichage :</h3>-->

    <form id="formulaireNewToken" @change="updateToken" @submit.prevent="update">
      <select id="NewTOKEN" :v-model="token.state.TOKEN" name="NewTOKEN">
        <option value="">-- Veuillez choisir un token --</option>
        <option v-for="token in state.allDevices" :key="token.id" :value="token.id">{{ token.Nom_Dispositif }}</option>
      </select>
      <button class="is-primary">Valider le token</button>
    </form>
</template>
<style scoped>

</style>