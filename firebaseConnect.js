
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY8Bm1o3YVCZy4upJyb70PjJxLKK-rH4s",
  authDomain: "planner-4c7b3.firebaseapp.com",
  projectId: "planner-4c7b3",
  storageBucket: "planner-4c7b3.appspot.com",
  messagingSenderId: "910402416554",
  appId: "1:910402416554:web:d64cf147d8a332b05105d3",
  measurementId: "G-41C5QTSTVF"
};


const app = initializeApp(firebaseConfig);
export default app
