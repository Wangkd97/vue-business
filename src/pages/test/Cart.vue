<template>
    <div id="app">
      <!--头部开始-->
      <mt-header style="background-color: #25a4bb " title="购物车">
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <!--头部结束-->
      <div class="shopping">

        <div class="shop-group-item">
<!--          <div class="shop-name">-->
<!--            <input type="checkbox" class="check goods-check shopCheck">-->
<!--            <h4><a href="#">苹果专卖店</a></h4>-->
<!--            <div class="coupons"><span>领券</span><em>|</em><span>编辑</span></div>-->
<!--          </div>-->
          <ul>
            <li v-for="(item,index) of cartProductVOList":key="index">
              <div class="shop-info">

<!--                商品勾选按钮-->
                <input @click="unCheckedProduct(item.productId)" type="checkbox" class="check goods-check goodsCheck" checked v-if="item.productChecked">
                <input @click="checkedProduct(item.productId)" type="checkbox" class="check goods-check goodsCheck"  v-if="!item.productChecked">
<!--                商品勾选按钮-->

<!--                商品图片-->
                <div class="shop-info-img">
                  <a href="#"><img :src="'http://img.cdn.imbession.top/'+item.productMainImage" alt=""></a>
                </div>
<!--                商品图片-->

<!--                商品内容-->
                <div class="shop-info-text">
<!--                  商品名-->
                  <h4>{{item.productName}}</h4>
<!--                  商品名-->

                  <div class="shop-brief"><span>重量:3.3kg</span><span>颜色:标配版</span><span>版本:13.3英寸</span></div>

                  <!--                  删除-->
                    <a href="#">
                      <img width="0.2rem" height="0.2rem" src="../../../../Nwt文件夹/视频/前端Html/Mint/my-project(1)/static/images/delete.png">
                    </a>
                  <!--                  删除-->

                  <div class="shop-price">
<!--                    商品价格-->
                    <div class="shop-pices">￥<b class="price">{{item.productPrice}}</b></div>
<!--                    商品价格-->
<!--                    商品数量增减-->
                    <div class="shop-arithmetic">
                      <a @click="decrease(item.productId)" href="javascript:;" class="minus">-</a>
                      <span class="num" >{{item.quantity}}</span>
                      <a @click="increase(item.productId)" href="javascript:;" class="plus">+</a>
                    </div>
<!--                    商品数量增减-->
                  </div>

                </div>
<!--                商品内容-->

              </div>
            </li>
            <li>
              <div class="payment-bar">
                <div class="all-checkbox">
                  <input @click="unSelectAll" type="checkbox" class="check goods-check" checked v-if="allChecked">
                  <input @click="selectAll" type="checkbox" class="check goods-check" v-if="!allChecked">
                  <span>全选</span>
                </div>
                <div class="shop-total">
                  <strong>总价：<i class="total" id="AllTotal">{{cartTotalPrice}}</i></strong>
                  <!--          <span>减免：0.00</span>-->
                </div>
                <div>
                  <a href="#" class="settlement">结算</a>
                </div>
              </div>
            </li>
          </ul>
<!--          <div class="shopPrice">本店总计：￥<span class="shop-total-amount ShopTotal">0.00</span></div>-->
        </div>
      </div>


    </div>
</template>

<script>
  import { mapActions } from 'vuex'
    export default {
      name: "UserCart",
      data(){
        return{
          cartProductVOList:[],
          allChecked:false,
          cartTotalPrice:0
        }
      },
      created() {
        var _vm=this
        window.onscroll = function(){
          //变量scrollTop是滚动条滚动时，距离顶部的距离
          var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
          //变量windowHeight是可视区的高度
          var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          //变量scrollHeight是滚动条的总高度
          var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
          //滚动条到底部的条件
          if((scrollTop+windowHeight+60)>=scrollHeight){
            //写后台加载数据的函数
            console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);

            _vm.$store.dispatch('isShowFooterBar',false)
          }else{
            _vm.$store.dispatch('isShowFooterBar',true)
          }
        }
      },
      mounted() {
        this.$nextTick(function () {
          this.getCartList()
        })
      },
      methods:{
        //购物车列表
        getCartList:function () {
          var _this = this
          this.service.post('/cart/searchCartProductList?userId='+21)
            .then(function (res) {
              console.log(res+"==gouwucheliebiao==========")
              _this.cartProductVOList = res.data.data.cartproductViewObjectList
              _this.allChecked = res.data.data.allChecked
              _this.cartTotalPrice = res.data.data.cartTotalPrice
            })
            .catch(function () {
              alert("列表获取失败！")
            })
        },
        //删除确认框
        showAlert:function(productId){
          this.alertBox = !this.alertBox
          this.$store.commit('$_setDeleteId',productId)
        },
        //删除
        deleteCartProduct:function () {
          var productId = this.$store.state.deleteId
          var _this = this
          this.service.get('http://localhost:8080/cart/delete_product.do?productIds='+productId)
            .then(function (res) {
              console.log(res)
              _this.$store.commit('$_removeDeleteId')
              window.location.reload()
            })
            .catch(function () {
              alert("删除失败！")
            })
        },
        //关闭删除确认框
        closeAlert:function () {
          this.alertBox = !this.alertBox
        },
        //减少商品数量
        decrease:function (productId) {
          var _this = this
          this.service.get('http://localhost:8080/cart/update.do?productId='+productId+'&count=-1')
            .then(function (res) {
              console.log(res)
              window.location.reload()
            })
            .catch(function () {
              alert("减少失败！")
            })
        },
        //增加商品数量
        increase:function (productId) {
          console.log(productId)
          var _this = this
          this.service.get('http://localhost:8080/cart/update.do?productId='+productId+'&count=1')
            .then(function (res) {
              console.log(res)
              window.location.reload()
            })
            .catch(function () {
              alert("增加失败！")
            })
        },
        updateChecked:function(productId){

        },
        unCheckedProduct:function (productId) {
          var _this = this
          this.service.get('/cart/notCheckCartProduct?productId='+productId)
            .then(function (res) {
              console.log(res)
              window.location.reload()
            })
            .catch(function () {
              alert("取消选中失败!")
            })
        },
        checkedProduct:function (productId) {
          var _this = this
          this.service.get('/cart/checkCartProduct?productId='+productId)
            .then(function (res) {
              console.log(res)
              window.location.reload()
            })
            .catch(function () {
              alert("选中失败!")
            })
        },
        unSelectAll:function () {
          var _this = this
          this.service.get('/cart/notCheckCartAllProduct')
            .then(function (res) {
              console.log(res)
              window.location.reload()
            })
            .catch(function () {
              alert("选中失败!")
            })
        },
        selectAll:function () {
          var _this = this
          this.service.get('/cart/CheckCartAllProduct')
            .then(function (res) {
              console.log(res)
              window.location.reload()
            })
            .catch(function () {
              alert("选中失败!")
            })
        },
        ...mapActions(['isShowFooterBar'])
      }
    }
</script>

<style lang="stylus" scoped>

  @import "../../assets/css/cart/base.css";
  @import "../../assets/css/cart/module.css";


</style>
