import Vue from 'vue'
import App from './App.vue'
// https://highlightjs.org/

// import hljs from './assets/highlight.pack.js';
// hljs.initHighlightingOnLoad();
// console.log(hljs);
Vue.config.devtools = true;

new Vue({
  el: '#app',
  render: h => h(App)
})
