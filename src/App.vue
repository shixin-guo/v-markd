<template>
  <div id="app">
   
    <v-markd></v-markd>
  </div>
</template>

<script>
import vMarkd from './vMarkd.vue';
export default {
  name: 'App',
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
