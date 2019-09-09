<template>
    <!--<div>-->
      <!--这是首页组件-->
      <!--{{this.getUser}}-->


    <!--</div>-->

  <div>
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


  // import { mapGetters } from 'vuex'
  //   export default {
  //       name: "ProductHome",
  //       computed:{
  //         ...mapGetters(['getUser'])
  //       },
  //     mounted:function () {
  //       if(JSON.stringify(this.getUser)=='{}'){
  //         console.log("=========user===null=")
  //       }else {
  //         console.log("=========user===="+this.getUser)
  //       }
  //     }
  //   }
  import HomeHeader from "./components/Header"
  import HomeSwiper from './components/Swiper'
  import HomeIcons from './components/Icons'
  import HomeRecommend from './components/Recommend'
  import NewProduct from './components/NewProduct'
  import axios from 'axios'
  export default {
    name: "ProductHome",
    components:{
      HomeHeader,HomeSwiper,HomeIcons,HomeRecommend,NewProduct
    },
    data(){
      return {
        bannerList:[],
        hotList:[
          // {
          //   id:"1",
          //   name:"apple",
          //   productUrl:"http://img.cdn.imbession.top/combanner.png",
          //   price:"8848",
          //   subtitle:"sadasdasdasdasdas"
          // }


        ],
        newList:[]
      }
    },
    mounted() {
      this.getBannerInfo(),
        this.getHotInfo(),
        this.getNewInfo()

    },
    methods:{
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
