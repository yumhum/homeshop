<template>
  <header><h1>HomeShop</h1></header>
  <!-- <nav>
    <RouterLink to="/lists">Lists</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
  </nav> -->

  <main>
    <RouterView></RouterView>
    <section>
      <p v-if="items.length === 0">
        Nic tu není. Klikni na + a přidej novou položku.
      </p>
      <Item-Card
        v-for="(item, index) in items"
        :key="item.id"
        :item="item.item"
        :check="item.check"
        @item-checked="checkClicked(index, item.id)"
        @item-deleted="deleteClicked(item.id)"
      />

      <Add-New-Item @item-submited="newItemCard" />
    </section>
  </main>
  <!-- <button @click="$log(JSON.stringify(items, null, 1))">Log</button> -->
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'


//components
import ItemCard from "@/components/ItemCard.vue";
import AddNewItem from "@/components/AddNewItem.vue";

//ITEM data and functions
import {
  items,
  checkClicked,
  deleteClicked,
  newItemCard,
} from "@/items-cmd.js";
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
</style>
