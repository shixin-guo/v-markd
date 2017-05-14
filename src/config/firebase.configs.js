import firebase from "firebase"

// Initialize Firebase
let firebaseConfig = {
  apiKey: "AIzaSyDxnfFujjZQb4dvOVvV8pEBMXPPgXkCyJE",
  authDomain: "vmarkd-f3466.firebaseapp.com",
  databaseURL: "https://vmarkd-f3466.firebaseio.com",
  projectId: "vmarkd-f3466",
  storageBucket: "vmarkd-f3466.appspot.com",
  messagingSenderId: "669362537174"
};
// 引入firebase 以及配置文件
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
export{ db }