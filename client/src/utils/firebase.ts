import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'symmetrical-chainsaw.firebaseapp.com',
  projectId: 'symmetrical-chainsaw',
  storageBucket: 'symmetrical-chainsaw.appspot.com',
  messagingSenderId: '774904697369',
  appId: '1:774904697369:web:d994cbc16524662a7f5088',
  measurementId: 'G-6NYEE9Q61T',
})

// Initialize Firebase
export const auth = app.auth()
export const db = firebase.firestore()
export const storageRef = app.storage().ref()
export default firebase
