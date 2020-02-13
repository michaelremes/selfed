import * as firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB4f_aHAQT1_KCDKfEqQ09f-SNh-RoaTIA",
    authDomain: "selfed-8b243.firebaseapp.com",
    databaseURL: "https://selfed-8b243.firebaseio.com",
    projectId: "selfed-8b243",
    storageBucket: "selfed-8b243.appspot.com",
    messagingSenderId: "1044172455927",
    appId: "1:1044172455927:web:34a6f74c5434e24ce538f2"
};

firebase.initializeApp(firebaseConfig);

export default firebaseConfig;