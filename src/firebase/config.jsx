import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDZplG1AeNVwMutFuVbjldH9rIjubI5w4c',
  authDomain: 'myblog-af2cf.firebaseapp.com',
  projectId: 'myblog-af2cf',
  storageBucket: 'myblog-af2cf.appspot.com',
  messagingSenderId: '418404824758',
  appId: '1:418404824758:web:df26f8d2ced6aa31001817'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }
