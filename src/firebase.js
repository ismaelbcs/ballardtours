// 1. Las importaciones siempre van HASTA ARRIBA del archivo
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 2. Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAx6qoFqOmunIEgn7YomDdy80Pnquvh6AY",
  authDomain: "ballardtours.firebaseapp.com",
  databaseURL: "https://ballardtours-default-rtdb.firebaseio.com",
  projectId: "ballardtours",
  storageBucket: "ballardtours.firebasestorage.app",
  messagingSenderId: "895636049481",
  appId: "1:895636049481:web:ede542e568698d398af998",
};

// 3. Inicializamos Firebase (Esto te faltaba)
const app = initializeApp(firebaseConfig);

// 4. 👇 ESTA ES LA SOLUCIÓN DEL PASO 2 👇
// Inicializamos la base de datos y la exportamos como 'db'
export const db = getFirestore(app);