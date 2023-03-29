<template>
  <div v-if="props.show">
    <form action="">
      <label for="lName">Jméno seznamu:</label>
      <p name="lName">{{ props.name }}</p>
      <label for="lOwner">Tento seznam patří: </label>
      <p name="lOwner">{{ props.owner }}</p>
    </form>
  </div>
</template>

<script setup>
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


</script>

<style lang="scss" scoped></style>
s