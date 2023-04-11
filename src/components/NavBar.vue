<script setup>
</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                <img src="/logo-title.png" height="50" alt="logo">
            </router-link>
        </div>
        <template>
            <div class="navbar-menu">
            </div>
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

