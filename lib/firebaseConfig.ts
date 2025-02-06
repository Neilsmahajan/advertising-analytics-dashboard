import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyA4fUKkbM30dfW8GO2bpnVwXF9eW6rwguk",
  authDomain: "advertisinganalytics-dashboard.firebaseapp.com",
  projectId: "advertisinganalytics-dashboard",
  storageBucket: "advertisinganalytics-dashboard.firebasestorage.app",
  messagingSenderId: "916864921245",
  appId: "1:916864921245:web:96724a6925467b4c3b6e74",
  measurementId: "G-DLCQT4MNFR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

const auth = getAuth(app);
const db = getFirestore(app);

export { analytics, auth, db };
