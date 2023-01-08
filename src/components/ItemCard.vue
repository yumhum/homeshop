<template>
  <div class="wrap">
    <button @click="$emit('itemDeleted')">X</button>
    <div
      class="item-wrap"
      :class="{
        checked: props.check,
        'priority-h': props.priority === 2,
        'priority-l': props.priority === 0,
      }"
    >
      <p>{{ props.item }}</p>
      <div class="priority-wrap" v-if="!props.check">
        <label for="priority">Priorita: </label>
        <select
          name="priority"
          id=""
          v-model="selectedPriority"
          @change="priorityChange"
        >
          <option>VYSOKÁ</option>
          <option>NORMÁLNÍ</option>
          <option>NÍZKÁ</option>
        </select>
      </div>
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
import { ref } from "vue";

const props = defineProps({
  item: {
    type: String,
    default: "Shopping item",
  },
  check: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
  },
  priority: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["itemDeleted", "itemChecked", "priorityChanged"]);

// -priority change
const priorityToString = () => {
  let priorityStringed;
  props.priority === 0
    ? (priorityStringed = "NÍZKÁ")
    : props.priority === 1
    ? (priorityStringed = "NORMÁLNÍ")
    : (priorityStringed = "VYSOKÁ");
  return priorityStringed;
};

const selectedPriority = ref(priorityToString());

const priorityChange = () => {
  let data = selectedPriority.value;
  emit("priorityChanged", data, props.id);
};
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

.item-wrap {
  background-color: rgb(222, 243, 255);
  margin: 0.12rem;
  max-width: 267.52px;
  min-height: 3rem;
  width: 100%;
  position: relative;
  text-align: center;
  &.checked {
    background-color: #4caf50 !important;
    color: white;
    text-decoration: line-through;
  }
  &.priority-h {
    background-color: rgb(200, 235, 255);
  }
  &.priority-l {
    background-color: rgb(239, 249, 254);
  }

  p {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

  .priority-wrap {
    text-align: left;
    font-size: 10px;
    font-style: italic;
    color: grey;
    position: absolute;
    bottom: 0;

    select {
      font-size: 10px;
      font-style: italic;
      background-color: rgba(0, 0, 0, 0);
      border: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      outline: none;
    }
  }
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  margin: 0.12rem;
  min-width: 3rem;
}

.check {
  cursor: pointer;
  margin: 0.12rem;
  width: 3rem;
  height: 3rem;
}
</style>
