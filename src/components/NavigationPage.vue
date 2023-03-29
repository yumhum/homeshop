<template>
  <nav>
    <router-link v-if="user" to="/">Domů</router-link>
    <router-link v-if="user" to="/lists">Seznamy</router-link>
    <router-link v-if="!user" to="/login">Přihlášení</router-link>
    <router-link v-if="user" to="/login">Profil</router-link>
    
  </nav>
</template>

<script setup>
import { user } from "@/auth-cmd.js";
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
