//ITEM CARD
//-vue deps
import { reactive, toRefs, ref, unref } from "vue";

//ext. deps
import _orderBy from "lodash/orderBy";

//-firebase
import { db } from "@/firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
  query,
  getDocs,
  where,
} from "firebase/firestore";

//DATA
//data state
export const itemsState = reactive({
  items: [],
});
//items explicit expression
export const { items } = toRefs(itemsState);

export const loadFirebaseDb = {
  //real-time db && sort
  sortByPriority: () => {
    onSnapshot(collection(db, "testList"), (querySnapshot) => {
      let firebaseItems = [];
      querySnapshot.forEach((doc) => {
        let itemsPush = {
          id: Number(doc.id),
          item: doc.data().item,
          check: doc.data().check,
          checkTime: doc.data().checkTime,
          priority: doc.data().priority,
        };
        firebaseItems.push(itemsPush);
      });
      itemsState.items = firebaseItems;
      itemsState.items = _orderBy(
        itemsState.items,
        ["check", "checkTime", "priority", "id"],
        ["asc", "asc", "desc", "asc"]
      );
    });
  },
};
loadFirebaseDb.sortByPriority()

// FUNCTIONS
// -add new item
export const newItemCard = (e) => {
  let ids = itemsState.items.map((item) => {
    return item.id;
  });
  const maxId = String(ids.length ? Math.max(...ids) + 1 : 1);
  setDoc(doc(db, "testList", maxId), {
    item: e,
    check: false,
    checkTime: 0,
    priority: 1,
  });
};

// -DeleteButtons props fcs
export const itemsLength = ref(null);

export const checkStatus = () => {
  let nrChecks = 0;
  unref(items).forEach((element) => {
    if (element.check) {
      nrChecks++;
    }
  });
  return nrChecks;
};

// -delete button clicked
export const deleteClicked = (id) => {
  deleteDoc(doc(db, "testList", String(id)));
};

// -delete all checked items
export const deleteAllChecked = async () => {
  const batch = writeBatch(db);
  const q = query(collection(db, "testList"), where("check", "==", true));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
};

// -delete all items
export const deleteAll = async () => {
  if (confirm("Opravdu vymazat všechny položky?")) {
    const batch = writeBatch(db);
    const q = query(collection(db, "testList"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }
};

// -checkbox button clicked
export const checkClicked = (index, id) => {
  if (itemsState.items[index].check === false) {
    updateDoc(doc(db, "testList", String(id)), {
      check: true,
      checkTime: Date.now(),
    });
  } else {
    updateDoc(doc(db, "testList", String(id)), {
      check: false,
      checkTime: 0,
    });
  }
};

// -priority cmd
export const changePriority = (data, id) => {
  data === "NORMÁLNÍ"
    ? (data = 1)
    : data === "VYSOKÁ"
    ? (data = 2)
    : (data = 0);
  updateDoc(doc(db, "testList", String(id)), {
    priority: data,
  });
};
