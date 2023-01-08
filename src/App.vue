<template>
  <header><h1>HomeShop</h1></header>
  <!-- <nav>
    <RouterLink to="/lists">Lists</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
  </nav> -->

  <main>
    <!-- <RouterView></RouterView> -->
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
        @item-deleted="deleteClicked(item.id)"
        @priorityChanged="changePriority"
      />

      <Add-New-Item @item-submited="newItemCard" />
      <Delete-Buttons
        :checkStatus="checkStatus()"
        :itemsLength="items.length"
        @deleteCheckedClicked="deleteAllChecked"
        @deleteAllClicked="deleteAll"
      />
    </section>
  </main>
  <!-- <button @click="$log(JSON.stringify(items, null, 1))">Log</button> -->
  <!-- <button @click="loadFirebaseDb.sortPriority()">Log2</button> -->
  <!-- <button @click="$log(checkStatus())">Log3</button> -->
  <footer id="footer">
    v0.2 by <a href="https://github.com/humusuck">Humusuck</a>
  </footer>
</template>

<script setup>
//DB served at items-cmd.js

// import { RouterLink, RouterView } from 'vue-router'

//components
import ItemCard from "@/components/ItemCard.vue";
import AddNewItem from "@/components/AddNewItem.vue";
import DeleteButtons from "@/components/DeleteButtons.vue";

//ITEM data and functions
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
  loadFirebaseDb,
} from "@/items-cmd.js";
import { computed } from "@vue/runtime-core";
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

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

#footer {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
