// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz5JdcE-qfm7mjMPCvjQ3eiPkbc1q2_vY",
  authDomain: "expense-tracker-b1d25.firebaseapp.com",
  projectId: "expense-tracker-b1d25",
  storageBucket: "expense-tracker-b1d25.appspot.com",
  messagingSenderId: "93015566311",
  appId: "1:93015566311:web:f6f285f42356fe003f7f42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFireStore(app);
