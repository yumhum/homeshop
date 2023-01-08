<template>
  <div id="delete-buttons">
    <button
      id="delete-all"
      @click="$emit('deleteAllClicked')"
      :class="{ disabled: props.itemsLength === 0 }"
      :disabled="props.itemsLength === 0"
    >
      Smazat vše
    </button>
    <button
      id="delete-checked"
      :class="{ disabled: props.checkStatus === 0 }"
      :disabled="props.checkStatus === 0"
      @click="$emit('deleteCheckedClicked')"
    >
      Smazat splněné
    </button>
  </div>
</template>

<script setup>
const props = defineProps(["checkStatus", "itemsLength"]);
</script>

<style lang="scss" scoped>
#delete-buttons {
  display: flex;
  max-width: 267.52px;
  min-height: 3rem;
  width: 100%;
  margin: 1rem 0rem;
  button {
    width: 100%;
    cursor: pointer;
  }

  #delete-all {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
  }
  #delete-checked {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
  }
  .disabled {
    opacity: 0.5;
  }
}
</style>
