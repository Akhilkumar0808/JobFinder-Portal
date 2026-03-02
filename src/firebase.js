import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByOgEg2vOOouyXq9041b-GvlFhwL06z5s",
  authDomain: "job-finder-711ae.firebaseapp.com",
  projectId: "job-finder-711ae",
  storageBucket: "job-finder-711ae.appspot.com", // ✅ FIXED
  messagingSenderId: "39338483331",
  appId: "1:39338483331:web:cb51917aed3c0d1b0a85b6",
  measurementId: "G-LNFRXRCP09"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
