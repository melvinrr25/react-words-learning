import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import {
  query,
  where,
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDfJJr2UB182uKivKdgAlJDBkt5rY0IyiY',
  authDomain: 'languapp-dev.firebaseapp.com',
  projectId: 'languapp-dev',
  storageBucket: 'languapp-dev.appspot.com',
  messagingSenderId: '771824763836',
  appId: '1:771824763836:web:d73ea06f23bf6b199721b9',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

export {
  provider,
  auth,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  db,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
};
