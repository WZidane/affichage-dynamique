<script setup>
import { onMounted, ref, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { BASE, OBJ, TOKEN } from "/public/config.js";


const axios = inject('axios');

let infos = reactive({
    nom: "",
    date_created: "",
});

let state = reactive({
    device: {},
    Domain: {},
    visible: false,
    sequences: [],
    ecrans: []
});


onMounted(() => {
    console.log('one device');
    // getDevice();
    getAll();
})

// function getDevice() {
//     axios.get(`${BASE}${OBJ}${TOKEN}`).then((response) => {
//         state.device = response.data;
//         console.log(state.device);
//         state.sequences = state.device.data.Sequences;
//         state.ecrans = state.device.data.Ecrans;
//         infos.nom = state.device.data.Nom_Dispositif;
//         infos.date_created = state.device.data.date_created;
//         console.log(state.sequences);
//     }).then
// }
function getAll() {
    axios.get(`${BASE}${OBJ}${TOKEN}?fields=Nom_Dispositif,Sequences.Ordre_Sequence,Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,Sequences.Sequence_id.Ecrans.Ordre_Ecran,Sequences.Sequence_id.Ecrans.Ecran_id.Duree,Domaine.Nom_Domaine,Ecrans.Ecran_id.Donnees,Ecrans.Ecran_id.Duree`).then(response => {
        state.device = response.data
        state.ecrans = state.device.data.Ecrans;
        state.sequences = state.device.data.Sequences;
        state.Domain = state.device.data.Domaine
        console.log(state.device)
        console.log(state.device.data.Ecrans)

    })
}


</script>
<template>
    <h2>Appareil : {{ infos.nom }}</h2>
    <h3>Date de création : {{ infos.date_created }}</h3>
    <h3>{{ state.sequences }}</h3>
</template>
<style scoped>

</style>