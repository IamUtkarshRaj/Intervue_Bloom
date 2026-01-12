// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSqzFZfxDBt5_MQ_LrSQ8THIo_1557EpI",
  authDomain: "intervue-bloom.firebaseapp.com",
  projectId: "intervue-bloom",
  storageBucket: "intervue-bloom.firebasestorage.app",
  messagingSenderId: "929173483616",
  appId: "1:929173483616:web:b7c8a048265a0873311305",
  measurementId: "G-CZJ57T7GCR"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { auth };