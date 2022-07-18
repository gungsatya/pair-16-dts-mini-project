// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEOk1UJG1bHxZwWf1Bh3C0ISOmOpW1mKE",
  authDomain: "mini-project-dts-2022-978c0.firebaseapp.com",
  projectId: "mini-project-dts-2022-978c0",
  storageBucket: "mini-project-dts-2022-978c0.appspot.com",
  messagingSenderId: "247172727560",
  appId: "1:247172727560:web:18c6ac4e931d3255d762bd",
};

// Initialize Firebase
const _app = initializeApp(firebaseConfig);

const auth = getAuth(_app);

const registerUserWithEmailPassword = async (email, password) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    return {
      status: true,
      user: newUser,
    };
  } catch (error) {
    console.error("Regis Error with code : ", error.code);
    console.error("Regis Error message : ", error.message);
    return {
      status: false,
      error: error,
    };
  }
};

const loginUserWithEmailPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return {
      status: true,
      user: user,
    };
  } catch (error) {
    console.error("Login Error with code : ", error.code);
    console.error("Login Error message : ", error.message);
    return {
      status: false,
      error: error,
    };
  }
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Reset Password Error with code : ", error.code);
    console.error("Reset Password Error message : ", error.message);
  }
};
const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error with code : ", error.code);
    console.error("Logout Error message : ", error.message);
  }
};

export {
  auth,
  registerUserWithEmailPassword,
  loginUserWithEmailPassword,
  resetPassword,
  logoutUser,
};
