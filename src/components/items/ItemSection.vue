<template>
  <section>
    <p v-if="items.length === 0">Nic tu není. Přidej novou položku.</p>
    <Item-Card
      v-for="(item, index) in items"
      :key="item.id"
      :id="item.id"
      :item="item.item"
      :check="item.check"
      :itemsLength="(itemsLength = items.length)"
      :priority="item.priority"
      @item-checked="checkClicked(index, item.id)"
      @item-deleted="deleteClicked(item.id, item.item)"
      @priorityChanged="changePriority"
    />

    <Add-New-Item @item-submited="newItemCard" />
    <Delete-Buttons
      :checkStatus="checkStatus()"
      :itemsLength="items.length"
      @deleteCheckedClicked="deleteAllChecked"
      @deleteAllClicked="deleteAll"
    />
<!-- <button @click="$log(items)">Log</button> -->
  </section>
</template>

<script setup>
import ItemCard from "@/components/items/ItemCard.vue";
import AddNewItem from "@/components/items/AddNewItem.vue";
import DeleteButtons from "@/components/items/DeleteButtons.vue";

import {
  items,
  checkClicked,
  deleteClicked,
  newItemCard,
  deleteAllChecked,
  deleteAll,
  itemsLength,
  checkStatus,
  changePriority,
} from "@/items-cmd.js";

</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
