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

          <router-link to="/Settings" class="navbar-item">
            Paramètres
          </router-link>

          <button @click="user.disconnect()" class="button">
            Se déconnecter
          </button>

      </div>
    </template>
  </nav>
</template>
<style scoped>
.navbar {
  box-shadow: 0 0 5px;
}
</style>

