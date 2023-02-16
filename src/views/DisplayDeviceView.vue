<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { inject } from "@vue/runtime-core";
import { useTokenStore } from "@/stores/token";
import { marked } from 'marked';
import {useSessionStore} from "@/stores/sessions";

const token = useTokenStore();
const session = useSessionStore();
const axios = inject('axios');

const h1 = reactive(({
  color : '',
  font_size: '',
  background_color:'',
  text_transform:'',
  text_align:'',
  font_weight:''
}))
const h2 = reactive(({
  color : '',
  font_size: '',
  background_color:'',
  text_transform:'',
  text_align:'',
  font_weight:''
}))
const h3 = reactive(({
  color : '',
  font_size: '',
  background_color:'',
  text_transform:'',
  text_align:'',
  font_weight:''
}))
const p = reactive(({
  color : '',
  font_size: '',
  background_color:'',
  text_transform:'',
  text_align:'',
}))
const a = reactive(({
  color : '',
  text_decoration:''
}))
const img = reactive(({
 border_radius:'',
  width:''
}))
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


function addingStyleToH1(){
  if (((state.styleData)[state.dataIndex].h1)!==null){
  h1.color = (state.styleData)[state.dataIndex].h1.color;
  h1.background_color = (state.styleData)[state.dataIndex].h1.background_color
  h1.font_size = (state.styleData)[state.dataIndex].h1.font_size
  h1.font_weight = (state.styleData)[state.dataIndex].h1.font_weight
  h1.text_align = (state.styleData)[state.dataIndex].h1.text_align
  h1.text_transform = (state.styleData)[state.dataIndex].h1.text_transform
  }
}

function addingStyleToH2(){
  if (((state.styleData)[state.dataIndex].h2)!==null){
    h2.color = (state.styleData)[state.dataIndex].h2.color;
    h2.background_color = (state.styleData)[state.dataIndex].h2.background_color
    h2.font_size = (state.styleData)[state.dataIndex].h2.font_size
    h2.font_weight = (state.styleData)[state.dataIndex].h2.font_weight
    h2.text_align = (state.styleData)[state.dataIndex].h2.text_align
    h2.text_transform = (state.styleData)[state.dataIndex].h2.text_transform
  }

}

function addingStyleToH3(){
  if (((state.styleData)[state.dataIndex].h3)!==null){
  h3.color = (state.styleData)[state.dataIndex].h3.color;
  h3.background_color = (state.styleData)[state.dataIndex].h3.background_color
  h3.font_size = (state.styleData)[state.dataIndex].h3.font_size
  h3.font_weight = (state.styleData)[state.dataIndex].h3.font_weight
  h3.text_align = (state.styleData)[state.dataIndex].h3.text_align
  h3.text_transform = (state.styleData)[state.dataIndex].h3.text_transform
  }
}

function addingStyleToP(){
  if (((state.styleData)[state.dataIndex].p)!==null){
    p.color = (state.styleData)[state.dataIndex].p.color;
    p.background_color = (state.styleData)[state.dataIndex].p.background_color
    p.font_size = (state.styleData)[state.dataIndex].p.font_size
    p.text_align = (state.styleData)[state.dataIndex].p.text_align
    p.text_transform = (state.styleData)[state.dataIndex].p.text_transform
  }

}

function addingStyleToLink(){
  if (((state.styleData)[state.dataIndex].a)!==null){
    a.color = (state.styleData)[state.dataIndex].a.color;
    a.text_decoration = (state.styleData)[state.dataIndex].a.text_decoration
  }
}

function addingStyleToImg(){
  if (((state.styleData)[state.dataIndex].img)!==null){
    img.border_radius = (state.styleData)[state.dataIndex].img.border_radius;
    img.width = (state.styleData)[state.dataIndex].img.width
  }

}
function getDeviceInformation() {
  axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=Sequences.Ordre_Sequence,Sequences.Sequence_id.Ecrans.Ecran_id.Donnees,Sequences.Sequence_id.Ecrans.Ordre_Ecran,Sequences.Sequence_id.Ecrans.Ecran_id.Duree,Sequences.Sequence_id.Ecrans.Ecran_id.Template.Theme,Sequences.Sequence_id.Ecrans.Ecran_id.Template.Nom_Template,Sequences.Sequence_id.Ecrans.Ecran_id.Template.h1.*,Sequences.Sequence_id.Ecrans.Ecran_id.Template.h2.*,Sequences.Sequence_id.Ecrans.Ecran_id.Template.h3.*,Sequences.Sequence_id.Ecrans.Ecran_id.Template.p.*,Sequences.Sequence_id.Ecrans.Ecran_id.Template.a.*,Sequences.Sequence_id.Ecrans.Ecran_id.Template.img.*`).then(response => {
    state.Device = response.data
    console.log(state.Device)
    state.sequences = state.Device.data.Sequences;
    orderingSequence(state.sequences);

   let SequenceEcrans = getAllEcransInOneData(state.sequences);
    orderingEcrans(SequenceEcrans);
    buildingDataToDisplay(state.SequenceEcrans);
    setInterval(() => {
          state.dataIndex = (state.dataIndex + 1) % state.htmlData.length
     addingStyleToH1();
      addingStyleToH2()
      addingStyleToH3()
      addingStyleToP()
      addingStyleToLink()
      addingStyleToImg()
        }, 3000
    );
  })
}
</script>
<template>
  <div class="content" v-html="state.htmlData[state.dataIndex]">
  </div>
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
.content :deep(a){
  color: v-bind('a.color');
  text-decoration: v-bind('a.text_decoration');
}
.content :deep(img){
  border-radius: v-bind('img.border_radius');
  width: v-bind('img.width');
}

</style>
