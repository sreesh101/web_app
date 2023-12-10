import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCJQSi9KnXvkmiZ-NPfxJjyUahP633aBpY",
  authDomain: "web-app-final-260b0.firebaseapp.com",
  projectId: "web-app-final-260b0",
  storageBucket: "web-app-final-260b0.appspot.com",
  messagingSenderId: "116874553565",
  appId: "1:116874553565:web:41531b0c19696f33e7d334"};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { 
  db,
  auth 
}
