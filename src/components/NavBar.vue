<script setup>
import { useRouter } from 'vue-router';
import {useUserStore} from "@/stores/user";
import {useSessionStore} from "@/stores/sessions";


const router = useRouter()
const session = useSessionStore();
const user = useUserStore();

</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="/logo-title.png" height="50" alt="logo">
      </router-link>
    </div>
    <template v-if="user.isConnected">
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
      <span class="arrow">▼</span>
    </template>
  </nav>
</template>

<style scoped>
/* afficher ce CSS lorsqu'on est sur DisplayDeviceView */
.navbar{
  position: relative;
  top: -72px;
}
.arrow{
  opacity: 1;
}
</style>

