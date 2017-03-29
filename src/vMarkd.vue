<template>
    <div id="editor">
    
        <textarea :value="content"
                  @input="update"
                  v-show="showEditorView"></textarea>
    
        <div v-html="compiledMarkdown"
             :class="{}"></div>
    
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
export default {
    name: "v-markd",
    data() {
        return {
            content: hello,
        }
    },
    props: {
        // false表示只有转义过的内容，不显示源文本
        "showEditorView": {
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
    
}

</style>
