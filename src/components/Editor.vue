<template>
    <div id="containor" @click = "ifShowLists($event)">
        <div id = "hoverdiv" ></div>
        <div id="editor">
            <!--目录-->
            <div id= "lists" v-show = this.showLists @click="closeLists" >
                <ul>
                    <li v-for ="item in lists">
                        {{item}}
                    </li>
                </ul>
            </div>

            <!--markdown编辑部分-->
            <div id = "note">
                <textarea id="editorContent" 
                    :value="activeNote.content" 
                    v-model="activeNote.content" 
                    @input="updateContent">
                </textarea>
            </div>

            <!--预览-->
            <div id="preview" v-html="compiledMarkdown"></div>
            
        </div>
    </div>
</template>
<script>
import {mapActions ,mapMutations ,mapState} from 'vuex'
import mdrender from './../config/markdown-it.configs'
import {myfirebase} from './../config/firebase.configs'
import firebase from "firebase"
import './editor.less'

export default {
    name: "editor",
    data: function() {
        return {
            showLists : false,
        }
    },
    computed: {
        ...mapState([
            'lists',
            'activeNote'
        ]),
        compiledMarkdown: function () {
            return mdrender.render(this.activeNote.content);
        },      
    },
    methods: {      
        ...mapMutations([
            'updateTitle',
            'updateContent',
            'getActive'
        ]),
        ifShowLists: function(event){
            console.log(0)
            if(event.id == lists){
                this.showLists = true;
            } else {
                this.showLists = false;
            }
        },
        closeLists: function() {
            this.showLists = !this.showLists;
        }
    },
    mounted: function() {
        function insertAtCursor(myField, myValue) {
            //IE support
            if (document.selection) 
            {
                myField.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                sel.select();
            }
            //MOZILLA/NETSCAPE support
            else if (myField.selectionStart || myField.selectionStart == '0') 
            {
                console.log(1)
                let startPos = myField.selectionStart;
                let endPos = myField.selectionEnd;
                // save scrollTop before insert
                let restoreTop = myField.scrollTop;
                myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
                if (restoreTop > 0)
                {
                    // restore previous scrollTop
                    myField.scrollTop = restoreTop;
                }
                myField.focus();
                myField.selectionStart = startPos + myValue.length;
                myField.selectionEnd = startPos + myValue.length;
            } else {
                console.log(myField)
                myField.value += myValue;
                myField.focus();
            }
        }
        let textarea = document.getElementById("editorContent");  
        textarea.addEventListener('paste', function(e){
            // 阻止默认行为
            window.event? window.event.returnValue = false : e.preventDefault();
            let clipboard = e.clipboardData;
            // 有无内容
            if(!clipboard.items || !clipboard.items.length){
                clear();
                return;
            }
            let temp;
            if((temp = clipboard.items[0]) && temp.kind === 'file' && temp.type.indexOf('image') === 0){
                // 获取图片文件
                let imgFile = temp.getAsFile();
                // 上传firebase
                let timestamp = new Date().getTime();
                let storageRef = myfirebase.storage().ref('images/' + timestamp)
                let uploadTask = storageRef.put(imgFile);
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot){
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes)* 100;
                    console.log('Upload is ' + progress + '% done')
                    switch (snapshot.state){
                        case firebase.storage.TaskState.PAUSED:
                            console.log("Upload is pause");
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log("Upload is running");
                            break;
                    }
                }, function(error){
                    // error handle
                    switch (error.code) {
                        case 'storage/unauthorized':
                            console.log("未开启此项目对storage的firebase权限");
                            break;
                        case 'storage/conceled':
                            console.log(" 您已经取消此次上传");
                            break;
                        case 'storge/unknown':
                            console.log("未知错误");
                            break;
                    }
                }, function(){
                    // success
                    console.log("上传成功")
                    // 获取链接
                    let downloadURL = uploadTask.snapshot.downloadURL;
                    console.log(downloadURL);
                    // 格式化markdown图片格式 并添加到光标位置
                    // 在光标位置插入
                    let picURL = "![" + (name || "") + "](" + downloadURL+  ")"
                    insertAtCursor(textarea, picURL)
                })
            } else if(temp = clipboard.getData('text/plain')){
                insertAtCursor(textarea, temp)
            }
        }, false);
    }
}
</script>