import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Aquí deberían ir tus credenciales reales de Firebase después
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "tu-app.firebaseapp.com",
  projectId: "tu-app",
  storageBucket: "tu-app.appspot.com",
  messagingSenderId: "123",
  appId: "1:123:web:abc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);