// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWtMlMD9FBV48Iwsu0F4lGIrHZJH6Hnxg",
  authDomain: "my-otp-project-33be0.firebaseapp.com",
  projectId: "my-otp-project-33be0",
  storageBucket: "my-otp-project-33be0.firebasestorage.app",
  messagingSenderId: "853002131176",
  appId: "1:853002131176:web:7eeb513f6ff3cc43f59b5d",
  measurementId: "G-GWH1VKFZEN"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);