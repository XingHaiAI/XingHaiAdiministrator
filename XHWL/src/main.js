// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import animate from 'animate.css'
import './assets/icon/iconfont.css'
import  axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false
Vue.prototype.$axios=axios;
Vue.prototype.$qs=qs;


/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.use(animate)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  created(){
    this.$axios.defaults.baseURL='http://39.108.67.59:8085'
  },
  components: { App }
})
