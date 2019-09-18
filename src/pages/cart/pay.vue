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
      <div style="width: 30px;float: left">
        <span style="font-size: 30px">  > </span>
      </div>

        <br><br><br>
      </div>

      <p v-for="item in cartProductList" >

        <img :src="'http://img.cdn.imbession.top/'+item.productImage" style="height: 100px;width: 100px">
        <span name="productname">{{item.productName}}</span>
        <br>
        <span>￥{{item.currentUnitPrice}}</span>
        <span>购买数量:</span> <span>{{item.quantity}}</span>


      </p>
      <div>
        <span style="font-size:20px;color:orange">总价：￥{{totalprice}}</span>
        <button @click="toPicture"> 去支付</button>
      </div>
    </div>

</template>

<script>
  import { Toast } from 'mint-ui';
  import {mapActions} from 'vuex'
    export default {
      name: "pay",
      data(){
        return {
          totalprice:"",
          addressList:[],
          cartProductList:[],
          firstAddress:"",
          orderId:this.$route.params.id,
        }
      },
      created(){

        var _vm=this //去掉底部导航栏
        _vm.isShowFooterBar(false)
      },

      methods:{
        ...mapActions(['isShowFooterBar']),
        back:function () {
          this.$router.go(-1)
        },
        toAllAddress:function(){
          this.$router.push("/Address")

        },

        getAddress:function () {
          var _vm=this
          this.service.post("/shipping/lookShippingMessageList",{
          }).then(function (response) {
            console.log(response)
            _vm.addressList = response.data.data.shippings
            _vm.firstAddress=_vm.addressList[0]
            console.log(_vm.addressList)
          })
            .catch(function (error) {
              console.log(error);
            });
        },
        getOrderProduct:function(){
          var _vm=this
          this.service.post("/portal/order/findMainOrder",{
            orderNo:this.orderId
          }).then(function (response) {
            console.log(response+"===chaxundingdanxinxi===========")
            console.log(response.data)
            _vm.cartProductList = response.data.data.oderItem
            _vm.totalprice = response.data.data.totalPrice
            console.log(_vm.cartProductList)
          })
            .catch(function (error) {
              console.log(error);
            });
        },
        toPicture:function () {
          console.log(this.orderId)
          var _vm=this
          this.service.post("/portal/order/pay",{
            orderNo:this.orderId
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
        console.log(this.orderId+"=====orderId=====")
        // console.log(this.uid+"==========id=======");
        // this.getMainProInfo(this.uid)
        this.getAddress()
        this.getOrderProduct()
      },

    }





</script>

<style scoped>

</style>
