import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入firebase 以及配置文件
import firebase from "firebase"
import { firebaseConfig } from "../config/firebase.configs"
firebase.initializeApp(firebaseConfig);
const state = {
    note: [],
    activeNote: []

}

const mutations = {

}
const actions = {
    get_note (state) {
        firebase.database().ref().once('value').then(function(snapshot){
            state.note = snapshot;
        })
        console.log('snapshot',snapshot);
    },
    add_note (state) {
        const newNote = {
            title: "new markdown",
            content : ""
        }
        state.note.push(newNote);
        state.activeNote = newNote;
    },
    edit_note (state, content) {
        state.activeNote.content = content;
    },
    delete_note (state){
        state.note.$remove(state.activeNote);
        state.activeNote = state.note[0];
    }
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})