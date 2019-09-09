// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  Home from '@/components/Home'
import UserLogin from '@/pages/center/UserLogin'
import Cart from '@/pages/cart/Cart'
Vue.config.productionTip = false

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'


Vue.use(Mint);

import  axios from 'axios'

//需要将axios注册成为全局变量

Vue.prototype.axios=axios

import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont.css'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper, /* { default global options } */)
fastClick.attach(document.body)




var service=axios.create({

   baseURL:"http://localhost:8888",
  // 请求预处理函数 可以把你传的param进行处理
  withCredentials: true , // 允许携带cookie
  transformRequest: [
    data => {
      // data 就是你post请求传的值
      // 一下主要是吧数据拼接成 类似get格式
      let params = ''
      for (var index in data) {
        params += index + '=' + data[index] + '&'
      }
      return params
    }
  ]

})

Vue.prototype.service=service

/* eslint-disable no-new */

import {store} from  './store/index'
new Vue({
  el: '#app',
  router,
  store,
  components: {Home},
  template: '<Home/>'

})
