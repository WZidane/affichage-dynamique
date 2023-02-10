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
    await axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=Nom_Dispositif,Sequences.Ordre_Sequence,Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,Sequences.Sequence_id.Ecrans.Ordre_Ecran,Sequences.Sequence_id.Ecrans.Ecran_id.Duree,Domaine.Nom_Domaine,Ecrans.Ecran_id.Donnees,Ecrans.Ecran_id.Duree`).then(response => {
        state.Device = response.data ;
        state.Domain = state.Device.data.Domaine;
        state.NameDomain = state.Domain.Nom_Domaine
        state.NameDevice = state.Device.data.Nom_Dispositif;
        state.ecrans = state.Device.data.Ecrans;
        state.sequences = state.Device.data.Sequences;

    }).then(() => {
      getDevices();
    });
}
function getDevices() {
        axios.get(`${token.state.BASE}${token.state.OBJ}?fields=id&filter[Domaine][Nom_Domaine][_eq]=${state.NameDomain}`).then(response => {
        state.Devices = response.data;
        state.otherDevices = state.Devices.data;
    });

}


function updateToken(event) {
  token.state.TOKEN = event.target.value;
  console.log(token.state.TOKEN);
}

function update() {
  router.push('/Settings');
}

</script>
<template>
    <h1>Page UpdateDevice</h1>
    <h2>Vous êtes actuellement sur le domaine: {{ state.Domain.Nom_Domaine }}</h2>
    <h3>L'url : {{ token.state.BASE }}{{ token.state.OBJ }}</h3>
    <h3>TOKEN du dispositif d'affichage :</h3>

    <form id="formulaireNewToken" @change="updateToken" @submit.prevent="update">
      <select id="NewTOKEN" :v-model="token.state.TOKEN" name="NewTOKEN">
        <!-- <option v-for="token in state.otherDevices" :v-if="state.NameDomain == state.NameDomainDevice" :key="token.id" :value="token.id">{{ token.id }}</option> -->
        <option value="">-- Please choose a token --</option>
        <option v-for="token in state.otherDevices" :key="token.id" :value="token.id">{{ token.id }}</option>
      </select>
      <button>Valider changement</button>
    </form>
</template>
<style scoped>

</style>
