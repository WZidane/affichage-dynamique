<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { useTokenStore } from "@/stores/token";
import { marked } from 'marked';
import {useSessionStore} from "@/stores/sessions";

const token = useTokenStore();
const session = useSessionStore();
const axios = inject('axios');
let state = reactive({
  Device: {},
  sequences: [],
  SequenceEcrans : [],
  htmlData: [],
  Durees: [],
  dataIndex: 0,
  timeIndex: 0
});

onMounted(() => {
  console.log('one device');
  session.rmNav();
  getDeviceInformation();
})

function minutesToSecondes(m) {
  return (Math.trunc(m) * 60 + (1 / (m - Math.trunc(m)))) * 1000
}

function getAllEcransInOneData(tab){
  let permenantSequenceEcrans = [];
  tab.forEach(sequence => {
    console.log(sequence.Sequence_id.Ecrans)
    permenantSequenceEcrans.push( sequence.Sequence_id.Ecrans) ;
    console.log(permenantSequenceEcrans)
  })
return  permenantSequenceEcrans;
}

function orderingEcrans(tab){
  let oneTabSequenceEcrans = [];
  oneTabSequenceEcrans = tab.reduce((acc,current)=> acc.concat(current),[]);
  console.log((oneTabSequenceEcrans));
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
}

function orderingData(tab){
  tab.sort((a, b) => {
    return a.Ordre_Sequence - b.Ordre_Sequence
  })
}

function buildingDataToDisplay(tab){
  tab.forEach(ecran => {
    state.htmlData.push((marked(ecran.Ecran_id.Donnees)));
    state.Durees.push(minutesToSecondes(ecran.Ecran_id.Duree))

  })
console.log(state.htmlData);
}
function getDeviceInformation() {
  axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=Sequences.Ordre_Sequence,Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,Sequences.Sequence_id.Ecrans.Ordre_Ecran,Sequences.Sequence_id.Ecrans.Ecran_id.Duree,Ecrans.Ecran_id.Donnees,Ecrans.Ecran_id.Duree,Ecrans.id,Ecrans.Ordre_Dispositif_Ecran`).then(response => {
    state.Device = response.data
    console.log(state.Device)
    state.sequences = state.Device.data.Sequences;
    orderingData(state.sequences);
   let SequenceEcrans = getAllEcransInOneData(state.sequences);
    orderingEcrans(SequenceEcrans);
    buildingDataToDisplay(state.SequenceEcrans);
    setInterval(() => {
          state.dataIndex = (state.dataIndex + 1) % state.htmlData.length
        }, 3000
    );
  })
}
</script>
<template>

  <div class="display" v-html="state.htmlData[state.dataIndex]">

  </div>

</template>
