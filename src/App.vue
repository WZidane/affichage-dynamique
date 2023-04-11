<script setup>

import Navbar from '@/components/NavBar.vue';
import {provide, onMounted, reactive, watch} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {useSessionStore} from "@/stores/sessions";
import mitt from 'mitt';

const state = reactive({appReady: false});

const bus = mitt();
provide('bus', bus);

const router = useRouter();
provide('router', router);

const session = useSessionStore();
provide('session', session);

const route = useRoute();

watch(route, () => {
    demarrer();
});

onMounted(() => {
    demarrer();
});


function demarrer() {
    state.appReady = true;
}
</script>

<template>
    <header>
        <Navbar v-if="$route.path !== '/DisplayDevice'"/>
    </header>
    <body v-if="state.appReady">
      <RouterView/>
    </body>
</template>

<style>
html {
    scroll-behavior: smooth;
}
</style>