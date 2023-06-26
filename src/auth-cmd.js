import { ref } from "vue";
import { app } from "@/firebase";
import { getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import router from './router';



export const auth = getAuth();
export const user = ref(auth.currentUser);
export const email = ref("");
export const password = ref("");

// Trigger reactivity when auth state changes
auth.onAuthStateChanged((currentUser) => {
  user.value = currentUser;
});

export const login = async () => {
  await signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log(userCredential)
      console.log("Login successfull");
      console.log(auth.currentUser);
      router.push("/lists");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    });
};

export const logout = async () => {
  await signOut(auth)
    .then(() => {
      console.log("Logout successfull");
    })
    .catch((error) => {
      console.log("Logout failed: " + error);
    });
};

export const updateProfileName = () => {
  updateProfile(auth.currentUser, {
    displayName: "HUMUSSSS"
  }).then(() => {
console.log("Name updated")
  }).catch((error) => {
console.error(error)
  });
}
