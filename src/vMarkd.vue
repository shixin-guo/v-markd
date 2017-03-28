<template>
    <div id="editor">
    
        <textarea :value="content"
                  @input="update"></textarea>
    
        <div v-html="compiledMarkdown"
             :class="{}"></div>
    
    </div>
</template>
<script>
import markdownIt from 'markdown-it';
import _ from 'lodash';
// let hljs = require('highlight.js'); // https://highlightjs.org/
import hljs from 'highlight'
let md = new markdownIt({
    html: true,        // Enable HTML tags in source
    xhtmlOut: false,        // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: false,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify: false,        // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) { }
        }

        return ''; // use external default escaping
    }
});



export default {
    data() {
        return {

            content: "## Welcome to use V-markd",
        }
    },
    props: {
        // 只有转义过的内容，不显示源文本
        editorView: {
            type: Boolean,
            default: true,
        }
    },
    computed: {
        compiledMarkdown: function () {
            return md.render(this.content);
        }
    },
    methods: {
        update: _.debounce(function (e) {
            this.content = e.target.value
        }, 300)
    }


}

</script>
<style>
html,
body,
#editor {
    margin: 0;
    height: 100%;
    color: #333;
}

textarea,
#editor div {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
    background-color: #fcfaf2;
}

textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
}

code {
    color: #f66;
}
</style>
