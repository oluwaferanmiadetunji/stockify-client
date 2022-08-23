import dotenv from 'dotenv'

dotenv.config()

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '8000', 10),
  dbUrl: process.env.URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  firebaseConfig: {
    apiKey: 'AIzaSyDmbaFUPBZZ-nIWlSW2uHWh3DGcghj_NSg',
    authDomain: 'symmetrical-chainsaw.firebaseapp.com',
    projectId: 'symmetrical-chainsaw',
    storageBucket: 'symmetrical-chainsaw.appspot.com',
    messagingSenderId: '774904697369',
    appId: '1:774904697369:web:d994cbc16524662a7f5088',
    measurementId: 'G-6NYEE9Q61T',
  },
}
