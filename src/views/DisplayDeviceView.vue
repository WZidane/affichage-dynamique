<script setup>
import {onMounted, reactive} from "@vue/runtime-core";
import {inject} from "@vue/runtime-core";
import {useTokenStore} from "@/stores/token";
import {marked} from 'marked';
import CursorHider from "@/components/CursorHider.vue";

const token = useTokenStore();
const axios = inject('axios');

const backgroundColor = reactive({
    color: ''
})
const h1 = reactive({
    color: '',
    font_size: '',
    background_color: '',
    text_transform: '',
    text_align: '',
    font_weight: ''
})
const h2 = reactive({
    color: '',
    font_size: '',
    background_color: '',
    text_transform: '',
    text_align: '',
    font_weight: ''
})
const h3 = reactive({
    color: '',
    font_size: '',
    background_color: '',
    text_transform: '',
    text_align: '',
    font_weight: ''
})
const p = reactive({
    color: '',
    font_size: '',
    background_color: '',
    text_transform: '',
    text_align: '',
})
const img = reactive({
    border_radius: '',
    width: ''
})

let state = reactive({
    Device: {},
    sequences: [],
    SequenceEcrans: [],
    htmlData: [],
    styleData: [],
    dataIndex: 0,
    EcranAlert: {},
    Durees: [],
});

onMounted(() => {
    getAlertDeviceInformation();
    document.documentElement.requestFullscreen();
    setInterval(updateAlertInformation,  30 * 60 * 1000);
})
function updateAlertInformation() {
    getAlertDeviceInformation();
    location.reload();
}

function getAllEcransInOneData(tab) {
    let permenantSequenceEcrans = [];
    tab.forEach(sequence => {
        permenantSequenceEcrans.push(sequence.Sequence_id.Ecrans);
    })
    return permenantSequenceEcrans;
}

function orderingEcrans(tab) {
    let oneTabSequenceEcrans = tab.reduce((acc, current) => acc.concat(current), []);
    let seen = new Set();
    state.SequenceEcrans = oneTabSequenceEcrans.reduce((acc, obj) => {
            let value = obj.Ordre_Ecran;
            while (seen.has(value)) {
                value++;
            }
            seen.add(value);
            acc.push({...obj, Ordre_Ecran: value});
            return acc;
        }, []
    );
}

function minutesToSecondes(m) {
    return m * 1000
}

function orderingSequence(tab) {
    tab.sort((a, b) => {
        return a.Ordre_Sequence - b.Ordre_Sequence
    })
}

function buildingAlertDataToDisplay(data) {
    state.htmlData.push((marked(data.Donnees)));
    state.styleData.push(data.Template)
}

function buildingDataToDisplay(tab) {
    tab.forEach(ecran => {
        state.htmlData.push((marked(ecran.Ecran_id.Donnees)));
        state.styleData.push(ecran.Ecran_id.Template)
        state.Durees.push(minutesToSecondes(ecran.Ecran_id.Duree))
    })
}

function addingBackgroundColor() {
    backgroundColor.color = (state.styleData)[state.dataIndex].background_color.color;
}

function addingStyleToH1() {
    h1.color = (state.styleData)[state.dataIndex].h1.color;
    h1.background_color = (state.styleData)[state.dataIndex].h1.background_color
    h1.font_size = (state.styleData)[state.dataIndex].h1.font_size
    h1.font_weight = (state.styleData)[state.dataIndex].h1.font_weight
    h1.text_align = (state.styleData)[state.dataIndex].h1.text_align
    h1.text_transform = (state.styleData)[state.dataIndex].h1.text_transform
}

function addingStyleToH2() {
    h2.color = (state.styleData)[state.dataIndex].h2.color;
    h2.background_color = (state.styleData)[state.dataIndex].h2.background_color
    h2.font_size = (state.styleData)[state.dataIndex].h2.font_size
    h2.font_weight = (state.styleData)[state.dataIndex].h2.font_weight
    h2.text_align = (state.styleData)[state.dataIndex].h2.text_align
    h2.text_transform = (state.styleData)[state.dataIndex].h2.text_transform
}

function addingStyleToH3() {
    h3.color = (state.styleData)[state.dataIndex].h3.color;
    h3.background_color = (state.styleData)[state.dataIndex].h3.background_color
    h3.font_size = (state.styleData)[state.dataIndex].h3.font_size
    h3.font_weight = (state.styleData)[state.dataIndex].h3.font_weight
    h3.text_align = (state.styleData)[state.dataIndex].h3.text_align
    h3.text_transform = (state.styleData)[state.dataIndex].h3.text_transform
}

function addingStyleToP() {
    p.color = (state.styleData)[state.dataIndex].p.color;
    p.background_color = (state.styleData)[state.dataIndex].p.background_color
    p.font_size = (state.styleData)[state.dataIndex].p.font_size
    p.text_align = (state.styleData)[state.dataIndex].p.text_align
    p.text_transform = (state.styleData)[state.dataIndex].p.text_transform
}

function addingStyleToImg() {
    img.border_radius = (state.styleData)[state.dataIndex].img.border_radius;
    img.width = (state.styleData)[state.dataIndex].img.width
}

function getAlertDeviceInformation() {
    axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=
Ecran_Alerte.Donnees,
Ecran_Alerte.Template.h1.*,
Ecran_Alerte.Template.h2.*,
Ecran_Alerte.Template.h3.*,
Ecran_Alerte.Template.p.*,
Ecran_Alerte.Template.img.*,
Ecran_Alerte.Template.background_color.*`).then(response => {
        state.EcranAlert = response.data.data.Ecran_Alerte
        if (state.EcranAlert !== null) {
            buildingAlertDataToDisplay(state.EcranAlert)
            state.htmlData[0] = state.htmlData[0].replace(/(<\/?p[^>]*>)(?=<img.+>)|(<\/?p[^>]*>)(?<=<img.+>)/g, "")
            if (state.styleData.length !== 0) {
                addingBackgroundColor()
                addingStyleToH1();
                addingStyleToH2()
                addingStyleToH3()
                addingStyleToP()
                addingStyleToImg()
            }
        } else getDeviceInformation()
    })
}

function getDeviceInformation() {
    axios.get(`${token.state.BASE}${token.state.OBJ}${token.state.TOKEN}?fields=
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
Sequences.Sequence_id.Ecrans.Ecran_id.Template.background_color.color`).then(response => {
        state.Device = response.data.data
        state.sequences = state.Device.Sequences;
        orderingSequence(state.sequences);
        let SequenceEcrans = getAllEcransInOneData(state.sequences);
        orderingEcrans(SequenceEcrans);
        buildingDataToDisplay(state.SequenceEcrans);

    }).then(() => {
        function test() {
            state.dataIndex = (state.dataIndex + 1) % state.htmlData.length
            state.htmlData[state.dataIndex] = state.htmlData[state.dataIndex].replace(/(<\/?p[^>]*>)(?=<img.+>)|(<\/?p[^>]*>)(?<=<img.+>)/g, "")
            if (state.styleData.length !== 0) {
                addingBackgroundColor()
                addingStyleToH1();
                addingStyleToH2()
                addingStyleToH3()
                addingStyleToP()
                addingStyleToImg()
            }
            setTimeout(test, state.Durees[state.dataIndex]);
        }

        setTimeout(test, state.Durees[state.dataIndex]);
    })
}

</script>

<template>
    <CursorHider/>
    <div class="content" :style="{ 'background-color':backgroundColor.color}" v-if="state.EcranAlert"
         v-html="state.htmlData[0]">
    </div>
    <div class="content" :style="{ 'background-color':backgroundColor.color}" v-else-if="state.sequences.length"
         v-html="state.htmlData[state.dataIndex]">
    </div>

    <div v-else><h2>Il n'existe pas de séquences liées à ce dispositif !</h2></div>
</template>

<style scoped>
.content :deep(h1) {
    color: v-bind('h1.color');
    font-size: v-bind('h1.font_size');
    background-color: v-bind('h1.background_color');
    text-transform: v-bind('h1.text_transform');
    text-align: v-bind('h1.text_align');
    font-weight: v-bind('h1.font_weight');
}

.content :deep(h2) {
    color: v-bind('h2.color');
    font-size: v-bind('h2.font_size');
    background-color: v-bind('h2.background_color');
    text-transform: v-bind('h2.text_transform');
    text-align: v-bind('h2.text_align');
    font-weight: v-bind('h2.font_weight');
}

.content :deep(h3) {
    color: v-bind('h3.color');
    font-size: v-bind('h3.font_size');
    background-color: v-bind('h3.background_color');
    text-transform: v-bind('h3.text_transform');
    text-align: v-bind('h3.text_align');
    font-weight: v-bind('h3.font_weight');
}

.content :deep(p) {
    color: v-bind('p.color');
    font-size: v-bind('p.font_size');
    background-color: v-bind('p.background_color');
    text-transform: v-bind('p.text_transform');
    text-align: v-bind('p.text_align');
}

.content :deep(img) {
    border-radius: v-bind('img.border_radius');
    width: v-bind('img.width');
}
</style>