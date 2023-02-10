<!-- <script setup>
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/stores/session';


const router = useRouter()
const session = useSessionStore();


</script>

<template>
    <nav class="navbar has-background-info" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://allweb.fun/coop/doc/">
                <img src="data:image/png;base64,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"
                    width="112" height="28">
            </a>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <template v-if="session.data.openMenu">
            <div class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/conversationsList" class="navbar-item">
                        Conversations
                    </router-link>


                    <router-link to="/memberList" class="navbar-item">
                        Members
                    </router-link>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">

                            <button @click="logOut" class="button is-primary">
                                <strong>Log out</strong>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </template>
    </nav>

</template>
 -->
