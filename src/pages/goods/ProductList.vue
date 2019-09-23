<template>
  <div>
    <mt-header title="">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="lastpage">返回</mt-button>
      </router-link>
    </mt-header>

    <div id="corder_loadmore" ref="wrapper" :style="{height:this.wrapperHeight+'px'}">
      <mt-loadmore :top-method="loadTop"
                   :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   ref="loadmore"
                   :autoFill="autoFill">
        <ul>
          <router-link
            tag="li"
            class="item border-bottom"
            v-for="(item,index) of pageModel.products"
            :key="index"
            :to="{name:'goodsInfo',params:{id:item.id}}">
            <img class="item-img" :src="'http://img.cdn.imbession.top/'+item.mainImage"/>
            <div class="item-info">
              <p class="item-title">{{item.name}} </p>
              <p class="item-desc">{{item.subtitle}}</p>
              <p class="item-price">{{item.price|formatMoney}}</p>
            </div>
          </router-link>
        </ul>
      </mt-loadmore>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
    export default {
        name: "ProductList",
      data(){
          return {
            wrapperHeight:0,
            autoFill:true,
            allLoaded:false,
            pageModel:{},
            keyword:"",
            categoryId:""
          }
      },
      methods:{
          ...mapGetters(['getProductList','getKeyword','getCategoryId']),
        ...mapActions(['setIsShowFooterBar']),
        lastpage:function () {
          this.$router.go(-1)
          this.setIsShowFooterBar(true)
        },
        loadTop:function() {
          this.getProductList('refresh',1,10,this.keyword,this.categoryId)

          // 加载更多数据
          // this.$refs.loadmore.onTopLoaded();
        },
        loadBottom:function() {
          // 加载更多数据
          console.log("=======加载更多===")
          // this.$refs.loadmore.,'();
          console.log(this.pageModel.pageNum);
          if(this.pageModel.hasNextPage){
            this.getProductList("loadmore",this.pageModel.pageNum+1,10,this.keyword,this.categoryId)
          }else{
            this.allLoaded=true
            this.$refs.loadmore.onBottomLoaded();
          }
        },
        getProductList:function (optype,pageNo,pageSize,keyword,categoryId) {
          var _vm=this
          if(keyword==null){
            console.log("if==================="+categoryId+"========cateid===")
            this.service.post("/portal/product/portalSerchaProduct",{
              "pageNum":pageNo,
              "size":pageSize,
              "categoryId":categoryId
            }).then(function(response){
              //_vm.orderList.push(response.data.data.list);
              console.log(response)
              if(optype=='refresh'){
                _vm.pageModel=response.data.data
                //组件消失动画效果
                _vm.$refs.loadmore.onTopLoaded();
                _vm.allLoaded=false
              }else if(optype=='loadmore'){
                if(response.data.data.list.length>0){
                  const oldList= _vm.pageModel.products
                  console.log("=========旧数据===")
                  console.log(oldList)
                  // var orderItem;
                  // for( var i=0 ;i<oldOrders.length;i++){
                  // response.data.data.list.splice(0,0,oldOrders[i])
                  // }
                  //将旧列表中的数据和新列表中的数据合并，重新赋值
                  var newList=oldList.concat(response.data.data.products)
                  // 将新的数据返回给数据库
                  response.data.data.products=newList
                  console.log("=========新数据===")
                  console.log( response.data.data.products)
                }else{
                  //加载完成
                  _vm.allLoaded = true;// 若数据已全部获取完毕
                }
                _vm.pageModel=response.data.data
                console.log("loadmore=")
                console.log( _vm.pageModel.products)
                _vm.$refs.loadmore.onBottomLoaded();
              }
            })
              .catch(function (error) {
                console.log(error)
              })
          }else if(categoryId==null) {
            console.log("else==================")
            this.service.post("/portal/product/sousuo", {
              "pageNum": pageNo,
              "size": pageSize,
              "productName": keyword
            }).then(function(response){
              //_vm.orderList.push(response.data.data.list);
              console.log(response)
              if(optype=='refresh'){
                _vm.pageModel=response.data.data
                console.log(_vm.pageModel)
                //组件消失动画效果
               // _vm.$refs.loadmore.onTopLoaded();
                _vm.allLoaded=false
              }else if(optype=='loadmore'){
                if(response.data.data.list.length>0){
                  const oldList= _vm.pageModel.products
                  console.log("=========旧数据===")
                  console.log(oldList)
                  // var orderItem;
                  // for( var i=0 ;i<oldOrders.length;i++){
                  // response.data.data.list.splice(0,0,oldOrders[i])
                  // }
                  //将旧列表中的数据和新列表中的数据合并，重新赋值
                  var newList=oldList.concat(response.data.data.products)
                  // 将新的数据返回给数据库
                  response.data.data.products=newList
                  console.log("=========新数据===")
                  console.log( response.data.data.products)
                }else{
                  //加载完成
                  _vm.allLoaded = true;// 若数据已全部获取完毕
                }
                _vm.pageModel=response.data.data
                console.log("loadmore=")
                console.log( _vm.pageModel.products)
                _vm.$refs.loadmore.onBottomLoaded();
              }
            })
              .catch(function (error) {
                console.log(error)
              })
          }

        },
      },
      mounted() {
        this.setIsShowFooterBar(false)
        this.keyword=this.getKeyword()
        this.categoryId=this.getCategoryId()
        this.getProductList('refresh',1,10,this.keyword,this.categoryId)
        console.log("=====mounted====")

        // 界面高度-控件高度
        this.wrapperHeight = document.documentElement.clientHeight
          -this.$refs.wrapper.getBoundingClientRect().top;
        console.log(this.wrapperHeight)
      }
    }
</script>

<style scoped lang="stylus">
  @import '~styles/mixins.styl'
  #corder_loadmore
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; // 解决ios滑动不流畅的问题
  .item
    overflow :hidden
    height:1.9rem
    display :flex
    .item-img
      width :1.7rem
      height :1.7rem
      padding :.1rem
    .item-info
      flex:1
      padding .1rem
      min-width:0
      .item-title
        line-height: .54rem
        font-size :.32rem
        ellipsis()
      .item-desc
        line-height :.4rem
        color:#ccc
        ellipsis()
      .item-price
        margin-top:.16rem
        line-height :.32rem
        font-size :.32rem
        color:red
</style>
