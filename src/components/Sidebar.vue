<template>
    <div id="sidebar">
        <ul>
            <!--<li v-for="title in titles"></li>-->
        </ul>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default{
    name: "sidebar",
    computed:{
        ...mapActions([

        ])
    }
}

</script>
<style lang="less">
#sidebar {
    flex: 0.5;
    ul {
        li {
            padding: 10px 15px;
            background-color: #f6f6f6;
            border: 1px solid rgba(0, 0, 0, 0);
        }
    }
}
</style>