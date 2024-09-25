// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFFW4qZvW7ETt2NaEJeRHPL-tUWhV8vRY",
  authDomain: "crs-cdac-project.firebaseapp.com",
  projectId: "crs-cdac-project",
  storageBucket: "crs-cdac-project.appspot.com",
  messagingSenderId: "912352364015",
  appId: "1:912352364015:web:bb77db71852565cffda21a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;