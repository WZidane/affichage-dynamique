<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { BASE, OBJ, TOKEN } from "/public/config.js";
import { useTokenStore } from "../stores/token";


const axios = inject('axios');
const token = useTokenStore();

let state = reactive({
    Device: {},
    Domain: {},
    sequences: [],
    ecrans: [],
    visible: false,
    NameDevice: "",
    Devices: [],
    selectedTokenId: "",
    otherDevices:[],
    NameDomain: ""
});


onMounted(() => {
    token.setDefaultBasicUrl();
    token.setDeviceObj();
    token.setDefaultToken();
    // console.log(token.state.BASE)

    getDeviceInformation();
    getDevices();
})

function getDeviceInformation() {
    axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=Nom_Dispositif,Sequences.Ordre_Sequence,Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,Sequences.Sequence_id.Ecrans.Ordre_Ecran,Sequences.Sequence_id.Ecrans.Ecran_id.Duree,Domaine.Nom_Domaine,Ecrans.Ecran_id.Donnees,Ecrans.Ecran_id.Duree`).then(response => {
        state.Device = response.data ;
        state.Domain = state.Device.data.Domaine;
        state.NameDomain = state.Domain.Nom_Domaine
        state.NameDevice = state.Device.data.Nom_Dispositif;
        state.ecrans = state.Device.data.Ecrans;
        state.sequences = state.Device.data.Sequences;
       
        state.selectedTokenId = TOKEN;
        
    });
}
function getDevices() {
        axios.get(`${token.state.BASE}${token.state.OBJ}?fields=id&filter[Domaine][Nom_Domaine][_eq]=${state.NameDomain}`).then(response => {
        state.Devices = response.data;
        state.otherDevices = state.Devices.data
    });
    
}


function update(valeur) {
    token.state.TOKEN = valeur;
}

</script>
<template>
    <h1>Page UpdateDevice</h1>
    <h2>Vous êtes actuellement sur le domaine: {{ state.Domain.Nom_Domaine }}</h2>
    <h3>L'url : {{ BASE }}{{ OBJ }}</h3>
    <h3>TOKEN du dispositif d'affichage :
        <form id="formulaireNewToken" @submit.prevent="update">
            <select id="NewTOKEN" :v-model="TOKEN" name="NewTOKEN">
                <!-- <option v-for="token in state.otherDevices" :v-if="state.NameDomain == state.NameDomainDevice" :key="token.id" :value="token.id">{{ token.id }}</option> -->
                <option v-for="token in state.otherDevices" :key="token.id" :value="token.id">{{ token.id }}</option>
            </select>
            <button>Valider changement</button>
        </form>
    </h3>
</template>
<style scoped>

</style>
