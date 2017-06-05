<template>
<div id="containor">
    <div id = "hoverdiv" ></div>
    <div id="editor">
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
        <div id= "lists" v-show = "this.showLists" >
            <ul>
                <li v-for = "item in lists">{{item}}</li>
            </ul>
        </div>
    </div>
</div>
    
</template>
<script>
import { mapActions ,mapMutations ,mapState} from 'vuex'
import { md as mdrender } from './../config/markdown-it.configs'
import {myfirebase} from './../config/firebase.configs'
import firebase from "firebase"
export default {
    name: "editor",
    data: function(){
        return {
            showLists : 1
        }
    },

    computed: {
        ...mapState([
            'lists',
            'activeNote'
        ]),
        compiledMarkdown: function () {
            return mdrender.render(this.activeNote.content);
        }
    },
    methods: {      
        ...mapMutations([
            'updateTitle',
            'updateContent',
            'getActive'
        ]),
    },
    mounted: function(){
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
<style lang="less">
#containor{
        width: 100%;
        height: 100%;
        // editor
        #editor {
            margin: 0;
            height: 97%;
            color: #333;
            font-family: "PT Sans", "Source Sans Pro", sans-serif;
            display: flex;
            width: 100%;
        }
        @placeholderColor: #2dbe60;
        *::-webkit-input-placeholder {
            color: @placeholderColor;
        }
        *:-moz-placeholder {    
            color: @placeholderColor;
        }
        *:-ms-input-placeholder {
            /* IE10+ */
            color: @placeholderColor;
        }
        /*左边的编辑栏*/
        #note{
            flex: 1;  
            #editorContent {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                border: none;
                border-right: 1px solid #ccc;
                resize: none;
                outline: none;
                padding: 20px;
                font-size: 16px;
                font-family: "PT Sans", sans-serif;
                line-height: 1.65;
                letter-spacing: normal;
                border-radius: 0;
                color: #5a5a5a;
                -webkit-box-shadow: none;
                box-shadow: none;
                resize: none;
                border: none;
                background-color: #fcfcfc;
            
            }
        }
        /*右边的显示栏*/
        #preview {
            display: inline-block;
            flex: 1;
            /*width: 50%;*/
            height: 100%;
            vertical-align: top;
            box-sizing: border-box;
            padding: 0 20px;
            background-color: #f6f6f6;
            overflow: scroll;
            img{
                display: inherit;
                margin: 0 auto;
            }
            p { word-wrap:break-word; }
        }
        ul{
            margin:0;
            padding:0;
            border:0;
        }
        #lists{
            li{
                width: 10rem;
                color: #3f3f3f;
                list-style-type:none;
                height: 3rem;
                border-bottom: 2px solid #d9d9d9;
                line-height: 3.2;
                padding-left: 30px;
                padding-right: 30px; 
                white-space:nowrap;
                overflow: hidden;
                text-overflow:ellipsis; 
            }
            li:hover{
                background:rgba(134, 127, 127, 0.22);
                color:#2dbe60;
            }
            transition: width 1s ease-in-out;
        #hoverdiv{
            height: 100%;
            z-index: 100;
            position: absolute;
        }  
    }
}
</style>