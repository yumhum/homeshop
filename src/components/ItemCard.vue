<template>
  <div class="wrap">
    <button @click="$emit('itemDeleted')">X</button>
    <div class="item" :class="{ checked: check }">
      <b>{{ item }}</b>
    </div>
    <input
      type="checkbox"
      @click="$emit('itemChecked')"
      class="check"
      :checked="check"
    />
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: String,
    default: "Shopping item",
  },
  check: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: center;
  margin: auto;
  width: 100%;
  height: auto;
  min-height: 3rem;
}

.item {
  background-color: rgb(222, 243, 255);
  margin: 0.12rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  &.checked {
    background-color: rgb(196, 250, 170)!important;
  }
}

button {
  border: none;
  cursor: pointer;
  margin: 0.12rem;
  min-width: 3rem;
}

.check {
  cursor: pointer;
  margin: 0.12rem;
  min-width: 3rem;
}
</style>
