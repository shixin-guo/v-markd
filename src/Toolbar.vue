<template>
    <div>
        <div id="toolbar">
            <a href="javascript:;" class="fileButton">选择本地文件<input type="file" class=""></a>
            <input type="text" placeholder="新文章标题">
            <input type="button" value="创建新文章" id="creatButton" @click="add_note">
            <input type="button" value="显示旧文章" @click="!showSidebar">
        </div>
    </div>
</template>
<script>
export default{
    name: 'sidebar',
    data(){
        return {
            showsidebar:true,
            
        }
    } 
}   

</script>
<style lang="less">
#toolbar {
    width: 100%;
    height: 50px;
    overflow: auto;
    .fileButton {
        position: relative;
        display: inline-block;
        overflow: hidden;
        text-decoration: none;
        text-indent: 0;
        input {
            position: absolute;
            right: 0;
            top: 0;
            opacity: 0;
        }
    }
    .fileButton:hover {
        text-decoration: none;
    }
}
</style>