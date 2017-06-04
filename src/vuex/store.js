import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
// 引入firebase 以及配置文件
import { db } from "../config/firebase.configs"
import * as demo from "../assets/demo.html" 

Vue.use(Vuex)

// 函数去抖
function debounce(method, deply = 1000){
    let timer 
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function(){
            method.call(content);
        },deply);
    }
}

// 提取保存的文本，并去掉\n
function TransferString(content) {
    try {
        string = content.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');//替换所有的回车换行  
    } catch (e) {
        alert(e.message);
    }
    return string;
}
const state = {
    lists:[],
    activeNote: {
        index: "" || 0,
        title: "",
        content: ""
    }
}
const mutations= {
    updateContent(state,e) {
        if(!state.activeNote.title){
            state.activeNote.content = e.target.value;
            // 当标题未填写时 设置为前20个字            
            state.activeNote.title = state.activeNote.content.substr(0,20).replace(/\n/g,"")
        }
        // const method = function(){
            let newArticle = {
                title: state.activeNote.title ,
                content: state.activeNote.content,
            };
            db.ref('lists/' + state.activeNote.index).update(newArticle);
        // }
        // debounce(method);
    },
    updateTitle(state, e) {
        let title = e.target.value
        if(title){
            // const method = function(){
                db.ref("lists/" + state.activeNote.index).remove();
                state.activeNote.title = title;
                db.ref("lists/" + state.activeNote.index).update(state.activeNote)
            // }
            // debounce(method)
            
        }
        // console.log(title)
    },
    getActive(state,index) {
        state.activeNote.title = db.ref('lists/' + index).val().title;
        state.activeNote.content = db.ref('lists/' + index).val().content;
    },
    getList(state) {
        db.ref("list").once('value').then(function (snapshot) {
            state.list = snapshot.val();
        })
        // console.log(state.list)
    },
    addNote(state) {
        db.ref("lists").once('value').then(function (snapshot) {
                let num_note = snapshot.val().length; 
                state.activeNote = {title: "不给笔记起个好听的名字吗",content: "yyuyu",index:num_note};
                db.ref("lists/" + num_note).set(state.activeNote)
        })
    },
    editNote(state,title) {
       state.activeNote = {title: db.ref('post/'+ title).val().title, content:db.ref('post/' + title).val().content};
    },
    deleteNote(state) {
        db.ref('post/'+title).remove();
        let index = state.lists.indexOf(title);
        let nexttitle;
        if(index < state.lists.length){
            nexttitle = state.lists[index+1]
        } else {
            nexttitle = state.lists[0]
        }
        state.activeNote = {
            title: nexttitle,
            content: db.ref('post/' + title).val().content
        }
    }
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})