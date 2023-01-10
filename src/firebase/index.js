import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAuth }  from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxNxLPEeuyBCASuabnXk9S9B3UR3ZM5ws",
  authDomain: "homeshop-369316.firebaseapp.com",
  projectId: "homeshop-369316",
  storageBucket: "homeshop-369316.appspot.com",
  messagingSenderId: "355659555408",
  appId: "1:355659555408:web:363fe85dce04192a3b2755",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

export { db };
