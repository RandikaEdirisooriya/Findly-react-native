
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



export const firebaseConfig = {
  apiKey: "AIzaSyDHubOSu1BHUADJ8tDifz2AkWfhx1MxiZY",
  authDomain: "findly-52565.firebaseapp.com",
  projectId: "findly-52565",
  storageBucket: "findly-52565.firebasestorage.app",
  messagingSenderId: "376795915018",
  appId: "1:376795915018:web:a87cbcdae913f5a49450f3",
  measurementId: "G-H39PPQV883"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);