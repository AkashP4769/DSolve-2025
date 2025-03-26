import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBVBqP-d4n2_vGRZM7-axxjx_zLII_ABNI",
    authDomain: "one-click0.firebaseapp.com",
    projectId: "one-click0",
    storageBucket: "one-click0.firebasestorage.app",
    messagingSenderId: "571480992857",
    appId: "1:571480992857:web:b5f514d1c1934deb2f5548",
  };

initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const cvdb=getStorage();