<template>
    <div id="app">
        <!--上面的tools-->
        <toolbar></toolbar>
        
        <!--编辑器部分-->
        <editor></editor>
      
    </div>
</template>

<script>

import hello from './assets/hello.html'
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
import { firebaseConfig } from "./config/firebase.configs"
firebase.initializeApp(firebaseConfig);

// 引入组件
import toolbar from './Toolbar.vue';
import editor from './Editor.vue'

export default {
    name: "v-markd",
    components: {
        toolbar,
        editor,
    },
    data() {
        return {
            content: hello,
            title: ""||"未命名",
            titles:""
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
                        title: that.title,
                        content: that.content,
                    };
                    firebase.database().ref("articles/" + that.title).update(newArticle);
                }
            }, 500)
        },
        // 增删改查

        // 创建md firebase自动保存
        creatMD: function () {
            let that = this;
            function creatnew() {
                that.content = "";
                firebase.database().ref("articles/").push({
                    title: that.title,
                    

                });
            }
            setTimeout(creatnew, 500);
        },
        saveMD: function () {
        },
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
        putMD: function(){

        }
        
    }
}

</script>
<style lang="less">
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



// 侧边栏
#sidebar {
    flex: 0.5;
    ul {
        li {
            padding: 10px 15px;
            background-color: #f6f6f6;
            border: 1px solid rgba(0, 0, 0, 0);
        }
    }
}
</style>
