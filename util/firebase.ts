import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "blog-forge-sailor",
  storageBucket: "blog-forge-sailor.appspot.com",
  messagingSenderId: "251527450097",
  appId: "1:251527450097:web:3eb0d4b4e2d2784b9bc850",
  measurementId: "G-PWHLYQ07HS"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);