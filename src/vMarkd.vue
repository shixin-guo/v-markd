<template>
    <div id="v-markd">
        <div>test</div>
        <slot>
            <div>
                 <textarea :value="content" @input="update"></textarea>
            </div>
        </slot>
        <slot>
            <div>
                <div v-html="compiledMarkdown"></div>
            </div>
        </slot>
    </div>
</template>
<script>
    import markdownIt from 'markdown-it';
    import _ from 'lodash';

    let md = new markdownIt();

    export default{
        data(){
            return{
                greeting:"# markdown demo",
                content:"",
            }
        },
        props:{

        },
        computed:{
            compiledMarkdown:function(){
                return md.render(this.data);
            }
        },
        methods:{
            update:_.debounce(function(e){
                this.input = e.target.value
            },300)
        }


    }

</script>
<style>


</style>
