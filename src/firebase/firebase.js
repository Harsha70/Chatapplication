import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'; 


firebase.initializeApp({
    apiKey: "AIzaSyAuz1kPMqHGBPQBjRfa1GXEvV8K0tqUoN4",
    authDomain: "chatapp-bb353.firebaseapp.com",
    projectId: "chatapp-bb353",
    storageBucket: "chatapp-bb353.appspot.com",
    messagingSenderId: "808444141871",
    appId: "1:808444141871:web:952b35292b359fa36001da"
})

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const projectStorage = firebase.storage()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default firebase