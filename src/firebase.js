import firebase from 'firebase/app'
import "firebase/auth";


export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDPlbM20VMSqHpO3fCpEASZkIA2Mz-RXjU",
    authDomain: "unichat-75e73.firebaseapp.com",
    projectId: "unichat-75e73",
    storageBucket: "unichat-75e73.appspot.com",
    messagingSenderId: "450978007736",
    appId: "1:450978007736:web:99bb2d362aafb857df424d"
}).auth();
