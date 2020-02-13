// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './api'
import './assets/css/common.css'
import './assets/js/setHtmlFontSize'
import ElementUI from 'element-ui'
import 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import copyRight from './components/common/bottomCopyRight'
import topNav from './components/common/top'
import leftNav from './components/common/left-nav'
import "babel-polyfill"
//状态管理
// import store from './store'
//图标库
import './assets/css/iconfont.css';
Vue.use(ElementUI)
Vue.component('copyRight',copyRight)
Vue.component('topNav',topNav)
Vue.component('leftNav',leftNav)
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

