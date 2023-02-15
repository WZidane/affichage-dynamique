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
});

onMounted(() => {
    /*
    token.setDefaultBasicUrl();
    token.setDeviceObj();
    token.setDefaultToken();
     */
    getDeviceInformation();
})

async function getDeviceInformation() {
      await axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=Nom_Dispositif,Sequences.Sequence_id.Nom_Sequence,Ecrans.Ecran_id.Nom_Ecran,Domaine.Nom_Domaine&filter[Domaine][_eq]=${token.state.DOMAIN}`).then(response => {
            state.Device = response.data
            state.DeviceId = token.state.TOKEN
            state.Domain = state.Device.data.Domaine
            state.NameDevice = state.Device.data.Nom_Dispositif
            state.SequenceLength = state.Device.data.Sequences.length

            for (let i = 0; i < state.SequenceLength; i++) {
              state.NameSequences[i] = state.Device.data.Sequences[i].Sequence_id.Nom_Sequence
            }
          })
        console.log(state.Device)
        console.log(state.Device.data.Sequences)
        console.log(state.NameSequences)
    }

</script>
<template>

  <h1>Réglages de base</h1>
    <h2>Vous êtes actuellement sur le domaine: <span>{{ state.Domain.Nom_Domaine }}</span></h2>
    <h2>Données du dispositif d'affichage : <span>{{ state.NameDevice }}</span></h2>
    <h3>Identifiant du dispositif : <span>{{ state.DeviceId }}</span></h3>
    <div>
        <h3 v-if="state.SequenceLength <= 0">Ce dispositif ne contient aucune séquence</h3>
        <h3 v-if="state.SequenceLength == 1">Ce dispositif contient {{ state.SequenceLength }} séquence : <span>{{ state.NameSequences[0] }}</span></h3>
        <div v-if="state.SequenceLength >= 2">
            <h3>Ce dispositif contient {{ state.SequenceLength }} séquences :</h3>
            <ul>
                <li v-for="Nom_Sequence in state.NameSequences">
                    {{ Nom_Sequence }}
                </li>
            </ul>
        </div>
    </div>

    <!-- <h3>L'url : {{ token.state.BASE }}{{ token.state.OBJ }}</h3> -->

    <button class="is-primary" @click="$router.push('UpdateDevice')">
        Mettre à jour
    </button>
</template>
<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
