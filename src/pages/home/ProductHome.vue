<template>
    <!--<div>-->
      <!--这是首页组件-->
      <!--{{this.getUser}}-->


    <!--</div>-->

  <div>
    <footer-bar></footer-bar>
    <home-header></home-header>
    <home-swiper :banners="bannerList"></home-swiper>
    <home-icons></home-icons>
    <home-recommend :hots="hotList"></home-recommend>
    <new-product :newList="newList"></new-product>
    <!-- <div class="home">home</div>
    <router-link to="/list">列表页</router-link>-->

  </div>
</template>

<script>

  import FooterBar from '@/components/FooterBar'
  import HomeHeader from "./components/Header"
  import HomeSwiper from './components/Swiper'
  import HomeIcons from './components/Icons'
  import HomeRecommend from './components/Recommend'
  import NewProduct from './components/NewProduct'
  import axios from 'axios'
  import {mapActions} from 'vuex'
  export default {
    name: "ProductHome",
    components:{
      HomeHeader,HomeSwiper,HomeIcons,HomeRecommend,NewProduct,FooterBar
    },
    data(){
      return {
        bannerList:[],
        hotList:[],
        newList:[]
      }
    },
    mounted() {
      this.getBannerInfo(),
        this.getHotInfo(),
        this.getNewInfo()

    },
    created() {
      console.log("=========created===order==")
      //this.isShowFooterBar(false)
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

          _vm.isShowFooterBar(false)
        }else{
          _vm.isShowFooterBar(true)
        }
      }

    },

    methods:{
      ...mapActions(['isShowFooterBar']),
      getBannerInfo(){
        axios.get("http://localhost:8888/portal/product/getBannerProducts")
          .then(this.getBannerInfooSucc)
      },
      getHotInfo(){
       // axios.get("http://localhost:8888/manger/product/searchProductList?categoryId=1&is_hot=1")
        axios.get("http://localhost:8888/portal/product/getHotProducts")
          .then(this.getHotInfoSucc)
      },
      getNewInfo(){
        //http://www.imbession.top/portal/product/list.do?categoryId=1&is_banner=1&pageNum=1&pageSize=6
        //
        axios.get("http://localhost:8888/portal/product/getNewProducts")
          .then(this.getNewInfoSucc)
      },
      getBannerInfooSucc(res){
        //接口返回的数据
        res=res.data
        if(res.status==0 && res.data){
          const data=res.data
          this.bannerList=data
          console.log(this.bannerList)
        }

      },
      getHotInfoSucc(res){
        //接口返回的数据
        res=res.data
        if(res.status==0 && res.data){
          const data=res.data
          this.hotList=data
          console.log(this.hotList)
        }
      },
      getNewInfoSucc(res){
        //接口返回的数据
        res=res.data
        if(res.status==0 && res.data){
          const data=res.data
          this.newList=data
          console.log(this.newList)
        }
      }
    }
  }






</script>

<style scoped>

</style>
