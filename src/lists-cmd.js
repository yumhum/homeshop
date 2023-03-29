//vue dep
import { ref } from "vue";

//firestore
import { db } from "@/firebase";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  updateDoc,
  writeBatch,
  doc,
  getDocs,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";

import { user } from "@/auth-cmd.js";

import { routeExport } from "@/items-cmd.js";

//seznamy
export const lists = ref([]);

//vylistování všech seznamů z db
export const listsAll = () => {
  const q = query(collection(db, "lists"));
  onSnapshot(q, (querySnap) => {
    let listPush = [];
    querySnap.forEach((doc) => {
      listPush.push({
        name: doc.data().name,
        id: doc.ref.id,
        owner: doc.data().owner,
        created: doc.data().created,
        share: doc.data().share,
        flag: doc.data().flag,
      });
    });
    lists.value = listPush;
  });
};
listsAll();

//uložení nového seznamu do db
export const newList = async (e) => {
  await addDoc(collection(db, "lists"), {
    name: e,
    owner: user.value.uid,
    created: Date.now(),
    share: [],
    flag: false,
  });
};

//úpravy jednotlivého seznamu (jméno, sdílení) v ListModal
export const saveEdit = async (listName, shareUser, owner, id) => {
  if (listName.trim().length === 0) {
    alert("Musíš seznamu zadat jméno");
    return;
  } else if (shareUser === owner) {
    alert("Nemůžeš sdílet list s jeho majitelem");
    return;
  } else {
    await updateDoc(doc(db, "lists", id), {
      name: listName,
      share: arrayUnion(shareUser),
    });
  }
};

//smazání jednotlivého seznamu
export const deleteList = async (id) => {
  if (confirm("Trvale odstranit seznam a všechny jeho položky?")) {
    try {
      const batch = writeBatch(db);
      const q = query(collection(db, "lists/" + id + "/items"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      await deleteDoc(doc(db, "lists", id));
    } catch (error) {
      console.error("some fuckin error:" + error);
    }
  }
};
