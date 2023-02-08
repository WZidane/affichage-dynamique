<script setup>
import { onMounted, reactive } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { inject } from "vue";

const axios = inject('axios');
const route = useRoute()

let state = reactive({
    admin: {},
    visible: false


})
onMounted(() => {
    console.log('one domain admin')
    getDomainAdmin()
})

function getDomainAdmin() {
    axios.get(`https://74b3jzk3.directus.app/items/Admin_domaine/${route.params.id}?access_token=tSeMVK8Ew7CVZi57RFO73NcXQ60fVPPZ`).then(response => {
        state.admin = response.data
        console.log(state.admin)
    }

    )
}

// function updateDomainAdmin() {
//     api.patch(`channels/${state.channel.id}?token=${session.data.token}`, {
//         body: state.channel
//     }).then(response => {
//         console.log(response)
//         state.visible = false;
//         state.channel = response;

//     }).catch(error => console.log(error))

// }

// function modeUpdateConversation() {
//     state.visible = true;
// }



</script>
<template>
    <main>
        <div class="column is-6 desktop is-flex is-desktop">
            <h1 class="title has-text-link column is-4  is-desktop">One conversation</h1>
            <button @click="modeUpdateConversation" type='button' class="button is-link is-outlined is-2">✍🏽</button>
        </div>
        <div v-if="state.visible" class=" column is-12 control columns">
            <form @submit.prevent="updateConversation">
                <div class="field">
                    <label class="label">Topic</label>
                    <input class="input is-focused column is-four-fifths" v-model="state.channel.topic"
                        id="{{state.channel.id}}" type="text">
                </div>
                <div class="field">
                    <label class="label">Label</label>
                    <input class="input is-focused column is-four-fifths" v-model="state.channel.label"
                        id="{{state.channel.id}}" type="text">
                </div>

                <button class="button is-info">Send</button>
            </form>
        </div>
        <div v-else>
            <h2 class="title has-text-dark">{{ state.channel.topic }}</h2>
            <h2 class="title has-text-dark">{{ state.channel.label }}</h2>
        </div>
        <div>
            <template v-for="message in state.messages" :key="message.id">
                <Message :message="message" :conversation="state.channel"></Message>
            </template>


            <div class=" column is-7 control columns">
                <form @submit.prevent="postMessage">
                    <label class="label">Add new message</label>
                    <input class="input is-focused column is-four-fifths" v-model="state.postMessage.message"
                        type="text">
                    <button class="button is-info">Send</button>
                </form>

            </div>



        </div>



    </main>
</template>