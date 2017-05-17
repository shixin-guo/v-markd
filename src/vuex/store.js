import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入firebase 以及配置文件
import { db } from "../config/firebase.configs"
import * as demo from "../assets/demo.html" 
const state = {
    list: {
        return: db.ref("/list").once("value").then(function(snapshot){
           return snapshot.val().list;
        })
    },
    activeNote: {
        title:"",
        content: ""
    }
}
const mutations= {
    updateContent(state,e) {
        if(!state.activeNote.title){
            state.activeNote.content = e.target.value;
            // 当标题未填写时 设置为前20个字            
            state.activeNote.title = state.activeNote.content.substr(0,20).replace(/\n/g,"")
            console.log(state.activeNote.title)
        }
        function debounce(method, context){
            clearTimeout(method.timeout);
            method.timeout = setTimeout(function (e) {
                    let newArticle = {
                        title: state.activeNote.title ,
                        content: state.activeNote.content,
                    };
                    db.ref('posts/' + state.activeNote.title).update(newArticle);
            }, 500)
        }
    },
    updateTitle(state, e) {
        let title = e.target.value
        if(title){
            setTimeout(function (e) {
                db.ref("posts/" + state.activeNote.title).remove();
                state.activeNote.title = title;
                db.ref("posts/" + state.activeNote.title).update(state.activeNote)
            }, 1000)
        }
    },
    getActive(state,title) {
        state.activeNote.title = db.ref('post/' + title).val().title;
        state.activeNote.content = db.ref('post/' + title).val().content;
    },
    
}
const actions= {
    get_note(context) {
        db.ref().once('value').then(function (snapshot) {
            state.note = snapshot;
        })
        const md = function() {
            db.ref("articles/" + title).once("value").then(function (value) {
                function TransferString(content) {
                    try {
                        string = content.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');//替换所有的回车换行  
                    } catch (e) {
                        alert(e.message);
                    }
                    return string;
                }
                let string = value.val().content;
                that.content = TransferString(string);
            });
        }
    },
    add_note(content) {
        const newNote = {
            title,
            content: ""
        }
        let key = db.ref().push().key;
        db.ref().child(key).update(newNote);

    },
    // edit_note(state,key,content) {
    //     db.ref().child(key).update()
    //     state.activeNote.content = content;
    // },
    // delete_note(state) {
    //     state.note.$remove(state.activeNote);
    //     state.activeNote = state.note[0];
    // }
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})