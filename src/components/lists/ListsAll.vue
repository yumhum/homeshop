<template>
  <div v-if="route.name !== 'list'">
    <div v-if="user">
      <p v-if="sharedLists.length === 0 && userLists.length === 0">
        Zatím tu žádné seznamy nemám
      </p>
      <ul>
        <p v-if="userLists.length !== 0">Moje seznamy:</p>
        <li v-for="(list, index) in userLists" :key="list.id">
          <button @click="ModalCmd.userLists(index)">
            {{ showModal === index ? "Zavřít" : "Upravit" }}
          </button>
          <router-link
            :to="{ name: 'list', params: { id: list.id, slug: list.name } }"
            >{{ list.name }}</router-link
          >
          <ListModal
            :name="list.name"
            :id="list.id"
            :owner="list.owner"
            :show="showModal === index"
          />
        </li>
        <p v-if="sharedLists.length !== 0">Sdílené seznamy se mnou:</p>
        <li v-for="(list, sharedIndex) in sharedLists" :key="list.id">
          <button @click="ModalCmd.sharedLists(sharedIndex)">
            {{ showModalShared === sharedIndex ? "Zavřít" : "Info" }}
          </button>
          <router-link
            :to="{ name: 'list', params: { id: list.id, slug: list.name } }"
            >{{ list.name }}</router-link
          >
          <ListInfo
            :name="list.name"
            :id="list.id"
            :owner="list.owner"
            :show="showModalShared === sharedIndex"
          />
        </li>
      </ul>
    </div>
    <p v-else>
      Pro zobrazení svých seznamů se musíš
      <router-link to="/login">Přihlásit se.</router-link>.
    </p>
    <section>
      <AddNewList @list-submited="newList" />
    </section>
  </div>

  <div v-if="user && (listValidation || shareValidation)">
    <ItemSection v-if="route.name === 'list'" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { lists, newList } from "@/lists-cmd.js";
import { user } from "@/auth-cmd.js";
import ItemSection from "@/components/items/ItemSection.vue";
import AddNewList from "@/components/lists/AddNewList.vue";
import ListModal from "@/components/lists/ListModal.vue";
import ListInfo from "@/components/lists/ListInfo.vue";

const route = useRoute();

const showModal = ref(null);
const showModalShared = ref(null);
const ModalCmd = {
  userLists(i) {
    if (showModal.value === null) {
      showModal.value = i;
    } else {
      showModal.value = null;
    }
  },
  sharedLists(e) {
    if (showModalShared.value === null) {
      showModalShared.value = e;
    } else {
      showModalShared.value = null;
    }
  },
};

const listValidation = computed(() => {
  return userLists.value.some((list) => list.id === route.params.id);
});
const shareValidation = computed(() => {
  return sharedLists.value.some((list) => list.id === route.params.id);
});

const updateUserLists = computed(() => {
  return lists.value.filter((list) => list.owner === user.value.uid);
});
const updateSharedLists = computed(() => {
  return lists.value.filter((list) => {
    let shared = false;
    list.share?.forEach((share) => {
      if (share === user.value.uid) {
        shared = true;
      }
    });
    return shared;
  });
});
const userLists = ref(updateUserLists);
const sharedLists = ref(updateSharedLists);
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul {
  padding: 0;
}
li {
  display: flex;
  gap: 1rem;
}
</style>
