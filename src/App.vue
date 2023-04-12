<script setup>

import Navbar from '@/components/NavBar.vue';
import {provide, onMounted, reactive, watch} from 'vue';
import {useRouter, useRoute} from 'vue-router';

const state = reactive({appReady: false});

const router = useRouter();
provide('router', router);

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