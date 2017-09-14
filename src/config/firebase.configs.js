import firebase from 'firebase';
import demo from '../assets/demo.html';
// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyDxnfFujjZQb4dvOVvV8pEBMXPPgXkCyJE',
    authDomain: 'vmarkd-f3466.firebaseapp.com',
    databaseURL: 'https://vmarkd-f3466.firebaseio.com',
    projectId: 'vmarkd-f3466',
    storageBucket: 'vmarkd-f3466.appspot.com',
    messagingSenderId: '669362537174',
};

// 引入firebase 以及配置文件 配置数据库
const myfirebase = firebase.initializeApp(firebaseConfig);
const db = myfirebase.database();

// 初始化数据
const initdate = { content: demo, title: 'markdown 介绍', index: '0' };
db.ref('demo').update(initdate);
// const list = db.ref('lists/'+ '0').set(initdate);

export { db, myfirebase };
