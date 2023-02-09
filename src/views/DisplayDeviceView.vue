<script setup>
import { onMounted, ref, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { BASE, OBJ, TOKEN } from "/public/config.js";


const axios = inject('axios');

let state = reactive({
    Device: {},
    Domain: {},



});


onMounted(() => {
    console.log('Settings');
    getDeviceInformation();
})

function getDeviceInformation() {
    axios.get(`${BASE}items/${OBJ}${TOKEN}?fields=Nom_Dispositif,Sequences.Ordre_Sequence,Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,Sequences.Sequence_id.Ecrans.Ordre_Ecran,Sequences.Sequence_id.Ecrans.Ecran_id.Duree,Domaine.Nom_Domaine,Ecrans.Ecran_id.Donnees,Ecrans.Ecran_id.Duree`).then(response => {
        state.Device = response.data

        state.Domain = state.Device.data.Domaine



    })
}
// function getDevices() {
//     axios.get(`${BASE}${OBJ}${TOKEN}??fields=id`).then(response => {
//         state.Devices = response.data
//     })
// }


</script>
<template>
    <h1>Les réglages de base</h1>
    <h2>Bonjour c'est le domaine: {{ state.Domain.Nom_Domaine }}</h2>
    <h3>l'url: {{ BASE }}{{ OBJ }}</h3>
    <h3>la Clé est: {{ TOKEN }}</h3>
</template>
<style scoped>

</style>