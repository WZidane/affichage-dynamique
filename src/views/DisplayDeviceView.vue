<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { useTokenStore } from "@/stores/token";
import {marked, use} from 'marked';
import {useSessionStore} from "@/stores/sessions";
import {useUserStore} from "@/stores/user";
const user = useUserStore();
const token = useTokenStore();
const session = useSessionStore();
const axios = inject('axios');

const backgroundColor = reactive({
  color :''
})
const h1 = reactive({
  color : '',
  font_size: '',
  background_color:'',
  text_transform:'',
  text_align:'',
  font_weight:''
})
const h2 = reactive({
  color : '',
  font_size: '',
  background_color:'',
  text_transform:'',
  text_align:'',
  font_weight:''
})
const h3 = reactive({
  color : '',
  font_size: '',
  background_color:'',
  text_transform:'',
  text_align:'',
  font_weight:''
})
const p = reactive({
  color : '',
  font_size: '',
  background_color:'',
  text_transform:'',
  text_align:'',
})

const img = reactive({
 border_radius:'',
  width:''
})
let state = reactive({
  Device: {},
  sequences: [],
  SequenceEcrans : [],
  htmlData: [],
  styleData:[],
  dataIndex: 0,
});

onMounted(() => {
  console.log('one device');
  session.setNav();
  getDeviceInformation();
})
function getAllEcransInOneData(tab){
  let permenantSequenceEcrans = [];
  tab.forEach(sequence => {
    permenantSequenceEcrans.push( sequence.Sequence_id.Ecrans) ;
  })
return  permenantSequenceEcrans;
}

function orderingEcrans(tab){
  let oneTabSequenceEcrans = [];
  oneTabSequenceEcrans = tab.reduce((acc,current)=> acc.concat(current),[]);
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
}

function orderingSequence(tab){
  tab.sort((a, b) => {
    return a.Ordre_Sequence - b.Ordre_Sequence
  })
}
function buildingDataToDisplay(tab){
  var styles = [];
  tab.forEach(ecran =>{
    styles.push(ecran.Ecran_id.Template)
  })
  tab.forEach(ecran => {
    state.htmlData.push((marked(ecran.Ecran_id.Donnees)));
    state.styleData.push(ecran.Ecran_id.Template)
  })
}

function addingBackgroundColor(){
  backgroundColor.color = (state.styleData)[state.dataIndex].background_color.color;
  console.log(backgroundColor.color)
}
function addingStyleToH1(){
  h1.color = (state.styleData)[state.dataIndex].h1.color;
  h1.background_color = (state.styleData)[state.dataIndex].h1.background_color
  h1.font_size = (state.styleData)[state.dataIndex].h1.font_size
  h1.font_weight = (state.styleData)[state.dataIndex].h1.font_weight
  h1.text_align = (state.styleData)[state.dataIndex].h1.text_align
  h1.text_transform = (state.styleData)[state.dataIndex].h1.text_transform

}

function addingStyleToH2(){
    h2.color = (state.styleData)[state.dataIndex].h2.color;
    h2.background_color = (state.styleData)[state.dataIndex].h2.background_color
    h2.font_size = (state.styleData)[state.dataIndex].h2.font_size
    h2.font_weight = (state.styleData)[state.dataIndex].h2.font_weight
    h2.text_align = (state.styleData)[state.dataIndex].h2.text_align
    h2.text_transform = (state.styleData)[state.dataIndex].h2.text_transform

}

function addingStyleToH3(){
  h3.color = (state.styleData)[state.dataIndex].h3.color;
  h3.background_color = (state.styleData)[state.dataIndex].h3.background_color
  h3.font_size = (state.styleData)[state.dataIndex].h3.font_size
  h3.font_weight = (state.styleData)[state.dataIndex].h3.font_weight
  h3.text_align = (state.styleData)[state.dataIndex].h3.text_align
  h3.text_transform = (state.styleData)[state.dataIndex].h3.text_transform
}

function addingStyleToP(){
    p.color = (state.styleData)[state.dataIndex].p.color;
    p.background_color = (state.styleData)[state.dataIndex].p.background_color
    p.font_size = (state.styleData)[state.dataIndex].p.font_size
    p.text_align = (state.styleData)[state.dataIndex].p.text_align
    p.text_transform = (state.styleData)[state.dataIndex].p.text_transform
}
function addingStyleToImg(){
    img.border_radius = (state.styleData)[state.dataIndex].img.border_radius;
    img.width = (state.styleData)[state.dataIndex].img.width
}
function getDeviceInformation() {

  axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}&fields=
        id,
          Sequences.Ordre_Sequence,
          Sequences.Sequence_id.Ecrans.Ordre_Ecran,
          Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,
          Sequences.Sequence_id.Ecrans.Ecran_id.Duree,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.Nom_Template,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h1.color,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h1.text_transform,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h1.font_size,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h1.text_align,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h1.background_color,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h1.font_weight,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h2.color,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h2.text_transform,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h2.font_size,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h2.text_align,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h2.background_color,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h2.font_weight,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h3.color,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h3.text_transform,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h3.font_size,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h3.text_align,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h3.background_color,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.h3.font_weight,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.p.color,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.p.text_transform,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.p.font_size,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.p.text_align,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.p.background_color,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.img.border_radius,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.img.width,
          Sequences.Sequence_id.Ecrans.Ecran_id.Template.background_color.color`).catch((response)=>{
    if ((response.response.data.errors[0].extensions.code === 'TOKEN_EXPIRED')){
      axios.post(`https://74b3jzk3.directus.app/auth/refresh`,{ refresh_token : token.state.REFRESHUSER, mode : 'json' }).then(response => {
        token.state.USER = response.data.data.access_token;
        console.log(token.state.USER)

        token.state.REFRESHUSER =response.data.data.refresh_token;
      })

    }

  }).then(response => {

    state.Device = response.data
    console.log(state.Device)
    state.sequences = state.Device.data.Sequences;
    orderingSequence(state.sequences);

   let SequenceEcrans = getAllEcransInOneData(state.sequences);
   console.log(SequenceEcrans)
    orderingEcrans(SequenceEcrans);
   console.log(state.SequenceEcrans)
    buildingDataToDisplay(state.SequenceEcrans);
   console.log(state.styleData)
    state.htmlData[state.dataIndex] = state.htmlData[state.dataIndex].replace( /(<\/?p[^>]*>)(?=<img.+>)|(<\/?p[^>]*>)(?<=<img.+>)/g,
        "")

    if (state.styleData.length !== 0){
      addingBackgroundColor()
      addingStyleToH1();
      addingStyleToH2()
      addingStyleToH3()
      addingStyleToP()
      addingStyleToImg()
    }
  }).then(()=>{
     setInterval(() => {


       state.dataIndex = (state.dataIndex + 1) % state.htmlData.length
       state.htmlData[state.dataIndex] = state.htmlData[state.dataIndex].replace( /(<\/?p[^>]*>)(?=<img.+>)|(<\/?p[^>]*>)(?<=<img.+>)/g,
           "")

       if (state.styleData.length !== 0){
            addingBackgroundColor()
            addingStyleToH1();
            addingStyleToH2()
            addingStyleToH3()
            addingStyleToP()
            addingStyleToImg()
          }

        }, 7000
    );
  })
}
</script>
<template>
  <div class="content" :style="{ 'background-color':backgroundColor.color}" v-if="state.sequences.length" v-html="state.htmlData[state.dataIndex]">
  </div>
  <div v-else><h2>Il n'existe pas de séquences liées à ce dispositif !</h2> </div>
</template>
<style scoped>
.content :deep(h1){
  color: v-bind('h1.color');
  font-size: v-bind('h1.font_size');
  background-color: v-bind('h1.background_color');
  text-transform: v-bind('h1.text_transform');
  text-align: v-bind('h1.text_align');
  font-weight: v-bind('h1.font_weight');
}
.content :deep(h2){
  color: v-bind('h2.color');
  font-size: v-bind('h2.font_size');
  background-color: v-bind('h2.background_color');
  text-transform: v-bind('h2.text_transform');
  text-align: v-bind('h2.text_align');
  font-weight: v-bind('h2.font_weight');
}
.content :deep(h3){
  color: v-bind('h3.color');
  font-size: v-bind('h3.font_size');
  background-color: v-bind('h3.background_color');
  text-transform: v-bind('h3.text_transform');
  text-align: v-bind('h3.text_align');
  font-weight: v-bind('h3.font_weight');
}
.content :deep(p){
  color: v-bind('p.color');
  font-size: v-bind('p.font_size');
  background-color: v-bind('p.background_color');
  text-transform: v-bind('p.text_transform');
  text-align: v-bind('p.text_align');
}

.content :deep(img){
  border-radius: v-bind('img.border_radius');
  width: v-bind('img.width');
}
</style>
