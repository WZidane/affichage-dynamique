<script setup>
import { onMounted, reactive } from "@vue/runtime-core"
const props = defineProps(['admin'])


const state = reactive({
    admin: {},
    isDeleted: false
})
onMounted(() => {
    state.admin = props.admin;
    console.log(state.admin)
})


function deleteDomainAdmin() {
    axios.delete(`https://74b3jzk3.directus.app/items/Admin_domaine/${props.admin.id}?access_token=tSeMVK8Ew7CVZi57RFO73NcXQ60fVPPZ`).then(response => {
        state.admin = response;
        state.isDeleted = true
    })

}


</script>
<template>
    <template v-if="!state.isDeleted">

        <div :data-id="state.admin.id">
            <div><router-link :to="`/oneDomainAdmin/${state.admin.id}`">
                    <h2>{{ state.admin.Nom }} {{ state.admin.Prenom }}</h2>
                </router-link>

            </div>
            <button @click="deleteDomainAdmin" type='button' class="button is-link is-outlined">🗑️</button>

        </div>
    </template>

</template>