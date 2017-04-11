<template>
    <div id="app">
        <div>
            <div id="toolbar">
                <a href="javascript:;"
                   class="fileButton">选择本地文件<input type="file" class=""></a>
                <input type="text"
                       placeholder="新文章标题">
                <input type="button"
                       value="创建新文章"
                       id="creatButton"
                       v-on:click="creatMD">
                <input type="button"
                       value="显示旧文章"
                       v-on:click="showOldMD">
            </div>
        </div>
        <div id="editor">
            <textarea :value="content"
                      @input="update"
                      v-show="showEditorView"
                      v-model="content">
    
            </textarea>
    
            <div v-html="compiledMarkdown"></div>
        </div>
    </div>
</template>

<script>

import hello from './assets/hello.html'
import _ from 'lodash';

import markdownIt from 'markdown-it';
import hljs from "highlight.js"
hljs.initHighlightingOnLoad();

let md = new markdownIt({
    html: true,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'language-',
    linkify: false,
    typographer: false,
    quotes: '“”‘’',
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) { }
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});
import "./assets/atom-one-light.css"

// 引入firebase 以及配置文件
import firebase from "firebase"
import { firebaseConfig } from "./configs"
firebase.initializeApp(firebaseConfig);

export default {
    name: "v-markd",
    data() {
        return {
            content: hello,
            title: 12,
        }
    },
    props: {
        // false表示只有转义过的内容，不显示源文本
        showEditorView: {
            type: Boolean,
            default: 'true',
        }
    },
    computed: {
        compiledMarkdown: function () {
            return md.render(this.content);
        }
    },
    methods: {
        update: function (e) {
            let that = this;
            setTimeout(function (e) {
                if (that.title != "" && that.content !== "") {
                    let newArticle = {
                        title: 233,
                        content: that.content,
                    };
                    firebase.database().ref("articles/" + that.title).update(newArticle);
                }
            }, 500)
        },
        creatMD: function () {
            let that = this;
            function creatnew() {
                that.content = "";
                firebase.database().ref("articles/" + that.title).push({
                    title: that.title,
                });
            }
            setTimeout(creatnew, 500);
        },
        saveMD: function () {
        },
        showOldMD: function () {
            let that = this
            firebase.database().ref("articles/" + that.title).once("value").then(function (value) {
                //替换所有的回车换行  
                    let string = JSON.stringify(value.val().content);
                    try {
                        string = string.replace(/\r\n/g, "<BR>")
                        string = string.replace(/\n/g, "<BR>");
                          that.content = string;
                    } catch (e) {
                        console.log(e.message);
                    }
                  
                   
            });
        }
    }
}

</script>
<style lang="less">
html,
body,
#editor {
    margin: 0;
    height: 100%;
    color: #333;
    font-family: "PT Sans", "Source Sans Pro", sans-serif;
    display: flex;
    width: 100%;
}




/*右边的显示栏*/

#editor>div {
    display: inline-block;
    flex: 1;
    /*width: 50%;*/
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
    background-color: #f6f6f6;
    overflow: scroll;
}




/*左边的编辑栏*/

textarea {
    flex: 1;
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
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

tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

blockquote {
    border-left-width: 10px;
    background-color: rgba(128, 128, 128, 0.05);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 15px 20px;
}

blockquote:before,
blockquote:after {
    content: "";
}

code {
    background-color: rgba(128, 128, 128, 0.075);
    background-color: transparent;
}

a {
    -webkit-transition: background-color ease-in-out .15s, color ease-in-out .15s, border-color ease-in-out .15s;
    transition: background-color ease-in-out .15s, color ease-in-out .15s, border-color ease-in-out .15s;
    color: #4fa1db;
    text-decoration: none;
    background: transparent;
}

#toolbar {
    width: 100%;
    height: 50px;
    overflow: auto;
    .fileButton {
        position: relative;
        display: inline-block;
        overflow: hidden;
        text-decoration: none;
        text-indent: 0;
        input {
            position: absolute;
            right: 0;
            top: 0;
            opacity: 0;
        }
    }
    .fileButton:hover {
        text-decoration: none;
    }
}
</style>
