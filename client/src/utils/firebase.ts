// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage, ref } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyDmbaFUPBZZ-nIWlSW2uHWh3DGcghj_NSg',
  authDomain: 'symmetrical-chainsaw.firebaseapp.com',
  projectId: 'symmetrical-chainsaw',
  storageBucket: 'symmetrical-chainsaw.appspot.com',
  messagingSenderId: '774904697369',
  appId: '1:774904697369:web:d994cbc16524662a7f5088',
  measurementId: 'G-6NYEE9Q61T',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)

export const storage = getStorage(app)
export const storageRef = ref(storage)

