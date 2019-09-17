
    <!--<div>-->

      <!--<p v-text="optxex" @click="logic"></p>-->
      <!--<p @click="clickMyOrder">我的订单</p>-->

    <!--</div>-->
  <template>
    <div class="me">
      <div class="info">
        <div class="img-wrapper">
          <img :src="imgUrl" alt=""><!--http://127.0.0.1/touxiang.jpg -->
        </div>
        <p class="phone" v-text="optxex"  @click="logic"></p>
        <router-link tag="div" class="nickname-wrapper" to="/UserCenter">

          <i class="zhlf-19 icon"></i>
        </router-link>
      </div>
      <!--<div class="order-menu">-->
        <!--<div class="order-title">-->
          <!--<div class="my-orders">我的订单</div>-->
          <!--<div class="others">-->
            <!--查看全部-->
            <!--<i class="zhlf-17"></i>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="top-menu">-->
        <!--<div class="top-menu-item">-->
          <!--<i class="zhlf-15 gray"></i>-->
          <!--<span class="title">待付款</span>-->
        <!--</div>-->
        <!--<div class="top-menu-item">-->
          <!--<i class="zhlf-4 gray"></i>-->
          <!--<span class="title">待分享</span>-->
        <!--</div>-->
        <!--<div class="top-menu-item">-->
          <!--<i class="zhlf-21 gray"></i>-->
          <!--<span class="title">待发货</span>-->
        <!--</div>-->
        <!--<div class="top-menu-item">-->
          <!--<i class="zhlf-2 gray"></i>-->
          <!--<span class="title">待收货</span>-->
        <!--</div>-->
        <!--<div class="top-menu-item">-->
          <!--<i class="zhlf-uniE902 gray"></i>-->
          <!--<span class="title">待评价</span>-->
        <!--</div>-->
      <!--</div>-->
      <div @click="clickMyOrder">
        <mt-cell  value="我的订单" @click="clickMyOrder"></mt-cell>
        <!--<p @click="clickMyOrder">我的订单</p>-->
      </div>
      <div @click="layout">
        <mt-cell  value="退出登录" @click="layout"></mt-cell>
      </div>
      </div>

  </template>

<script>
  import { Cell } from 'mint-ui';

  import {mapGetters} from 'vuex'
    export default {
        name: "my",
      data(){
          return {
            imgUrl:"http://127.0.0.1/123.png",
            optxex:"请登陆",
            isLogin:false
          }
      },
      computed:{
         ...mapGetters(['getUser']),


      },
      mounted(){

          if(JSON.stringify( this.getUser)=='{}'){
             this.optxex="去登陆"
             this.isLogin=false
          }else{
            this.optxex="用户名："+this.getUser.username
            this.imgUrl="http://127.0.0.1/touxiang.jpg "
            this.isLogin=true
          }

      },
      methods:{

        logic:function () {

          if(this.isLogin){
            //已经登录
            this.$router.push("/usercenter")
          }else{
            //未登录
            this.$router.push("/login")
          }

        },
        clickMyOrder:function () {
          this.$router.push("/myorder")
        },
        layout:function () {
          var _vm=this
          this.service.post("/user/logout.do",{

          }).then(function (response) {
            console.log(response);
            if (response.data.status==0){
              _vm.$router.go(0)
            }

          })
            .catch(function (error) {
              console.log(error);
            });
        }
      }

    }
</script>

<!--<style scoped>-->

<!--</style>-->
    <style scoped lang="stylus" ref="stylesheet/stylus">
      .info
        width 100%
        display flex
        flex-direction row
        align-items center
        padding 20px
        .img-wrapper
          width 80px
          height 80px
          margin-right 10px
          overflow hidden
          background-color #fafafa
          background-size contain
          img
            display block
            width 80px
            height 80px
            border-radius 50%


    </style>
