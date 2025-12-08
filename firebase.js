import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGqxrkLB5mqXeii-A4LthWYaBo1y15684",
  authDomain: "pbp-mahasiswaapp.firebaseapp.com",
  projectId: "pbp-mahasiswaapp",
  storageBucket: "pbp-mahasiswaapp.firebasestorage.app",
  messagingSenderId: "901915801268",
  appId: "1:901915801268:web:de67590cf9752a6d46c9e1",
  measurementId: "G-DMMMKFM2ZZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);