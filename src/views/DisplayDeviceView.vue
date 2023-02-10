<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { useTokenStore } from "@/stores/token";
import { marked } from 'marked';

const token = useTokenStore();
const axios = inject('axios');

let state = reactive({
    Device: {},
    sequences: [],
    ecrans: [],
    visible: false,
    htmlData: [],
    Durees: [],

    currentIndex: 0


});

// (state.Durees).forEach(duree => {
//     duree
// })


onMounted(() => {
    console.log('one device');
/*
    token.setDefaultBasicUrl();
    token.setDeviceObj();
    token.setDefaultToken();

 */
    getDeviceInformation();


    setInterval(() => {
        state.currentIndex = (state.currentIndex + 1) % state.htmlData.length
    }, 2000)
})
function minutesToSecondes(m) {
    return (Math.trunc(m) * 60 + (m - Math.trunc(m))) * 1000
}
function getDeviceInformation() {
    axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=Sequences.Ordre_Sequence,Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,Sequences.Sequence_id.Ecrans.Ordre_Ecran,Sequences.Sequence_id.Ecrans.Ecran_id.Duree,Ecrans.Ecran_id.Donnees,Ecrans.Ecran_id.Duree,Ecrans.id,Ecrans.Ordre_Sequence`).then(response => {
        state.Device = response.data
        console.log(state.Device)
        state.ecrans = state.Device.data.Ecrans;
        state.sequences = state.Device.data.Sequences;
        (state.ecrans).forEach(ecran => {
            console.log(ecran)
            state.htmlData.push(marked(ecran.Ecran_id.Donnees))
            state.Durees.push(minutesToSecondes(ecran.Ecran_id.Duree))
            console.log(state.htmlData)

        });
        console.log(state.ecrans)
        console.log(state.sequences)
        console.log(state.Durees)


    })
}

// function displayData() {

//     (state.htmlData).forEach(data => {
//         console.log(data)
//         setTimeout(() => {
//             state.dataToDislay = data
//             console.log(state.dataToDislay)
//         }, 3000)

//     })

// }


</script>
<template>
    <!-- <h1>Affichage</h1> -->
    <!-- <button @click="displayData">go</button> -->
    <div v-html="state.htmlData[state.currentIndex]">

    </div>

    <!-- <template v-for="ecran in state.htmlData" :key="ecran.id">
        <div v-html="ecran">

        </div>


    </template> -->
</template>
<style scoped>

</style>