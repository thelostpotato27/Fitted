// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCraVOtmd9xYiy4tQ1ZtvHvNlrxSby-1eQ",
  authDomain: "fitted-16adc.firebaseapp.com",
  projectId: "fitted-16adc",
  storageBucket: "fitted-16adc.firebasestorage.app",
  messagingSenderId: "409654008971",
  appId: "1:409654008971:web:5d43d875b8ac6dc0d1088e",
  measurementId: "G-C16E2NDGVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const imgDB = getStorage(app);
// const txtDB = getFirestore(app);

export default app;