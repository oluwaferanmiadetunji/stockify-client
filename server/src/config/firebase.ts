import admin from 'firebase-admin'
import { initializeApp } from 'firebase/app'
import * as serviceAccount from './symmetrical-chainsaw-firebase-adminsdk-1f1mq-893c76d9e7.json'
import config from './index'
export const app = initializeApp(config.firebaseConfig)

const FBServiceAccount: any = serviceAccount

admin.initializeApp({
  credential: admin.credential.cert(FBServiceAccount),
})

export default admin
