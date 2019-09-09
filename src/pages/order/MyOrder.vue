<template>
  <div >

    <div>
      <mt-header title="我的订单">
        <router-link to="/" slot="left">
          <mt-button icon="back" @click="back">返回</mt-button>
        </router-link>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>

    </div>

    <!--navbar-->
    <div class="page-navbar">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item id="1">全部订单</mt-tab-item>
        <mt-tab-item id="2">未付款</mt-tab-item>
        <mt-tab-item id="3">已付款</mt-tab-item>
        <mt-tab-item id="4">已发货</mt-tab-item>
        <mt-tab-item id="5">已取消</mt-tab-item>
      </mt-navbar>

      <div>
        <!--<mt-cell class="page-part" title="当前选中">{{ selected }}</mt-cell>-->
      </div>

      <div id="corder_loadmore" ref="wrapper" :style="{height:this.wrapperHeight+'px'}">
        <mt-loadmore :top-method="loadTop"
                     :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded"
                     ref="loadmore"
                     :autoFill="autoFill">
          <!-- tab-container -->
          <mt-tab-container v-model="selected">

            <mt-tab-container-item id="1">
              <ul>
                <!--自定义组件原生事件要加native修饰符-->
                <li class="orderItem_container" @click.native="clickOrderItem(order)"
                    v-for="order in this.orderList"
                    :key="order.orderNo">

                  <div class="orderContainer">
                    <div class="orderinfo">
                      <span class="orderNo" v-text="'订单号: ' + order.orderNo"></span>
                      <span  class="orderStatus" v-text=" order.statusDesc"></span>
                    </div>
                    <div class="orderContentContainer">
                      <ul>
                        <li class="orderItemContainer" v-for="orderItem in order.orderItemVoList" :key="order.orderNo">
                          <img class="productImage" :src="'http://img.cdn.imbession.top/'+orderItem.productImage" >
                          <div class="OrderItemInfo">
                            <p  class="productName" v-text="orderItem.productName"></p>
                            <p  class="quantity" v-text="'数量'+orderItem.quantity"></p>
                            <p class="totalprice" v-text="'总价格￥'+(orderItem.currentUnitPrice*orderItem.quantity)"></p>

                          </div>
                        </li>
                      </ul>
                      <div class="orderBtnDiv">
                        <mt-button class="orderBtn" size="small">{{getorderDesc(order)}}</mt-button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </mt-tab-container-item>


            <mt-tab-container-item id="2">
              <mt-cell v-for="n in 20" :title="'测试 ' + n" :key="n*20"></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
              <mt-cell v-for="n in 20" :title="'选项 ' + n" :key="n*100" ></mt-cell>
            </mt-tab-container-item>
          </mt-tab-container>
        </mt-loadmore>
      </div>
    </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import {mapActions} from 'vuex'
  export default {
    name: "MyOrder",
    data(){
      return {
        selected:"1",
        allLoaded:false,
        pageModel:{},
        // orderList:[],
        autoFill:true,
        wrapperHeight:0
      }
    },
    computed:{
      orderList:function () {

        return this.pageModel.orderViewObjectList
      }
    },
    methods:{
      back:function () {
        this.$router.go(-1)
      },
      clickOrderItem:function (order) {

        Toast('提示信息');
      },

      ...mapActions(['isshowFooterBar']),
      loadTop:function() {
        this.getMyOrderList('refresh',1,1)

        // 加载更多数据
        // this.$refs.loadmore.onTopLoaded();
      },
      loadBottom:function() {
        // 加载更多数据
        console.log("=======加载更多===")
        // this.$refs.loadmore.onBottomLoaded();
        console.log(this.pageModel.pageNum);
        if(this.pageModel.hasNextPage){
          this.getMyOrderList("loadmore",this.pageModel.pageNum+1,10)
        }else{
          this.allLoaded=true
          this.$refs.loadmore.onBottomLoaded();
        }

      },
      getMyOrderList:function (optype,pageNo,pageSize) {
        var _vm=this
        this.service.post("/portal/order/searchOrderList",{
          "userID":this.userID,
          "pageNum":1,
          "size":100
        })
          .then(function(response){


            //_vm.orderList.push(response.data.data.list);
            console.log(response.data.data)
            console.log(response.data.data.orderViewObjectList)
            console.log(response.data.data.orderViewObjectList)

            if(optype=='refresh'){
              _vm.pageModel=response.data.data
              _vm.$refs.loadmore.onTopLoaded();
              _vm.allLoaded=false
            }else if(optype=='loadmore'){
              if(response.data.data.list.length>0){

                const oldOrders= _vm.pageModel.list
                console.log("=========旧数据===")
                console.log(oldOrders)
                var orderItem;
                // for( var i=0 ;i<oldOrders.length;i++){
                // response.data.data.list.splice(0,0,oldOrders[i])

                // }
                var newArrayOrder=oldOrders.concat(response.data.data.list)
                response.data.data.list=newArrayOrder
                console.log("=========新数据===")
                console.log( response.data.data.list)

              }else{
                //加载完成
                _vm.allLoaded = true;// 若数据已全部获取完毕
              }
              _vm.pageModel=response.data.data
              console.log("loadmore=")
              console.log( _vm.pageModel.list)
              _vm.$refs.loadmore.onBottomLoaded();

            }


          })
          .catch(function (error) {
            console.log(error)
          })
      },
      getorderDesc(order){
        if(order.status==10){
          return "去支付"
        }

      }
    },
    watch:{
      selected:function(newval,oldval){

        console.log("============newvale===="+newval)
        this.getMyOrderList('refresh',1,10)

        /**
         * 我的上拉下拉是个切换卡，因为loadmore是同一个容器，所以你往上拉的时候，点击另一个tab它的内容就会定位到上一个tab拉到的位置处
         在tab切换时增加滚到顶部即可
         * */
        var loadme=document.getElementById('corder_loadmore');
        loadme.scrollTop=0
      }
    },
    created() {

      console.log("=========created===order==")
      this.isshowFooterBar(false)
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

          _vm.isshowFooterBar(false)
        }else{
          _vm.isshowFooterBar(true)
        }
      }

    },
    mounted(){
      this.getMyOrderList('refresh',1,10)
      console.log("=====mounted====")

      this.wrapperHeight = document.documentElement.clientHeight
        -this.$refs.wrapper.getBoundingClientRect().top;
      console.log(this.wrapperHeight)
     // Toast("gaodu="+this.wrapperHeight)
      this.isshowFooterBar(false)

    }
  }
</script>

<style scoped lang="stylus">
  /*@import "~styles/mixins.styl"*/
  #corder_loadmore
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; // 解决ios滑动不流畅的问题
    .orderItem_container
      width 95%
      margin 0px auto
      background #f0f0f0
      border-radius .1rem
      .orderContainer
        width 90%
        margin 0px auto
        .orderinfo
          display flex
          margin-top .2rem
          justify-content space-between
          padding-top .2rem
          padding-bottom .2rem
          border-bottom 1px solid #ffffff
      list-style none
      .orderContentContainer
        margin-top: .4rem

        .orderItemContainer
          display flex
          margin-top .2rem

          .OrderItemInfo
            width 90%
            margin-left .2rem
            position relative
            /*background red*/
            display flex
            flex-direction column
          .productImage
            width 1rem
            height 1rem
          .productName
            overflow :hidden
            white-space :nowrap
            text-overflow:ellipsis
          .quantity
            margin-top .1rem
          .totalprice
            margin-top .1rem
      .orderBtnDiv
        position relative
        /*background yellow*/
        height .9rem

      .orderBtn
        position absolute
        right .2rem
        bottom .2rem






</style>
