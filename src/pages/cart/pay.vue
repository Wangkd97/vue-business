<template>
    <div>
      <div>
        <mt-header title="订单结算">
          <router-link to="/" slot="left">
            <mt-button icon="back" @click="back">返回</mt-button>
          </router-link>
          <!--<mt-button icon="more" slot="right"></mt-button>-->
        </mt-header>
      </div>
      <!--<div v-for="item in addressList">-->
      <!--<span>{{item.receiverName}}</span> <span>{{item.receiverPhone}}</span> <br>-->
      <!--<span>详细地址:{{item.receiverProvince}}{{item.receiverCity}}{{item.receiverDistrict}}{{item.receiverAddress}}</span>-->
    <!--</div>-->
      <div @click="toAllAddress" >
        <br>
        <div style="width: 300px;float: left" >
          <span>{{firstAddress.receiverName}}</span> <span>{{firstAddress.receiverPhone}}</span> <br>
          <span>详细地址:{{firstAddress.receiverProvince}}{{firstAddress.receiverCity}}
          {{firstAddress.receiverDistrict}}{{firstAddress.receiverAddress}}</span>
        </div>
        <!--<div style="display: inline-block">-->
          <!--<p>收货人姓名：{{address.receiverName}}</p>-->
          <!--<p>收货人手机号：{{address.receiverPhone}}</p>-->
          <!--<p>收货地址：{{address.receiverCity}} {{address.receiverDistrict}}</p>-->
          <!--<p>详细地址：{{address.receiverAddress}}</p>-->
        <!--</div>-->


      <div style="width: 30px;float: left">
        <span style="font-size: 30px">  > </span>
      </div>

        <br><br><br>
      </div>

      <!--<div  class="address" @click="selectAddress">-->
        <!--<div style="display: inline-block">-->
          <!--<p>收货人姓名：{{address.receiverName}}</p>-->
          <!--<p>收货人手机号：{{address.receiverPhone}}</p>-->
          <!--<p>收货地址：{{address.receiverCity}} {{address.receiverDistrict}}</p>-->
          <!--<p>详细地址：{{address.receiverAddress}}</p>-->
        <!--</div>-->
        <!--<span style="float: right;margin-top: 0.3rem;font-size: 0.5rem">  > </span>-->
      <!--</div>-->



      <!--<p v-for="item in cartProductList" >-->

        <!--<img :src="'http://img.cdn.imbession.top/'+item.productImage" style="height: 100px;width: 100px">-->
        <!--<span name="productname">{{item.productName}}</span>-->
        <!--<br>-->
        <!--<span>￥{{item.currentUnitPrice}}</span>-->
        <!--<span>购买数量:</span> <span>{{item.quantity}}</span>-->


      <!--</p>-->
      <!--<div>-->
        <!--<span style="font-size:20px;color:orange">总价：￥{{totalprice}}</span>-->
        <!--<button @click="toPicture"> 去支付</button>-->
      <!--</div>-->

      <div v-for="(item,index) in productList">
        <!--v-if="item.productChecked==1"-->
        <div  style="background-color: #cccccc;margin: 0.2rem 0.2rem 0 0.2rem;">
          <p>{{item.productName}}</p>
          <p>商品数量：{{item.quantity}}</p>
          <p>商品单价：{{item.currentUnitPrice|formatMoney}}</p>
        </div>
      </div>
      <div style="float: right">
        <p>总价：{{totalMoney|formatMoney}}</p>
        <button style="width: 100%;height:0.5rem;background-color: red;color: white;line-height: 0.5rem" @click="toPicture">支付</button>
      </div>
    </div>

</template>

<script>
  import { Toast } from 'mint-ui';
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'

    export default {
      name: "pay",
      data(){
        return {
          totalprice:"",
          addressList:[],
          cartProductList:[],
          firstAddress:"",
          orderId:this.$route.params.id,
          productList:[],
          totalMoney:"",
          address:{},
          judgeAddress:false,
          ZaddressId:"",
        }
      },
      created(){

        var _vm=this //去掉底部导航栏
        _vm.isShowFooterBar(false)
      },

      methods:{
        ...mapActions(['isShowFooterBar']),
        ...mapGetters(['getJudgeAddress','getAddress','getdingdanNo','getaddressId']),
        ...mapActions(['setAddress','setJudgeAddress','setChangeAddress','setIsShowFooterBar','setdingdanNo']),
        back:function () {
          this.$router.go(-1)
        },
        toAllAddress:function(){
          this.$router.push("/Address")

        },

        getAddress:function (id) {
          var _vm=this
          this.service.post("/shipping/lookShippingMessageList",{
          }).then(function (response) {
            console.log(response)
            console.log("++++++id============="+id)
            _vm.addressList = response.data.data.shippings
            _vm.firstAddress=_vm.addressList[id]
            console.log(_vm.firstAddress)
            console.log("=======paydizhi======="+_vm.firstAddress)
           // _vm.setAddress(_vm.firstAddress)
            //this.setAddress(_vm.firstAddress)
            console.log(_vm.addressList)
          })
            .catch(function (error) {
              console.log(error);
            });
        },
        getOrderProduct:function(){
          var _vm=this
          this.service.post("/portal/order/findMainOrder",{
           // orderNo:this.orderId
            orderNo:this.getdingdanNo()
          }).then(function (response) {
            console.log(response+"===chaxundingdanxinxi===========")
            console.log(response.data)
           // _vm.cartProductList = response.data.data.oderItem
            //_vm.totalprice = response.data.data.totalPrice
            _vm.productList = response.data.data.oderItem
            _vm.totalMoney = response.data.data.totalPrice
            console.log(_vm.productList)
          })
            .catch(function (error) {
              console.log(error);
            });
        },
        toPicture:function () {
          console.log(this.orderId)
          var _vm=this
          this.service.post("/portal/order/pay",{
            //orderNo:this.orderId
            orderNo:this.getdingdanNo()
          }).then(function (response) {
            console.log(response)
            console.log(response.data.status+"========status========")
            if(response.data.status==0){
              console.log(_vm.orderId+"===pay chuan gei pic id =======")
              _vm.$router.push({
                name:"payPicture",
                params:{
                  imgSrc:response.data.data.qrCode,
                  orderId:_vm.orderId
                }
              })
            }else{
              Toast('下单失败！')
            }

          })
            .catch(function (error) {
              console.log(error);
            });

        }


      },
      mounted(){
        this.ZaddressId=this.getaddressId()
        console.log(this.getaddressId()+"============getdizhiid========")
        console.log(this.getdingdanNo()+"========quanjudingdan=======")
        console.log(this.orderId+"=====orderId=====")
        // console.log(this.uid+"==========id=======");
        // this.getMainProInfo(this.uid)
        this.getAddress(this.getaddressId())
        this.getOrderProduct()
        this.judgeAddress=this.getJudgeAddress()
        console.log(this.judgeAddress)
        if(this.judgeAddress){
          this.address=this.getAddress()
          console.log(this.address)
        }








      },

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
