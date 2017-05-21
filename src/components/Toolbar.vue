<template>
    <div id="toolbar">
        <!--<a href="javascript:;" class="fileButton">选择本地文件<input type="file" class=""></a>
        <input type="text" placeholder="新文章标题">
        <input type="button" value="创建新文章" id="creatButton" @click="add_note">
        <input type="button" value="显示旧文章" @click="!showSidebar">-->
        <input type="text" placeholder="写下标题" class="title" 
            @input = "updateTitle"
            :value = "activeNote.title">
        </input>
        <div>
            <img class = "addNote" src = "../assets/addNote.png" 
            @click = "add_note">
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
            'note', 
            'activeNote'
        ]),
        ...mapMutations([
            'updateTitle'
        ]),
        ...mapActions([
            'add_note'
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