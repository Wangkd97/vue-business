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
import MyNoPayOrder from '@/pages/order/MyNoPayOrder'

import goodsInfo from '@/pages/goods/goodsInfo'
// import goodsindex from '@/pages/goods/goodsindex'
import goodstest from '@/pages/goods/goodstest'
import cartPay from '@/pages/cart/pay'
import payPicture from '@/pages/cart/payPicture'
import Address from '@/pages/cart/Address'
import AddAddress from '@/pages/cart/AddAddress'
import modifyAddress from '@/pages/cart/modifyAddress'
import newAddress from '@/pages/cart/newAddress'
import testcart from '@/pages/test/Cart'
import testcart1 from '@/pages/test/Cart1'
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
    },
    {
      path: '/myNoPayorder',
      name: 'MyNoPayOrder',
      component: MyNoPayOrder
    },
    {
      path: '/goodsInfo',
      name: 'goodsInfo',
      component: goodsInfo
    },
    {
      path: '/goodstest',
      name: 'goodstest',
      component: goodstest
    },
    {
      path: '/cartPay',
      name: 'cartPay',
      component: cartPay
    },
    {
      path: '/payPicture',
      name: 'payPicture',
      component: payPicture
    },
    {
      path: '/Address',
      name: 'Address',
      component: Address
    },
    {
      path: '/modifyAddress',
      name: 'modifyAddress',
      component: modifyAddress
    },
    {
      path: '/newAddress',
      name: 'newAddress',
      component: newAddress
    },
    {
      path: '/AddAddress',
      name: 'AddAddress',
      component: AddAddress
    },
    {
      path: '/testcart',
      name: 'testcart',
      component: testcart
    },
    {
      path: '/testcart1',
      name: 'testcart1',
      component: testcart1
    },
    // {
    //   path: '/goodsindex',
    //   name: 'goodsindex',
    //   component: goodsindex
    // }
  ]
})
