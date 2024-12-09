// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmk2dYXB6G_d2neV0cCW3R6T-mh6teQ1E",
    authDomain: "emma-72441.firebaseapp.com",
    projectId: "emma-72441",
    storageBucket: "emma-72441.firebasestorage.app",
    messagingSenderId: "781917609790",
    appId: "1:781917609790:web:7d70562a1dd17bd5ed566f",
    measurementId: "G-0Z6ND6D8VT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAnalytics(app);