<template>
  <div class="wrapper">


  <swiper :options="swiperOption" >
    <!-- slides -->

    <!--<swiper-slide><img class="swiper-img" src="http://img.cdn.imbession.top/combanner.png"></swiper-slide>-->
    <!--<swiper-slide>22222</swiper-slide>-->
    <!--<swiper-slide>33333</swiper-slide>-->
    <swiper-slide v-for="(item,index) of banners" :key="index " v-if="index<4" data-swiper-autoplay="3000">
      <img class="swiper-img" @click="swiperclick(item.id)" :src="'http://img.cdn.imbession.top/'+item.mainImage"/>
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
  </div>
</template>

<script>
    export default {
        name: "HomeSwiper",
        props:{
          banners:Array
        },
        data (){
          return {
            swiperOption:{
              pagination:'.swiper-pagination',
              loop:true,
              autoplay: true
            }
          }
        },
      methods:{
        swiperclick:function(id){
          this.$router.push({
            name:"goodsInfo",
            params: {
              id: id
            }
          })
        }
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
</style>
