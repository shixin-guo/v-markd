<template>
  <div id="app">
   
    <v-markd :showEditorView="true"></v-markd>
  </div>
</template>

<script>
import vMarkd from './vMarkd.vue';
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    "v-markd": vMarkd,
  },
  
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
</style>
