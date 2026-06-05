// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

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

// Inicialize o Firestore e obtenha uma referência para ele
const db = getFirestore(app);

// Se você estiver usando módulos, pode exportar 'db' para usá-lo em outros arquivos
export { db };
