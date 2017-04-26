<template>
    <div id="app">
        <toolbar></toolbar>
        <editor></editor>
        <sidebar></sidebar>
    </div>
</template>
<script>
// 引入组件
import toolbar from './Toolbar.vue'
import editor from './Editor.vue'
import sidebar from './Sidebar.vue'

export default {
    name: "v-markd",
    components: {
        toolbar,
        editor,
    },
    data() {
        return {

        }
    },
    props: {
    },

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
</style>
