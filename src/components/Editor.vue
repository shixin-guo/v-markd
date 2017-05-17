<template>
    <div id="editor">
        <!--markdown编辑部分-->
        <div id="note">
            <input type="text" placeholder="写下标题" class="title" 
                @input = "(e) => {setTimeout(updateTitle(e),1000)}"
                :value = "activeNote.title">
            </input>        
            <textarea id="editorContent" 
                :value="activeNote.content" 
                v-model="activeNote.content" 
                @input="updateContent">
            </textarea>
        </div>
        <!--预览-->
        <div id="preview" v-html="compiledMarkdown"></div>
    </div>
</template>
<script>
import { mapActions ,mapMutations ,mapState} from 'vuex'
import { md as mdrender } from './../config/markdown-it.configs'
export default {
    name: "editor",
    computed: {
        ...mapState([
            'note',
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
    .title{
        background: none;
        border: none;
        padding: 0;
        font-size: 28px;
        line-height: 2;
        padding-left: 40px;
        outline: none;
    }
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
}
</style>