// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLyrnpoVjuyPN1CTENcugyAEfMjbxSors",
  authDomain: "salontech-web03.firebaseapp.com",
  projectId: "salontech-web03",
  storageBucket: "salontech-web03.firebasestorage.app",
  messagingSenderId: "558051338399",
  appId: "1:558051338399:web:db190fbc6210541cf9daaa",
  measurementId: "G-1E2MC2M19P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);