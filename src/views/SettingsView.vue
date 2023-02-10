<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { useTokenStore } from "../stores/token";

const axios = inject('axios');
const token = useTokenStore();
let state = reactive({
    Device: {},
    Domain: {},
    NameDevice: "",
});

onMounted(() => {
    console.log('Settings');
    token.setDefaultBasicUrl();
    token.setDeviceObj();
    token.setDefaultToken();
    getDeviceInformation();
})

function getDeviceInformation() {
    axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=Nom_Dispositif,Domaine.Nom_Domaine`).then(response => {
        state.Device = response.data
        state.Domain = state.Device.data.Domaine
        state.NameDevice = state.Device.data.Nom_Dispositif

    })
}

</script>
<template>
    <h1>Les réglages de la base sont :</h1>
    <h2>Vous êtes actuellement sur le domaine: {{ state.Domain.Nom_Domaine }}</h2>
    <h2>C'est le dispositif : {{ state.NameDevice }}</h2>
    <h3>L'url : {{ token.state.BASE }}{{ token.state.OBJ }}</h3>
    <h3>TOKEN du dispositif d'affichage : {{ token.state.TOKEN }}</h3>

    <button>
        <RouterLink to="UpdateDevice">Update</RouterLink>
    </button>
</template>
<style scoped>

</style>
