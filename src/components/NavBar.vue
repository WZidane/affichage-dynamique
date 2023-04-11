<script setup>
import {useSessionStore} from "@/stores/sessions";

const session = useSessionStore();

</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="/assets/img/logo-title.png" height="50" alt="logo">
      </router-link>
    </div>
  </nav>
</template>
