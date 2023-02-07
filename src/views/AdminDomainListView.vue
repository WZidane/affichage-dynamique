<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { inject } from "vue";
import Admin from '@/components/DomainAdmin.vue'
const axios = inject('axios');

const adminsList = ref([])
onMounted(() => {
  console.log("c'est la liste des administrateurs")
  getAdmins()
})

function getAdmins() {
  axios.get(`https://74b3jzk3.directus.app/items/Admin_domaine?access_token=tSeMVK8Ew7CVZi57RFO73NcXQ60fVPPZ`).then(response => {
    adminsList.value = response.data
    console.log(adminsList.value)
  }

 )
  
}
</script>

<template>
  <main>
    <h1> Liste des administrateurs</h1>
    <div v-for="admin in adminsList.data" :key="admin.id">
      <Admin :admin="admin"></Admin>
    </div>
  </main>
</template>
