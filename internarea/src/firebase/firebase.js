// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoplsm_N73nv3M08fdH0yzrEY_nBL7lew",
  authDomain: "internarea-94c4b.firebaseapp.com",
  projectId: "internarea-94c4b",
  storageBucket: "internarea-94c4b.firebasestorage.app",
  messagingSenderId: "810034586520",
  appId: "1:810034586520:web:b9aeafc6908130837981ed",
  measurementId: "G-GHYM8YBLMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
