<template>

  <div>
    这是购物车组件


    <p v-for="item in cartList" >
      <input type="checkbox" name="checkbox1" value="checkbox复选1" v-if="item.productChecked==1" checked="checked" @click="nochecked(item.productId)"/>

      <input type="checkbox" name="checkbox2" value="checkbox复选2" v-else="item.productChecked==0"  @click="yeschecked(item.productId)"/>
      <img :src="'http://img.cdn.imbession.top/'+item.productMainImage" style="height: 100px;width: 100px">
        <span name="productname">{{item.productName}}</span>
        <br>
        <span>￥{{item.productPrice}}</span>
       <span>购买数量:</span> <span>{{item.quantity}}</span>


    </p>
    <!--<mt-switch v-model="value" @click="allchecked" >全选</mt-switch>-->
    <input type="checkbox" name="checkbox3" value=""   checked="checked" @click="onchange"/><span name="quanxuan">{{this.jstatus}}</span>
    <!--<button @click="allcheck">全选</button>-->
    <button @click="pay">结算</button>

  </div>

</template>

<script>
  import { mapActions } from 'vuex'
  import { Switch } from 'mint-ui';
  import { Popup } from 'mint-ui';
  import { Checklist } from 'mint-ui';
  import ProductHome from "../home/ProductHome";
    export default {
        name: "Cart",
      components: {ProductHome},
      data(){
          return {
            jstatus:'取消全选',
            status:-100,
            popupVisible:false,
            cartList:[],
            value:true,
            addressList:[],
            firstAddress:"",
            orderNo:"",
          }
      },
      component(){
  },
      mounted(){
          this.getCarts()
        this.getAddress()
        this.isShowFooterBar("true")
      },

      methods:{
        ...mapActions(['isShowFooterBar']),
         ...mapActions(['setUserInfo']),
          getCarts:function(){
           var  _vm=this
            this.service.get("/cart/searchCartProductList").then(function(response){
              console.log(response)
              _vm.status=response.data.data.status
              _vm.cartList=response.data.data.cartproductViewObjectList
              console.log(_vm.cartList)
              console.log(_vm.cartList[0])
            }).catch(function (error) {
              console.log(error);
            });
          },
        getAddress:function(){
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
        pay:function () {
          var _vm=this
          this.service.post("/portal/order/createOrder",{
            "shippingId":this.addressList[0].id,
          })
            .then(function(response){
              console.log(response+"============dingdan======")
              _vm.orderNo=response.data.data.orderNo
              console.log(_vm.orderNo+"=====cart=chuan=dingdanhao===")
              _vm.$router.push({
                name:"cartPay",
                params:{
                  id:_vm.orderNo
                }
              })
            })
            .catch(function (error) {
              console.log(error)
            })


        },
        nochecked:function (id) {
          var _vm=this
          this.service.post("/cart/notCheckCartProduct",{
            "productId":id
          })
            .then(function(response){
            })
            .catch(function (error) {
              console.log(error)
            })
          // this.$router.push({
          //   name:"cart",
          //   params:{
          //     id:this.orderNo
          //   }
          // })

        },
        yeschecked:function(id){
          var _vm=this
          this.service.post("/cart/checkCartProduct",{
            "productId":id
          })
            .then(function(response){
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        allchecked:function () {
          this.service.post("/cart/CheckCartAllProduct",{

          })
            .then(function(response){
            })
            .catch(function (error) {
              console.log(error)
            })


        },
        onchange:function () {

           if (this.jstatus=='取消全选'){
             this.jstatus='全选',

             this.service.post("/cart/notCheckCartAllProduct",{

             })
               .then(function(response){
               })
               .catch(function (error) {
                 console.log(error)
               })


           } else{
             this.jstatus='全选',
               this.allchecked()
           }


        },
      }
    }
</script>

<style >

</style>
