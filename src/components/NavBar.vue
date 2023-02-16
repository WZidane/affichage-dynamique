<script setup>
import { useRouter } from 'vue-router';
import {useUserStore} from "@/stores/user";
import {useSessionStore} from "@/stores/sessions";
import {reactive} from "vue";


const router = useRouter()
const session = useSessionStore();
const user = useUserStore();
const arr = reactive({
  bool: true,
});

const arrows = reactive({
  class: 'arrow arrow-pos',
  nav: 'navbar navbar-pos'
})
function arrow() {
  if(arr.bool) {
    session.section.class = "section navbar-presence"
    arrows.nav = 'navbar';
    arrows.class = 'arrow arrow-key';
    arr.bool = false;
  } else {
    session.section.class = "section navbar-absence"
    arrows.nav = 'navbar navbar-pos';
    arrows.class = 'arrow arrow-pos';
    arr.bool = true;
  }
}
</script>

<template>
  <nav v-if="$route.path !== '/DisplayDevice'" class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="/logo-title.png" height="50" alt="logo">
      </router-link>
    </div>
    <template v-if="user.isConnected && session.navbar === true">
      <div class="navbar-menu">

          <router-link to="/DisplayDevice" class="navbar-item">
            Affichage
          </router-link>

          <router-link to="/" class="navbar-item">
            Paramètres
          </router-link>

          <button @click="user.disconnect()" class="button">
            Se déconnecter
          </button>

      </div>
    </template>
    <template v-if="user.isConnected && session.navbar === false">
      <div class="navbar-menu">

        <button @click="user.disconnect()" class="button">
          Se déconnecter
        </button>

      </div>
    </template>
  </nav>
  <nav v-if="$route.path === '/DisplayDevice'" role="navigation" aria-label="main navigation" :class="arrows.nav">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="/logo-title.png" height="50" alt="logo">
      </router-link>
    </div>
    <template v-if="user.isConnected && session.navbar === true && $route.path === '/DisplayDevice'">
      <div class="navbar-menu">

        <router-link to="/DisplayDevice" class="navbar-item">
          Affichage
        </router-link>

        <router-link to="/" class="navbar-item">
          Paramètres
        </router-link>

        <button @click="user.disconnect()" class="button">
          Se déconnecter
        </button>

      </div>
      <span :class="arrows.class" @click="arrow()">▼</span>
    </template>
  </nav>
</template>

<style scoped>

.navbar-pos {
  position: relative;
  top: -72px;
}
.arrow-pos {
  opacity: 0.1;
  transition: all 0.5s ease-in-out;
}
</style>

