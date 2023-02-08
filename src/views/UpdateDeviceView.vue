
<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { BASE, OBJ, TOKEN } from "/public/config.js";


const axios = inject('axios');

let state = reactive({
    Device: {},
    Domain: {},
    sequences: [],
    ecrans: [],
    visible: false,
    NameDevice: "",
    Devices: []
});


onMounted(() => {
    getDeviceInformation();
})

function getDeviceInformation() {
    axios.get(`${BASE}${OBJ}${TOKEN}?fields=Nom_Dispositif,Sequences.Ordre_Sequence,Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,Sequences.Sequence_id.Ecrans.Ordre_Ecran,Sequences.Sequence_id.Ecrans.Ecran_id.Duree,Domaine.Nom_Domaine,Ecrans.Ecran_id.Donnees,Ecrans.Ecran_id.Duree`).then(response => {
        state.Device = response.data
        state.NameDevice = state.Device.data.Nom_Dispositif
        state.ecrans = state.Device.data.Ecrans;
        state.sequences = state.Device.data.Sequences;
        state.Domain = state.Device.data.Domaine
        console.log('Ligne 1 : ')
        console.log(state.NameDevice)
        console.log('Ligne 2 : ')
        console.log(state.ecrans)
        console.log('Ligne 3 : ')
        console.log(state.sequences)
        console.log('Ligne 4 : ')
        console.log(state.Domain.Nom_Domaine)
    })
}
function getDevices() {
    axios.get(`${BASE}${OBJ}${TOKEN}??fields=id`).then(response => {
        state.Devices = response.data
    })
}


</script>
<template>
    <h1>Page UpdateDevice</h1>
    <h2>Vous êtes actuellement sur le domaine: {{ state.Domain.Nom_Domaine }}</h2>
    <h3>L'url : {{ BASE }}{{ OBJ }}</h3>
    <h3>TOKEN du dispositif d'affichage : 
        <select name="Token">
            <option value="{{TOKEN}}">{{TOKEN}}</option>
        </select>
    </h3>

</template>
<style scoped>

</style>


