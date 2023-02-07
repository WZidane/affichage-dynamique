<script setup>
import { onMounted, reactive } from "@vue/runtime-core"
const props = defineProps(['admin'])


const state = reactive({
    admin:{}
})
onMounted(() => {
    state.admin = props.admin;
    console.log(state.admin)
})


// function deleteDomainAdmin() {
//     axios.delete(`channels/${props.conversation.id}?token=${session.data.token}`).then(response => {
//         state.conversation = response;
//         state.isDeleted = true
//     })

// }


</script>
<template>
 
        <div :data-id="state.admin.id">
            <div >
                    <h2>{{ state.admin.Nom }}</h2>
                    <h2>{{ state.admin.Prenom }}</h2>
                
            </div>
            <button type='button' class="button is-link is-outlined">🗑️</button>

        </div>
   
</template>