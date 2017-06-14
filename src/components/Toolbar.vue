<template>
    <div id="toolbar">
         <div>
            <img class = "list" src = "../assets/list.png" 
            @click = "getList">
            <img class = "addNote" src = "../assets/addNote.png" 
            @click = "addNote">
        </div>
        <input type="text" placeholder="写下标题" class="title" 
            @input = "updateTitle"
            v-model = "activeNote.title"
            :value = "activeNote.title">
        </input>
       
    </div>
</template>
<script>
import { mapActions ,mapMutations ,mapState} from 'vuex'
export default{
    name: 'sidebar',
    data(){
       
        return {
            showsidebar:true,
        }
    },
    methods:{
         ...mapState([
            'list', 
            'activeNote'
        ]),
        ...mapMutations([
            'updateTitle',
            'addNote',
            'getList',
            'delateNote'
        ])
    } 
}   
</script>
<style lang="less">
#toolbar {
    background-color: #f8f8f8;
    width: 100%;
    height: 50px;
    overflow: hidden;
    input,.title{
        position: absolute;
        left: 50%;
        background: none;
        border: none;
        padding: 0;
        font-size: 28px;
        line-height: 2;
        padding-left: 40px;
        outline: none;
    }
    .addNote, .list{
        float: left;
        margin-left: 20px;
        margin-top: 5px;
    }
}
</style>