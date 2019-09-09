import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import UserLogin from "@/pages/center/UserLogin"


import ProductHome from "@/pages/home/ProductHome"
import my from "@/pages/center/my"
import Cart from "@/pages/cart/Cart"
import UserCenter from '@/pages/center/UserCenter'
import MyOrder from '@/pages/order/MyOrder'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductHome',
      component: ProductHome
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/producthome',
      name: 'ProductHome',
      component: ProductHome
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/usercenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/myorder',
      name: 'MyOrder',
      component: MyOrder
    }
  ]
})
