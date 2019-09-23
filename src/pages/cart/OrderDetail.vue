<template>
  <div >
    <mt-header title="订单详情">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="lastpage">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>

    <div v-if="this.judgeAddress==false" class="address" @click="selectAddress">
      <span class="left">请选择收货地址</span>
      <span class="right"> > </span>
    </div>
    <div v-else class="address" @click="selectAddress">
      <div style="display: inline-block">
        <p>收货人姓名：{{address.receiverName}}</p>
        <p>收货人手机号：{{address.receiverPhone}}</p>
        <p>收货地址：{{address.receiverCity}} {{address.receiverDistrict}}</p>
        <p>详细地址：{{address.receiverAddress}}</p>
      </div>
      <span style="float: right;margin-top: 0.3rem;font-size: 0.5rem">  > </span>
    </div>
    商品清单
    <div v-for="(item,index) in productList">
      <div v-if="item.productChecked==1" style="background-color: #cccccc;margin: 0.2rem 0.2rem 0 0.2rem;">
        <p>{{item.productName}}</p>
        <p>商品数量：{{item.quantity}}</p>
        <p>商品单价：{{item.productPrice|formatMoney}}</p>
      </div>
    </div>
    <div style="float: right">
      <p>总价：{{totalMoney|formatMoney}}</p>
      <button style="width: 100%;height:0.5rem;background-color: red;color: white;line-height: 0.5rem" @click="pay">支付</button>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  export default {
    name: "OrderDetail",
    data(){
      return {
        judgeAddress:false,
        order:{},
        address:{},
        productList:[],
        totalMoney:""
      }
    },
    methods:{
      ...mapGetters(['getJudgeAddress','getAddress']),
      ...mapActions(['setIsShowFooterBar','setOrderNo']),
      lastpage:function(){
        this.$router.go(-1)
      },
      selectAddress:function () {
        this.$router.push("/addressList")
      },
      getCarts:function () {
        var _vm=this
        //通过axios发请求  get
        this.service.get("/cart/searchCartProductList").then(function (response) {
          console.log(response)
          _vm.order=response.data.data
          console.log(_vm.order)
          _vm.productList=response.data.data.cartproductViewObjectList
          console.log(_vm.productList)
          _vm.totalMoney=response.data.data.cartTotalPrice
          console.log(_vm.totalMoney)
        }).catch(function (error) {
          console.log(error)
        })
      },
      pay:function () {
        var _vm=this
        //通过axios发请求  post
        this.service.post("/order/create.do",{
          "shippingId":_vm.address.id
        }).then(function (response) {
          console.log(response)
          _vm.setOrderNo(response.data.data.orderNo)
          _vm.$router.push("/qrCode")
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    mounted(){
      this.setIsShowFooterBar(false)
      this.judgeAddress=this.getJudgeAddress()
      console.log(this.judgeAddress)
      if(this.judgeAddress){
        this.address=this.getAddress()
        console.log(this.address)
      }
      this.getCarts()

    }
  }
</script>

<style scoped lang="stylus">
  @import '~styles/mixins.styl'
  .recommend-title
    line-height :.8rem
    background :#eee
    margin-top:.2rem
    text-indent:.2rem
  .item
    overflow :hidden
    height:1.9rem
    display :flex
    .item-img
      width :1.7rem
      height :1.7rem
      padding :.1rem
    .item-info
      flex:1
      padding .1rem
      min-width:0
      .item-title
        line-height: .54rem
        font-size :.32rem
        ellipsis()
      .item-desc
        line-height :.4rem
        color:#ccc
        ellipsis()
      .item-price
        margin-top:.16rem
        line-height :.32rem
        font-size :.32rem
        color:red
  .address
    padding: 0.5rem
    background-color #cccccc
    .left
      margin-left:0.5rem
    .right
      float:right
      margin-right:0.5rem
</style>
