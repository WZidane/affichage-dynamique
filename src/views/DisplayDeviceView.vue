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
  SequenceEcrans : [],
  visible: false,
  htmlData: [],
  htmlSData:[],
  Durees: [],
  newDevice: {},
  i: 0,

  dataIndex: 0,
  timeIndex: 0


});



onMounted(() => {
  console.log('one device');
  getDeviceInformation();


})

function minutesToSecondes(m) {
  return (Math.trunc(m) * 60 + (1 / (m - Math.trunc(m)))) * 1000
}

function getDeviceInformation() {
  axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=Sequences.Ordre_Sequence,Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,Sequences.Sequence_id.Ecrans.Ordre_Ecran,Sequences.Sequence_id.Ecrans.Ecran_id.Duree,Ecrans.Ecran_id.Donnees,Ecrans.Ecran_id.Duree,Ecrans.id,Ecrans.Ordre_Dispositif_Ecran`).then(response => {
    state.Device = response.data
    console.log(state.Device)
    state.ecrans = state.Device.data.Ecrans;

    //SEQUENCE
    state.sequences = state.Device.data.Sequences;

    state.sequences.sort((a, b) => {
      return a.Ordre_Sequence - b.Ordre_Sequence
    })
    console.log(state.sequences);
    let permenantSequenceEcrans = [];
        (state.sequences).forEach(sequence => {
      console.log(sequence.Sequence_id.Ecrans)
          permenantSequenceEcrans.push( sequence.Sequence_id.Ecrans) ;
      console.log(permenantSequenceEcrans)
    })
    console.log(permenantSequenceEcrans);

        let oneTabSequenceEcrans = [];
    oneTabSequenceEcrans = permenantSequenceEcrans.reduce((acc,current)=> acc.concat(current),[]);
    console.log((oneTabSequenceEcrans));
  console.log(state.ecrans);
    let seen = new Set();

    state.SequenceEcrans = oneTabSequenceEcrans.reduce((acc, obj) => {
      let value = obj.Ordre_Ecran;
      while (seen.has(value)) {
        value++;
      }
      seen.add(value);
      acc.push({...obj, Ordre_Ecran: value});
      return acc;
    }, []);

    console.log(state.SequenceEcrans);
    console.log(state.ecrans);

//***********************

    state.ecrans.sort((a, b) => {
      return a.Ordre_Dispositif_Ecran - b.Ordre_Dispositif_Ecran
    });


    (state.ecrans).forEach(ecran => {
      console.log(ecran)
      state.htmlData.push(marked(ecran.Ecran_id.Donnees))
      state.Durees.push(minutesToSecondes(ecran.Ecran_id.Duree))
    });

    (state.SequenceEcrans).forEach(ecran => {
       state.htmlSData.push((marked(ecran.Ecran_id.Donnees)));

    })

    setInterval(() => {

          state.dataIndex = (state.dataIndex + 1) % state.htmlSData.length
          nextTick(() => {
          // state.i = state.Durees[state.dataIndex]
          //  console.log(state.i)
            // console.log(state.Durees[state.dataIndex]);
          });
        }
        , 3000
    );



  })
}


</script>
<template>

  <div v-html="state.htmlSData[state.dataIndex]">

  </div>

</template>
<style scoped>

</style>