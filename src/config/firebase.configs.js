import firebase from "firebase"
import demo from "../assets/demo.html"
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
// 配置数据库
const db = firebase.database();
// 初始化数据
let initdate = {content : demo,title : 'markdown 介绍', index : "0"}
db.ref("demo").update(
  initdate
)
let list = 
db.ref('lists/'+ '0').set(
  initdate
)

// 配置文件资源存储
const storage = firebase.storage();


export{ db , storage}
