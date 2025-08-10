// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7ZcKcaPCgdy8X9Pq22isu0jcdAKGbQNA",
  authDomain: "netflixgpt-9587c.firebaseapp.com",
  projectId: "netflixgpt-9587c",
  storageBucket: "netflixgpt-9587c.firebasestorage.app",
  messagingSenderId: "984271175222",
  appId: "1:984271175222:web:6f5c99dff0f02edc3d2297",
  measurementId: "G-G5NFQ48E2F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);

export const auth = getAuth();
