<script setup>

import Navbar from '@/components/NavBar.vue';
import { provide, onMounted, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {useSessionStore} from "@/stores/sessions";

import { useGlobal } from '@/mixins/global';
import mitt from 'mitt';

const state = reactive({ appReady: false});

const bus = mitt();
provide('bus', bus);
provide('global', useGlobal());

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
  if (session.isValid()) {
      state.appReady = true;
  } else {
    state.appReady = true;
  }
}
</script>

<template>
    <Navbar />
  <template v-if="$route.path === '/DisplayDevice'">
    <section :class="session.section.class">
      <template v-if="state.appReady">
        <RouterView />
      </template>
    </section>
  </template>
  <section v-if="$route.path !== '/DisplayDevice'" class="section">
    <template v-if="state.appReady">
      <RouterView />
    </template>
  </section>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>