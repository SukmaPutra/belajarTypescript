// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy64Pf5-AAksgiuO0OPXjz2sj8VaYUGkU",
  authDomain: "social-media-app-f9c59.firebaseapp.com",
  projectId: "social-media-app-f9c59",
  storageBucket: "social-media-app-f9c59.firebasestorage.app",
  messagingSenderId: "1022947175362",
  appId: "1:1022947175362:web:1939e34d3d3958ffc8845b",
  measurementId: "G-QEB3MFSLXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);