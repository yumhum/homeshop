<template>
  <div>
    <p>OZAJSTNÝ LOGIN</p>
    <form action="" @submit.prevent="login" v-if="!user">
      <input type="email" placeholder="E-mail" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" /><button
        type="submit"
      >
        Login
      </button>
    </form>
    <div v-else>
      <p>User: {{ user.email }}</p>
      <p>User ID: {{ user.uid }}</p>
      <button @click="copyTextToClipboard()">
        Zkopírovat User ID do schránky
      </button>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { user, login, logout, email, password } from "@/auth-cmd.js";
import { ref } from "vue";

const copyTextToClipboard = () => {
  navigator.clipboard
    .writeText(user.value.uid)
    .then(() => {
      alert("User ID zkopírováno do schránky :)");
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error);
    });
};
</script>

<style lang="scss" scoped></style>
