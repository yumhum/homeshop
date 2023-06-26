<template>
  <p>VÍTAJ, SI NA HOMPEJDŽ</p>
  <div v-if="user && flaggedList">
    <ItemSection />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { watch } from "vue";
import { user } from "@/auth-cmd.js";
import { flaggedList } from "@/lists-cmd.js";
import ItemSection from "@/components/items/ItemSection.vue";

import { loadFirebaseItemsDb } from "@/items-cmd.js";

if (flaggedList.value) {
  console.log(flaggedList.value.name);
  loadFirebaseItemsDb.sortByPriority(flaggedList.value.id);
}

watch(flaggedList, (newFlaggedList) => {
  if (newFlaggedList) {
    console.log(newFlaggedList);
    loadFirebaseItemsDb.sortByPriority(newFlaggedList.id);
  }
});
</script>

<style lang="scss" scoped></style>
