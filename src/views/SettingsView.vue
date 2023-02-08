<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { useTokenStore } from "../stores/token";

const axios = inject('axios');
const token = useTokenStore();
let state = reactive({
    Device: {},
    Domain: {},
});

onMounted(() => {
    console.log('Settings');
    token.setDefaultBasicUrl();
    token.setDeviceObj();
    token.setDefaultToken();
    getDeviceInformation();
})

function getDeviceInformation() {
    axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=Nom_Dispositif,Sequences.Ordre_Sequence,Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,Sequences.Sequence_id.Ecrans.Ordre_Ecran,Sequences.Sequence_id.Ecrans.Ecran_id.Duree,Domaine.Nom_Domaine,Ecrans.Ecran_id.Donnees,Ecrans.Ecran_id.Duree`).then(response => {
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
    <h1>Les réglages de la base sont :</h1>
    <h2>Vous êtes actuellement sur le domaine: {{ state.Domain.Nom_Domaine }}</h2>
    <h3>L'url : {{ token.state.BASE }}{{ token.state.OBJ }}</h3>
    <h3>TOKEN du dispositif d'affichage : {{ token.state.TOKEN }}</h3>
    
    <button>
        <RouterLink to="UpdateDevice">Update</RouterLink>
    </button>
</template>
<style scoped>

</style>
