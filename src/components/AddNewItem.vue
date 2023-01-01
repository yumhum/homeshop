<template>
  <button @click="showAdd" v-show="!showAddItem" id="add-plus">+</button>
  <form @submit.prevent="itemSubmit" v-show="showAddItem" id="add-new">
    <input
      type="text"
      v-model="newItem"
      placeholder="Přidat novou položku"
      ref="itemInput"
    />
    <button
      type="submit"
      value="Submit"
      :disabled="newItem.trim().length === 0"
    >
      Přidat
    </button>
    <button type="button" @click="showAddItem = false">Zrušit</button>
  </form>
</template>

<script setup>
import { ref, nextTick } from "vue";

let showAddItem = ref(false);
const itemInput = ref(null);
const showAdd = () => {
  showAddItem.value = true;
  nextTick(() => {
    itemInput.value.focus();
  });
};

const emit = defineEmits(["item-submited"]);

const newItem = ref("");

const itemSubmit = () => {
  emit("item-submited", newItem.value);
  newItem.value = "";
};
</script>

<style lang="scss">
#add-plus {
  max-width: 250px;
  width: 100%;
}
#add-new {
  max-width: 250px;
  width: 100%;
  display: flex;
  justify-content: center;

  input {
    width: 100%;
  }
}
</style>
