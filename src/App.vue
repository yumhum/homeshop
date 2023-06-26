<template>
  <header><h1>HomeShop</h1></header>

  <main>
    <NavigationPage />
    <RouterView></RouterView>
    <!-- <ItemSection /> -->
  </main>
  <!-- <button @click="$log(flaggedList[0].name)">Log</button> -->
  <!-- <button @click="test">Log2</button> -->
  <!-- <button @click="flagCmd()">Log3</button> -->
  <!-- <button @click="$log(checkStatus())">Log3</button> -->
    <!-- <button @click="$log(route.name)">Log</button> -->

  <footer id="footer">
    v0.3 by <a href="https://github.com/yumhum">YumHum</a>
  </footer>
</template>

<script setup>
import { user, logout, updateProfileName } from "@/auth-cmd.js";
import { } from "@/lists-cmd.js";



//components
import NavigationPage from "@/components/NavigationPage.vue";
import ItemSection from "@/components/items/ItemSection.vue";

import { getAuth } from "firebase/auth";

import { watch } from "vue";
import {  useRoute } from "vue-router";
//ITEM data and functions
import {
  loadFirebaseItemsDb,
  routeExport
} from "@/items-cmd.js";

const route = useRoute();

</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: center;
  max-width: 375px;
  margin: auto;
}

main {
  gap: 0.25rem;
  margin: auto;
  max-width: 375px;
  width: 100%;


}

#footer {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
