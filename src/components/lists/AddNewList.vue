<template>
  <form
    @submit.prevent="itemSubmit"
    @keydown.enter.exact.prevent="itemSubmit"
    id="add-new"
  >
    <textarea
      type="text"
      v-model="newList"
      placeholder="Přidat nový seznam"
      ref="listInput"
    />
    <button
      type="submit"
      value="Submit"
      :class="{ 'button-disabled': textareaEmpty() }"
      id="add-button"
    >
      +
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["list-submited"]);

const listInput = ref(null);
const newList = ref("");
const textareaEmpty = () => newList.value.trim().length === 0;

const itemSubmit = () => {
  if (textareaEmpty()) {
    return;
  } else {
    emit("list-submited", newList.value);
    newList.value = "";
    listInput.value.focus();
  }
};
</script>

<style lang="scss" scoped>
#add-new {
  max-width: 267.52px;
  min-height: 3rem;
  width: 100%;
  display: flex;
  margin-top: 0.12rem;

  textarea {
    width: 100%;
    outline: none;
    text-align: center;
    border: 1px solid #0dd746;
    border-radius: 0px;
    resize: none;
    &:focus {
      background-color: rgb(222, 243, 255);
      border: none;
    }
  }

  #add-button {
    min-width: 3rem;
    background-color: #12cb46;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &.button-disabled {
      opacity: 0.5;
    }
  }
}
</style>
