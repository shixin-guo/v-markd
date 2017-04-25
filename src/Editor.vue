<template>
    <div id="editor">
        <!--markdown编辑部分-->
        <textarea id="editorContent" :value="content" @input="update" v-show="showEditorView" v-model="content">
        </textarea>
        <!--预览-->
        <div id="preview" v-html="compiledMarkdown"></div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import markdownIt from 'markdown-it'
import hljs from "highlight.js"
hljs.initHighlightingOnLoad()

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
})
import "./assets/atom-one-light.css"

export default {
    name : "editor",
    data(){
        return{
            title: get_note()[0].title;
            content : get_note[0].content;
        }
    } 
    methods: {
        ...mapMutations([
            'get_note',
            'edit_note'
        ])
    }
        computed: {
            compiledMarkdown: function () {
                return md.render(this.content);
        },
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
        
    }
}
</script>
<style lang="less">
// editor
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
/*左边的编辑栏*/
#editorContent {
    flex: 1;
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
}
</style>