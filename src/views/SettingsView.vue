<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { useTokenStore } from "@/stores/token";

const axios = inject('axios');
const token = useTokenStore();
let state = reactive({
    Device: {},
    Domain: {},
    NameDevice: "",
    NameSequences: [],
    SequenceLength: 0,
    NameEcrans: [],
    EcranLength: ""
});

onMounted(() => {
    console.log('Settings');
    /*
    token.setDefaultBasicUrl();
    token.setDeviceObj();
    token.setDefaultToken();
     */
    getDeviceInformation();
})

async function getDeviceInformation() {
    await axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=Nom_Dispositif,Sequences.Sequence_id.Nom_Sequence,Ecrans.Ecran_id.Nom_Ecran,Domaine.Nom_Domaine`).then(response => {
        state.Device = response.data
        state.Domain = state.Device.data.Domaine
        state.NameDevice = state.Device.data.Nom_Dispositif
        state.SequenceLength = state.Device.data.Sequences.length
        state.EcranLength = state.Device.data.Ecrans.length
        
        for (let i = 0; i < state.SequenceLength; i++) {
            state.NameSequences[i] = state.Device.data.Sequences[i].Sequence_id.Nom_Sequence
        }
        for (let i = 0; i < state.EcranLength; i++) {
            state.NameEcrans[i] = state.Device.data.Ecrans[i].Ecran_id.Nom_Ecran
        }
        console.log(state.Device.data.Ecrans)
    })
}

</script>
<template>
    <h1>Les réglages de la base sont :</h1>
    <h2>Vous êtes actuellement sur le domaine: {{ state.Domain.Nom_Domaine }}</h2>
    <h2>Voici les données sur le dispositif d'affichage : {{ state.NameDevice }}</h2>
    <h3>Identifiant du dispositif : {{ token.state.TOKEN }}</h3>
    <div>
        <h3 v-if="state.SequenceLength <= 0">Ce dispositif ne contient aucune séquence</h3>
        <h3 v-if="state.SequenceLength == 1">Ce dispositif contient {{ state.SequenceLength }} séquence qui s'appelle : {{ state.NameSequences[0] }}</h3>
        <div v-if="state.SequenceLength >= 2">
            <h3>Ce dispositif contient {{ state.SequenceLength }} séquences qui s'appellent :</h3>
            <ul>
                <li v-for="Nom_Sequence in state.NameSequences">
                    {{ Nom_Sequence }}
                </li>
            </ul>
        </div>
    </div>
    <div>
        <h3 v-if="state.EcranLength <= 0">Ce dispositif ne contient aucun écran</h3>
        <h3 v-if="state.EcranLength == 1">Ce dispositif contient {{ state.EcranLength }} écran qui s'appelle : {{ state.NameEcrans[0] }}</h3>
        <div v-if="state.EcranLength >= 2">
            <h3>Ce dispositif contient {{ state.EcranLength }} séquences qui s'appellent :</h3>
            <ul>
                <li v-for="Nom_Ecran in state.NameEcrans">
                    {{ Nom_Ecran }}
                </li>
            </ul>
        </div>
    </div>
    <!-- <h3>L'url : {{ token.state.BASE }}{{ token.state.OBJ }}</h3> -->

    <button>
        <RouterLink to="UpdateDevice">Update</RouterLink>
    </button>
</template>
<style scoped>

</style>
