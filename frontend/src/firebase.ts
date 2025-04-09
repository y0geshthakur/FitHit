// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDXwnnkGzvetWX9s368HMFOFX2wX7kyA8",
  authDomain: "fitbit-ef69d.firebaseapp.com",
  projectId: "fitbit-ef69d",
  storageBucket: "fitbit-ef69d.firebasestorage.app",
  messagingSenderId: "71339500138",
  appId: "1:71339500138:web:64770d04eae264c666e013",
  measurementId: "G-C6E5GYZ1TR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
