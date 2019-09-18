<template>
  <div class="checkout">
    <div id="app">
      <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <symbol id="icon-add" viewBox="0 0 32 32">
            <title>add2</title>
            <path class="path1" d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
          </symbol>
          <symbol id="icon-ok" viewBox="0 0 39 32">
            <title>ok</title>
            <path class="path1" d="M14.084 20.656l-7.845-9.282c-1.288-1.482-3.534-1.639-5.016-0.351s-1.639 3.534-0.351 5.016l10.697 12.306c1.451 1.669 4.057 1.623 5.448-0.096l18.168-22.456c1.235-1.527 0.999-3.765-0.528-5.001s-3.765-0.999-5.001 0.528l-15.573 19.337z"></path>
          </symbol>
          <symbol id="icon-edit" viewBox="0 0 32 32">
            <title>edit</title>
            <path class="path1" d="M25.599 11.292l-4.892-4.892 3.825-3.825 4.892 4.892-3.825 3.825zM4.732 23.308l3.959 3.959-5.939 1.98 1.98-5.939zM10.666 26.225l-4.892-4.892 13.425-13.425 4.892 4.892-13.425 13.425zM31.687 6.713l-6.4-6.4c-0.417-0.417-1.091-0.417-1.508 0l-20.267 20.267c-0.114 0.115-0.191 0.25-0.242 0.393-0.003 0.009-0.012 0.015-0.015 0.025l-3.2 9.6c-0.128 0.383-0.029 0.806 0.257 1.091 0.203 0.204 0.476 0.313 0.754 0.313 0.112 0 0.227-0.017 0.337-0.054l9.6-3.2c0.011-0.003 0.017-0.013 0.027-0.016 0.142-0.052 0.276-0.128 0.39-0.242l20.267-20.267c0.417-0.416 0.417-1.091 0-1.508v0z"></path>
          </symbol>
          <symbol id="icon-del" viewBox="0 0 26 32">
            <title>delete</title>
            <path class="path1" d="M17.723 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM7.877 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM12.8 28c0.543 0 0.985-0.448 0.985-1v-12c0-0.552-0.441-1-0.985-1s-0.984 0.448-0.984 1v12c0 0.552 0.441 1 0.984 1v0zM23.631 4h-5.908v-2c0-1.104-0.882-2-1.969-2h-5.908c-1.087 0-1.969 0.896-1.969 2v2h-5.908c-1.087 0-1.969 0.896-1.969 2v2c0 1.104 0.882 2 1.969 2v18c0 2.208 1.765 4 3.939 4h13.784c2.174 0 3.938-1.792 3.938-4v-18c1.087 0 1.969-0.896 1.969-2v-2c0-1.104-0.882-2-1.969-2v0zM9.846 3c0-0.552 0.441-1 0.984-1h3.938c0.544 0 0.985 0.448 0.985 1v1h-5.908v-1zM21.662 28c0 1.104-0.882 2-1.969 2h-13.784c-1.087 0-1.97-0.896-1.97-2v-18h17.723v18zM22.646 8h-19.692c-0.543 0-0.985-0.448-0.985-1s0.441-1 0.985-1h19.692c0.543 0 0.984 0.448 0.984 1s-0.441 1-0.984 1v0z"></path>
          </symbol>
          <symbol id="icon-clock" viewBox="0 0 32 32">
            <title>clock</title>
            <path class="path1" d="M29.333 16c0-7.364-5.97-13.333-13.333-13.333s-13.333 5.97-13.333 13.333c0 7.364 5.97 13.333 13.333 13.333s13.333-5.97 13.333-13.333v0 0 0 0 0 0zM0 16c0-8.837 7.163-16 16-16s16 7.163 16 16c0 8.837-7.163 16-16 16s-16-7.163-16-16zM14.667 14.667v1.333h2.667v-10.667h-2.667v9.333zM24 18.667h1.333v-2.667h-10.667v2.667h9.333z"></path>
          </symbol>
        </defs>
      </svg>
      <div class="container">
        <div class="cart">
          <div class="checkout-title">
            <span>购物车</span>
          </div>

          <!-- table -->
          <div class="item-list-wrap">
            <div class="cart-item">
              <div class="cart-item-head">
                <ul>
                  <li>商品信息</li>
                  <li>商品金额</li>
                  <li>商品数量</li>
                  <li>总金额</li>
                  <li>编辑</li>
                </ul>
              </div>
              <ul class="cart-item-list">
                <li v-for="(item,index) of cartProductVOList":key="index">
                  <!--                    左部商品信息-->
                  <div class="cart-tab-1">
                    <!--                      单选按钮-->
<!--                    <div class="cart-item-check">-->
<!--                      <a href="javascript:void 0" class="item-check-btn">-->
<!--                        <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>-->
<!--                      </a>-->
<!--                    </div>-->
                    <div class="cart-item-check">
                      <a>
                        <input @click="unCheckedProduct(item.productId)" class="checkbox" type="checkbox" checked="checked" v-if="item.productChecked">
                        <input @click="checkedProduct(item.productId)" class="checkbox" type="checkbox" v-if="!item.productChecked">
                      </a>
                    </div>
                    <!--                      单选按钮-->
                    <!--                      商品图片-->
                    <div class="cart-item-pic">
                      <img :src="'http://img.cdn.imbession.top/'+item.productMainImage" alt="">
                    </div>
                    <!--                      商品图片-->
                    <!--                      商品名字-->
                    <div class="cart-item-title">
                      <div class="item-name">{{item.productName}}</div>
                    </div>
                    <!--                      商品名字-->
                    <!--                      赠品-->
                    <div class="item-include">
                      <dl>
                        <dt>赠送:</dt>
                        <dd>无</dd>
                      </dl>
                    </div>
                    <!--                      赠品-->
                  </div>
                  <!--                    左部商品信息-->
                  <!--                    价格-->
                  <div class="cart-tab-2">
                    <div class="item-price">{{item.productPrice}}</div>
                  </div>
                  <!--                    价格-->
                  <!--                    购物车数量-->
                  <div class="cart-tab-3">
                    <div class="item-quantity">
                      <div class="select-self select-self-open">
                        <div class="quantity">
                          <a @click="decrease(item.productId)" href="javascript:void 0"><span>-</span></a>
                          <input v-model="item.quantity" type="text" v-bind:style="styleInput">
                          <a @click="increase(item.productId)" href="javascript:void 0"><span>+</span></a>
                        </div>
                      </div>
                      <div v-if="item.limitQuantity === 'LIMIT_NUM_SUCCESS'" class="item-stock">库存：{{item.productStock}}</div>
                      <div v-if="item.limitQuantity === 'LIMIT_NUM_FAIL'" style="color: red" class="item-stock">库存不足</div>
                    </div>
                  </div>
                  <!--                    购物车数量-->
                  <!--                    总金额-->
                  <div class="cart-tab-4">
                    <div class="item-price-total">{{item.productTotalPrice}}</div>
                  </div>
                  <!--                    总金额-->
                  <!--                    编辑-->
                  <div class="cart-tab-5">
                    <div class="cart-item-operation">
                      <a @click="showAlert(item.productId)" href="javascript:void 0" class="item-edit-btn">
                        <svg class="icon icon-del"><use xlink:href="#icon-del" ></use></svg>
                      </a>
                    </div>
                  </div>
                  <!--                    编辑-->
                </li>
              </ul>
            </div>
          </div>

          <!-- footer -->
          <div class="cart-foot-wrap">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a @click="unSelectAll" href="javascript:void 0" v-if="allChecked">
<!--                    <span class="item-check-btn" >-->
<!--                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>-->
<!--                    </span>-->
                  <input @click="unSelectAll" class="checkbox" type="checkbox" checked="checked" >
                  <span>全选</span>
                </a>
                <a @click="selectAll" href="javascript:void 0" v-if="!allChecked">
                  <input @click="selectAll" class="checkbox" type="checkbox" v-if="!allChecked">
                  <span>全选</span>
                </a>
              </div>
              <div class="item-all-del">
                <a @click="unSelectAll" href="javascript:void 0" class="item-del-btn">
                  <span>取消全选</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                Item total: <span class="total-price">{{cartTotalPrice}}</span>
              </div>
              <div class="next-btn-wrap">
                <a href="javascrit:;" class="btn btn--red" style="width: 200px">结账</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--        删除-->
      <div v-show="alertBox" class="md-modal modal-msg md-modal-transition" id="showModal">
        <div class="md-modal-inner">
          <div class="md-top">
            <button @click="closeAlert" class="md-close">关闭</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
              <p id="cusLanInfo">你确认删除此订单信息吗?</p>
            </div>
            <div class="btn-wrap col-2">
              <button @click="deleteCartProduct" class="btn btn--m" id="btnModalConfirm">Yes</button>
              <button @click="closeAlert" class="btn btn--m btn--red" id="btnModalCancel">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Cart",
      data(){
          return{
            cartProductVOList:[],
            allChecked:false,
            cartTotalPrice:0,
            styleInput:{
              width:'0.9rem',
              height:'0.5rem',
              textAlign:'center'
            },
            alertBox:false
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
          this.service.get('http://localhost:8888/cart/searchCartProductList?userId='+21)
            .then(function (res) {
              console.log(res)
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
          this.$axios.get('http://localhost:8080/cart/delete_product.do?productIds='+productId)
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
          this.$axios.get('http://localhost:8080/cart/update.do?productId='+productId+'&count=-1')
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
          this.$axios.get('http://localhost:8080/cart/update.do?productId='+productId+'&count=1')
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
          this.$axios.get('http://localhost:8080/cart/un_select.do?productId='+productId)
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
          this.$axios.get('http://localhost:8080/cart/select.do?productId='+productId)
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
          this.$axios.get('http://localhost:8080/cart/un_select_all.do')
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
          this.$axios.get('http://localhost:8080/cart/select_all.do')
            .then(function (res) {
              console.log(res)
              window.location.reload()
            })
            .catch(function () {
              alert("选中失败!")
            })
        }
      }
    }
</script>

<style scoped>

  @import "../../../../Nwt文件夹/视频/前端Html/Mint/my-project(1)/src/assets/css/cart1/base.css";
  @import "../../../../Nwt文件夹/视频/前端Html/Mint/my-project(1)/src/assets/css/cart1/checkout.css";
  @import "../../../../Nwt文件夹/视频/前端Html/Mint/my-project(1)/src/assets/css/cart1/modal.css";
  @import "../../../../Nwt文件夹/视频/前端Html/Mint/my-project(1)/src/assets/css/cart1/reset.css";

  .checkbox{
    width: 18px;
    height: 18px;
    border-radius: 8px;
  }

</style>
