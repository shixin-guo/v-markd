
<div align="center">
	<big>
		<h1>v-markd</h1>
	</big>
</div>

> a compoment by Vue.js  a markdown editor

target: agile notebook 
## 现存问题：
- firebase 国内被墙 项目过分依赖firebase的数据存储功能
- 考虑移除状态管理方案（vuex）因为目标是提供一个可插拔的组件，而不是一个网站

## Build Setup
- node npm 安装
- git (可选)
- 注册[firebase](https://firebase.google.com/?hl=zh-cn)
- 新建网页项目,复制代码到 src/config/firebase.configs.js 里面就可以使用firebase数据库了, 不需要安装mysql mongo这些繁琐的数据库


``` bash
# download code
git clone git@github.com:gzponline/v-markd.git
cd v-markd

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Thanks  
- [Vue.js](https://cn.vuejs.org/)  
主要基于vue的组件化开发 实现在所有vue工程里面只需要引用v-mark 就可以实现添加编辑器的功能，同时也使用了vue的数据绑定特点，使前端想象力更简洁清晰的表达。
- [vuex](https://vuex.vuejs.org/zh-cn/intro.html)
vuex 是vue的状态管理框架，由于使用vuex是因为单纯使用vue的话data 数据很多，不好管理，同时各个组件同时使用更改数据状态时会使整个开发思路异常纠结，思路不清晰，组件间通信会异常繁琐，vuex把需要共享的状态单独交给store 通过mutation getter方式修改state， action 异步触发（使用commit） mutation，实现单向数据流。当后期状态修改方法增多，触发方式变多时候很方便管理状态
- [firebase](https://firebase.google.com/?hl=zh-cn)
 数据实时保存，可视化管理，简化数据库操作，简化开发。
- [hightlight](https://www.npmjs.com/package/highlight.js)  
markdown code 部分语法高亮
- [markdown-it](https://www.npmjs.com/package/markdown-it)
对markdown 格式内容进行转换为html
- [stack editor](https://stackedit.io/editor)
主要参考案例

## 主要解决问题
- 各家markdown编辑器自定义部分比较多，很多地方不能通用
- 数据迁移麻烦，大部分保存在各自博客网站的数据库里面，（ 简书的导出文件的功能很棒，计划在未来实现这个功能）
- 独立博客自己写markdown编辑器太耗时间

## 主要功能
- 编写预览markdown， 并保存在firebase上
- 插入图片到个人图床，避免想有道云文章图片在其他地方没办法加载的问题
- 截图直接黏贴上传，动态显示   
- 实时保存，避免意外关闭网页导致文章丢失的现象
- 动态保存
- 组件化,拆分组件，功能节藕

### 需要加的功能

- 预览与编辑区同步滚动
- 离线保存(没有测试呢，离线报错)
- promise使用
- 集成github.io


### 待解决问题
- build.js 文件过大
- 更删改查
- 单独吧sidebar 抽离出来
- firebase 功能实现设计效果
- atom 的css 复用
- alert 弹窗设计 复用3221

## 开发过程遇到的问题以及解决方案
- [vuex 单向数据流 偶遇 v-model 双向绑定](https://github.com/gzponline/v-markd/issues/3)
- [js 函数去抖 函数节流](https://github.com/gzponline/v-markd/issues/4)
- [js 捕获光标位置](https://github.com/gzponline/v-markd/issues/6)


** 未考虑兼容性问题 后续如果碰上需要解决单独解决 ** 

