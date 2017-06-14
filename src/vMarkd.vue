<template>
    <div id="app" :style = "{height : this.clientHeight}">
        <toolbar id="toolbar"></toolbar>
        <editor :style = "{height: editorHeight }"></editor>
        <sidebar></sidebar>
    </div>
</template>
<script>
// 引入组件
import toolbar from './components/Toolbar.vue'
import editor from './components/Editor.vue'
import sidebar from './components/Sidebar.vue'

export default {
    name: "v-markd",
    data: function(){
        return {
            clientHeight: ( window.innerHeight  ) + "px" ,
            editorHeight: ""
        }
    },
    components: {
        toolbar,
        editor,
        sidebar
    },
    mounted: function() {
        this.editorHeight = (window.innerHeight - document.getElementById("toolbar").clientHeight) + "px"
        console.log(document.getElementById("toolbar").clientHeight);
        console.log(window.innerHeight)
    }
}

</script>
<style lang="less">
*{
     font-family: "PT Sans", "Source Sans Pro", sans-serif;
     margin: 0;
     padding: 0;
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
</style>
