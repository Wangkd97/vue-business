
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
      <div class="order-menu">
        <div class="order-title">
          <div class="my-orders">我的订单</div>
          <div class="others">
            查看全部
            <i class="zhlf-17"></i>
          </div>
        </div>
      </div>
      <div class="top-menu">
        <div class="top-menu-item">
          <i class="zhlf-15 gray"></i>
          <span class="title">待付款</span>
        </div>
        <div class="top-menu-item">
          <i class="zhlf-4 gray"></i>
          <span class="title">待分享</span>
        </div>
        <div class="top-menu-item">
          <i class="zhlf-21 gray"></i>
          <span class="title">待发货</span>
        </div>
        <div class="top-menu-item">
          <i class="zhlf-2 gray"></i>
          <span class="title">待收货</span>
        </div>
        <div class="top-menu-item">
          <i class="zhlf-uniE902 gray"></i>
          <span class="title">待评价</span>
        </div>
      </div>
      <div class="middle-menu top-menu">
          <button >设置</button>
        <p @click="clickMyOrder">我的订单</p>
      </div>

      </div>

  </template>

<script>

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
        .nickname-wrapper
          display flex
          flex-direction row
          align-items center
          .phone
            font-size 20px
            color #151516
          .icon
            padding-left 10px
            font-size 30px
            color #12b7f6
      .order-menu
        background white
        padding 10px 20px
        .order-title
          display flex
          flex-direction row
          justify-content space-between
          .my-orders
            font-size 17px
            color #151516
          .others
            font-size 13px
            color #999
      .top-menu
        display flex
        flex-direction row
        justify-content space-between
        padding 10px 20px
        background white
        margin-bottom 10px
        .top-menu-item
          display flex
          flex-direction column
          align-items center
          .gray
            margin-bottom 5px
            font-size 24px
            color #9c9c9c
            font-weight 400
          .red
            font-size 24px
            color #e02e24
          .title
            font-size 13px
            padding-top 5px
            color #58595b
      .bottom-menu
        display flex
        flex-direction row
        justify-content space-between
        flex-wrap wrap
        padding-top 20px
        background white
        .bottom-menu-item
          width 25%
          display flex
          flex-direction column
          align-items center
          padding-bottom 20px
          .yellow
            color orange
            font-size 24px
            padding-bottom 5px
          span
            font-weight normal
            font-size 13px
            color #58595b
    </style>
