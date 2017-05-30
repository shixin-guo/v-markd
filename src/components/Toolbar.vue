<template>
    <div id="toolbar">
        <input type="text" placeholder="写下标题" class="title" 
            @input = "updateTitle"
            v-model = "activeNote.title"
            :value = "activeNote.title">
        </input>
        <div>
            <img class = "addNote" src = "../assets/addNote.png" 
            @click = "addNote">
        </div>
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
    height: 5%;
    overflow: hidden;
    input,.title{
        float: left;
        background: none;
        border: none;
        padding: 0;
        font-size: 28px;
        line-height: 2;
        padding-left: 40px;
        outline: none;
    }
    .addNote{
        float: right;
        margin-right: 20px;
        margin-top: 5px;
    }
}
</style>