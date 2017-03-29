<template>
  <div id="app">
   
    <v-markd showEditorView='false'></v-markd>
  </div>
</template>

<script>
import vmarkd from './vMarkd.vue';
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    "v-markd": vmarkd,
  },
  
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
</style>
