import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWgVYzky1WR-Sa-BcQL1HfjGYikbTfSfM",
  authDomain: "dailytask-b0349.firebaseapp.com",
  projectId: "dailytask-b0349",
  storageBucket: "dailytask-b0349.appspot.com",
  messagingSenderId: "688369618893",
  appId: "1:688369618893:web:2eef50e7a19a92c995fe84",
  measurementId: "G-V1HZBZTBZ5",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
