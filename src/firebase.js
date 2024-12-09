// Import potrebných funkcií z Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Konfigurácia tvojej Firebase aplikácie
const firebaseConfig = {
    apiKey: "AIzaSyDmk2dYXB6G_d2neV0cCW3R6T-mh6teQ1E",
    authDomain: "emma-72441.firebaseapp.com",
    databaseURL: "https://emma-72441-default-rtdb.firebaseio.com", // Pridaj tento riadok
    projectId: "emma-72441",
    storageBucket: "emma-72441.appspot.com", // Opravená hodnota
    messagingSenderId: "781917609790",
    appId: "1:781917609790:web:7d70562a1dd17bd5ed566f",
    measurementId: "G-0Z6ND6D8VT"
};

// Inicializácia Firebase aplikácie
const app = initializeApp(firebaseConfig);

// Inicializácia Realtime Database
export const database = getDatabase(app);