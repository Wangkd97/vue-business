import Vue from 'vue'
import  Vuex from 'vuex'
import  * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'


//vuex全局注册
Vue.use(Vuex)

const state={
  userInfo:{},
  isShowFooterBar:true,
  productList:[],
  product:null,
  keyword:null,
  categoryId:null,
  orderStatus:null,
  // 判断是否选中地址
  judgeAddress:false,
  //判断是更改地址还是添加地址
  changeAddress:false,
  address:{},
  orderNo:null,
  dingdanNo:null,
  addressId:null,
}


export const store=new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})


