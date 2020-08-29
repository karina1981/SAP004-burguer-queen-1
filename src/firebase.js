import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCYkfRXcJ9XectolmE7HOOCyG5Mij6o20g',
  authDomain: 'burguer-queen-26760.firebaseapp.com',
  databaseURL: 'https://burguer-queen-26760.firebaseio.com',
  projectId: 'burguer-queen-26760',
  storageBucket: 'burguer-queen-26760.appspot.com',
  messagingSenderId: '332591769',
  appId: '1:332591769:web:a8f4e8b0544398e3a0be08',
  measurementId: 'G-PR85BF96HT',
}

firebase.initializeApp(firebaseConfig)
export default firebase
