import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import state from "./state"
import mutations from "./mutations"
// 引入firebase 以及配置文件
import * as demo from "../assets/demo.html" 
Vue.use(Vuex)

// 提取保存的文本，并去掉\n
function TransferString(content) {
    try {
        string = content.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');//替换所有的回车换行  
    } catch (e) {
        alert(e.message);
    }
    return string;
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})