
import { initializeApp } from "firebase/app";
import {  getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1MdotoJtiwI6-AWRMgQX4fK4Pxx90GSw",
    authDomain: "doddo-inst.firebaseapp.com",
    projectId: "doddo-inst",
    storageBucket: "doddo-inst.appspot.com",
    messagingSenderId: "667476208636",
    appId: "1:667476208636:web:39e34a250227999050e079",
    measurementId: "G-7E21TQBNYG"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore(app);