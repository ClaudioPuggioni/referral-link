// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCxQhGXtKKqMJ7ajgcekPAnszPr08pMNQ",
  authDomain: "referral-link-2f5f0.firebaseapp.com",
  projectId: "referral-link-2f5f0",
  storageBucket: "referral-link-2f5f0.appspot.com",
  messagingSenderId: "1017119413258",
  appId: "1:1017119413258:web:bbdadc658e37a4a3eb7bf3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
