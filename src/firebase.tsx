
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrjJ-hFdckpMgva48dltw6O2hIB6N_qd8",
  authDomain: "image-uploader-49f6a.firebaseapp.com",
  projectId: "image-uploader-49f6a",
  storageBucket: "image-uploader-49f6a.appspot.com",
  messagingSenderId: "1038040727444",
  appId: "1:1038040727444:web:6de347ea015bd4f55e5981"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
