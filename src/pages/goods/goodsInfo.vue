<template>
<div>

  <div>
    <mt-header title="商品详情">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>

  </div>
  <div class="wrapper">
    <swiper :options="swiperOption" >
      <swiper-slide v-for="(item,index) of ImagesList" :key="index " v-if="index<4" data-swiper-autoplay="3000">
        <img class="swiper-img" :src="'http://img.cdn.imbession.top/'+item" />
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
  <div ></div>
  <!--<home-swiper :banners="bannerList"></home-swiper>-->
 <!--<div class="top">-->
   <!--top-->
   <!--<img class="top-img" src="http://127.0.0.1/touxiang.jpg ">-->
 <!--</div>-->

  <div>
    <p >{{productInfo.name}}</p>
    <p >{{this.productInfo.name}}</p>
    <span></span>
    <!--<p style="font-size:30px;color:orange" >￥{{productInfo.price}}</p>-->
    <span style="font-size:30px;color:orange">￥{{productInfo.price}}</span>
    <button @click="buyProduct(productInfo.id)">加入购物车</button>
    <button>立即抢购</button>
    <p> 商品详情</p>
  </div>
  <div v-html="productInfo.detail">

  </div>
  <div>
    <p>
      <mt-popup
        v-model="popupVisible"
        position="bottom"
        name="123213"
        style="width: 100%">
        <br>
        <img src="http://img.cdn.imbession.top/hotoppo.png" style="height: 100px;width: 100px">
        <span >{{this.productInfo.name}}</span>
        <br>
        <span style="font-size:30px;color:orange">￥{{productInfo.price}}</span>

        <br>
        <br>
        <br>
        <br>
        <span>购买数量</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
          <button id="left" style="width: 40px;height: 25px" @click="jian">-</button>
          <span name="productNum" v-model="productNum" style="width: 50px">{{productNum}}</span>
          <button id="right" style="width: 40px;height: 25px" @click="jia">+</button>


        <br>
        <div>
          <button @click="buy" style="margin-left:300px" >确定</button>
        </div>

      </mt-popup>
    </p>


  </div>

</div>

</template>

<script>
  import { Toast } from 'mint-ui';
  import HomeHeader from "./Header"
  import HomeSwiper from './Swiper'
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
    export default {
        name: "goodsInfo",
      components:{
          HomeHeader,HomeSwiper
      },
      data(){
        return {
          uid:'-1',
          Reid:'',
          productNum:1,
          popupVisible:false,
          productInfo:{},
          subImages:{},
          ImagesList:[],
          swiperOption:{
            pagination:'.swiper-pagination',
            loop:true,
            autoplay:false
          },

        }
      },

      methods:{
      ...mapActions(['isShowFooterBar']),
        ...mapGetters(['getUser']),
        back:function () {
          this.$router.go(-1)

        },
        getMainProInfo:function (uid) {
          var _vm=this

          this.service.post("/portal/product/lookProductDetail",{
            "productId":uid,
          })
            .then(function(response){
              console.log(response.data)
              _vm.productInfo=response.data.data;
              _vm.subImages=response.data.data.subImages;
              console.log("==="+_vm.subImages.length);
              _vm.ImagesList=_vm.subImages.split(',');
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        buyProduct:function (id) {
         this.popupVisible=true;
        },
        // buy:function (id) {
        //   axios.get("http://localhost:8888/cart/addProductToCart")
        //     .then(this.getNewInfoSucc)
        // },
        buy:function(){
            console.log(this.productNum+"======num====")
          //通过axios
          this.service.post("/cart/addProductToCart",{
            //  params:{
            "productId":this.productInfo.id,
            "count":this.productNum
            //  }
          }).then(function (response) {
          })
            .catch(function (error) {
              console.log(error);
            });
            this.$router.push("/cart")
        },
        jian:function () {
          if (this.productNum>1){
            this.productNum--;
          }
          
        },
        jia:function () {
        if (this.productNum<this.productInfo.stock) {
          this.productNum++;
        }else{
          Toast('库存不足，请减少购买数量')
        }

        },

      },
      mounted(){
        console.log(this.uid+"==========uid=======");
        console.log(this.Reid+"==========reid=======");
        if (this.uid!='-1'||this.uid!=''||this.uid=='undefined'){
          this.getMainProInfo(this.uid)
        } else {
          this.getMainProInfo(this.Reid)
        }

      },
      created(){
        this.Reid=this.$route.query.id
        this.uid=this.$route.params.id
        var _vm=this //去掉底部导航栏
        _vm.isShowFooterBar(false)
      }
    }
</script>

<style scoped lang="stylus">
  .wrapper >>> .swiper-pagination-bullet-active
    background :#ffffff
  .wrapper
    /*设置图片宽高自适应*/
    overflow :hidden
    width :100%
    height :0
    padding-bottom :26%
    background :#eee
    .swiper-img
      width :100%
  .top{

  }
</style>
