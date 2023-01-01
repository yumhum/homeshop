//ITEM CARD
//-vue deps
import { reactive, toRefs } from "vue";

//ext. deps
import _sortBy from "lodash/sortBy";

//-firebase
import { db } from "@/firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

//DATA
//data state
export const itemsState = reactive({
  items: [],
});
//items explicit expression
export const { items } = toRefs(itemsState);

const loadFirebaseDb = () => {
  //real-time db && sort
  onSnapshot(collection(db, "testList"), (querySnapshot) => {
    let firebaseItems = [];
    querySnapshot.forEach((doc) => {
      let itemsPush = {
        id: doc.id,
        item: doc.data().item,
        check: doc.data().check,
        checkTime: doc.data().checkTime,
      };
      firebaseItems.push(itemsPush);
    });
    itemsState.items = firebaseItems;
    itemsState.items = _sortBy(itemsState.items, ["check", "checkTime", "id"]);
  });
};
loadFirebaseDb();

// FUNCTIONS
// -new item
export const newItemCard = async (e) => {
  let ids = itemsState.items.map((item) => {
    return item.id;
  });
  const maxId = String(ids.length ? Math.max(...ids) + 1 : 1);
  await setDoc(doc(db, "testList", maxId), {
    item: e,
    check: false,
    checkTime: 0,
  });
};

// -delete clicked
export const deleteClicked = async id => {
  await deleteDoc(doc(db, "testList", id));
};

// -checkbox clicked
export const checkClicked = async (index, id) => {
  if (itemsState.items[index].check === false) {
    await updateDoc(doc(db, "testList", id), {
      check: true,
      checkTime: Date.now()
    });
  } else {
    await updateDoc(doc(db, "testList", id), {
      check: false,
      checkTime: 0
    });
  }

};
