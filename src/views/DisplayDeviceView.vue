<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { useTokenStore } from "@/stores/token";
import { marked } from 'marked';
import { nextTick } from 'vue'

const token = useTokenStore();
const axios = inject('axios');
let state = reactive({
  Device: {},
  sequences: [],
  ecrans: [],
  visible: false,
  htmlData: [],
  Durees: [],
  newDevice: {},
  asba: {},
  i: 0,

  dataIndex: 0,
  timeIndex: 0


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
  // start();
  // setInterval(() => {
  //     state.currentIndex = (state.currentIndex + 1) % state.htmlData.length
  // }
  //     , 9000);
  // console.log(state.Durees)

})
// async function start() {
//     // console.log(state.Durees)
//     await setInterval(() => {
//         state.currentIndex = (state.currentIndex + 1) % state.htmlData.length
//     }
//         , 9000);
// }
function minutesToSecondes(m) {
  return (Math.trunc(m) * 60 + (1 / (m - Math.trunc(m)))) * 1000
}

function getDeviceInformation() {
  axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=Sequences.Ordre_Sequence,Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,Sequences.Sequence_id.Ecrans.Ordre_Ecran,Sequences.Sequence_id.Ecrans.Ecran_id.Duree,Ecrans.Ecran_id.Donnees,Ecrans.Ecran_id.Duree,Ecrans.id,Ecrans.Ordre_Dispositif_Ecran`).then(response => {
    state.Device = response.data
    console.log(state.Device)
    state.ecrans = state.Device.data.Ecrans;
    state.ecrans.sort((a, b) => {
      return a.Ordre_Dispositif_Ecran - b.Ordre_Dispositif_Ecran
    })

    state.sequences = state.Device.data.Sequences;
    (state.ecrans).forEach(ecran => {
      console.log(ecran)
      state.htmlData.push(marked(ecran.Ecran_id.Donnees))
      state.Durees.push(minutesToSecondes(ecran.Ecran_id.Duree))


      console.log(state.htmlData)
      console.log(state.Durees)


    });
    // console.log(state.Durees[0])

    // for (let i = 0; i < state.Durees.length; i++) {
    // console.log(state.Durees[i])
    setInterval(() => {

          state.dataIndex = (state.dataIndex + 1) % state.htmlData.length
          nextTick(() => {
            state.i = state.Durees[state.dataIndex]
            console.log(state.i)
            // console.log(state.Durees[state.dataIndex]);
          });
        }
        , 3000
    );
    console.log(state.Durees[state.dataIndex])

    // }

    // setInterval(() => {
    //     state.currentIndex = (state.currentIndex + 1) % state.htmlData.length
    //     console.log(state.Durees[state.currentIndex])
    // }
    //     , state.Durees[state.currentIndex]);

  })
}

// function playAnimation(time) {
//     window.requestAnimationFrame(playAnimation)
//     console.log
//     // 3108.748
// }
// window.requestAnimationFrame(playAnimation)
// function sortedEcrans() {
//     console.log(state.ecrans)

//     return state.ecrans.sort((a, b) => {
//         a.Ordre_Dispositif_Ecran - b.Ordre_Dispositif_Ecran
//     })

// }


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
  <div v-html="state.htmlData[state.dataIndex]">

  </div>

  <!-- <template v-for="ecran in state.htmlData" :key="ecran.id">
      <div v-html="ecran">

      </div>


  </template> -->
</template>
<style scoped>

</style>