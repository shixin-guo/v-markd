import {db} from "./../config/firebase.configs"

// 函数去抖
function debounce(method, deply = 1000,content){
    let timer 
    console.log(1)
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function(){
            method.call(content);
        },deply);
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
        // if(title){
            // let method = function(){
                db.ref("lists/" + state.activeNote.index).remove();
                state.activeNote.title = title;
                db.ref("lists/" + state.activeNote.index).update(state.activeNote)
            // }
            // debounce(method)
            
        // }
    },
    getActive(state,index) {
        state.activeNote.title = db.ref('lists/' + index).val().title;
        state.activeNote.content = db.ref('lists/' + index).val().content;
    },
    getList(state) {
        db.ref("lists").once('value').then(function (snapshot) {
            state.lists =[];
            for (let index in snapshot.val()){
                state.lists.push(snapshot.val()[index].title)
            }
        })
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
export default mutations; 