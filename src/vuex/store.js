import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入firebase 以及配置文件
import firebase from "firebase"
import {
    firebaseConfig
} from "../config/firebase.configs"
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const state = {
    notes: [],
    activeNote: []
}
const mutations= {
    showActive(state,key){
        activeNote.title = db.ref().child(key).title;
        activeNote.content = db.ref().child(key).content;
    },
    update(state,e) {
        let that = this;
        setTimeout(function (e) {
            if (that.title != "" && that.content !== "") {
                let newArticle = {
                    title: that.title,
                    content: that.content,
                };
                db.ref().update(newArticle);
            }
        }, 500)
    },
    
},
const actions= {
    get_note(state) {
        db.ref().once('value').then(function (snapshot) {
            state.note = snapshot;
        })
        getMD: function () {
            var that = this
            firebase.database().ref("articles/" + that.title).once("value").then(function (value) {
                var titles = value.val().title;
                that.titles = titles;
                var string = value.val().content;
                function TransferString(content) {
                    var string = content;
                    try {
                        string = string.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');//替换所有的回车换行  
                    } catch (e) {
                        alert(e.message);
                    }
                    return string;
                }
                that.content = TransferString(string);
            });
        },
    },
    add_note(state, title) {
        const newNote = {
            title,
            content: ""
        }
        let key = db.ref().push().key;
        db.ref().child(key).update(newNote);

    },
    edit_note(state,key,content) {
        db.ref().child(key).update()
        state.activeNote.content = content;
    },
    delete_note(state) {
        state.note.$remove(state.activeNote);
        state.activeNote = state.note[0];
    }
}
export default new Vuex.Store({
    state,
    mutations,
    action
})