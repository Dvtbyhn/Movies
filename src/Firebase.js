import { initializeApp } from "firebase/app";
import {
  getAuth, createUserWithEmailAndPassword, updateProfile,
  signInWithEmailAndPassword, signOut, onAuthStateChanged, updatePassword
} from "firebase/auth";
import toast from "react-hot-toast";
import store from "./redux/store";
import { login as loginHandle, logout as logOutHandle } from "./redux/auth/authSlice";

const firebaseConfig = {
  apiKey: "AIzaSyBFkpbq00omiEsP0aCJJOLMovYMO4v2MLs",
  authDomain: "best-movies-65c09.firebaseapp.com",
  projectId: "best-movies-65c09",
  storageBucket: "best-movies-65c09.appspot.com",
  messagingSenderId: "669756116624",
  appId: "1:669756116624:web:6ac128e9fb41139aac9215",
  measurementId: "G-BV4QY5Q5ZB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const register = async (email, password, photoURL) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password, photoURL)
    return user
  } catch (error) {
    toast.error(error.message)
  }
}

export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user

  } catch (error) {
    toast.error("Yanlış şifre girildi")
  }
}


export const logout = async () => {
  try {
    await signOut(auth)
    return true

  } catch (error) {
    toast.error()
  }
}

export const update = async data => {
  try {
    await updateProfile(auth.currentUser, data)
    toast.success("Profil Güncellendi")
    return true
  } catch (error) {
    toast.error("Profil güncellenemedi")
  }
}

export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password)
    toast.success("Parolanız güncellendi")
  } catch (error) {
    toast.error(error.message)
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(loginHandle({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid
    }))
  } else {
    store.dispatch(logOutHandle())
  }
});

export default app