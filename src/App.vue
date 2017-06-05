<template>
  <div id="myapp">
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
#myapp{
  width: 100%;
}
</style>
