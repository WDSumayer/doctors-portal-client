// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZxd0PvB24X-kXoa3ii7jumwYJf5VtUh0",
  authDomain: "doctors-portal-b13a8.firebaseapp.com",
  projectId: "doctors-portal-b13a8",
  storageBucket: "doctors-portal-b13a8.appspot.com",
  messagingSenderId: "596868606315",
  appId: "1:596868606315:web:85fbc3af0bd0daceec842e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;