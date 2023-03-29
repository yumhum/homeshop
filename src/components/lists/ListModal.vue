<template>
  <div v-if="props.show">
    <form action="">
      <label for="lName">Jméno seznamu:</label>
      <input type="text" name="lName" v-model="listName" />
      <label for="shareList">Sdílení (zadejte ID): </label>
      <input type="text" name="shareList" v-model="shareUser" />
    </form>
    <button @click="deleteList(props.id)">Smazat seznam</button>
    <button @click="saveEdit(listName, shareUser, props.owner, props.id)">
      Uložit
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { saveEdit, deleteList } from "@/lists-cmd.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  id: {
    type: String,
  },
  owner: {
    type: String,
  },
});

const listName = ref(props.name);
const shareUser = ref("");
</script>

<style lang="scss" scoped></style>
