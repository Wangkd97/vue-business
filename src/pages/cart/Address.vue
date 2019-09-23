<template>
    <div>
      <div>
        <mt-header title="选择收货地址">
          <router-link to="/" slot="left">
            <mt-button icon="back" @click="back">返回</mt-button>
          </router-link>
          <mt-button icon="" slot="right" @click="toAddAddress">添加</mt-button>
        </mt-header>
      </div>
      <div v-for="item in addressList">
        <br>
        <div >
          <div style="width: 70%;float: left"  @click="selectAddress(item)">
            <span>{{item.receiverName}}</span> <span>{{item.receiverPhone}}</span> <br>
            <span>详细地址:{{item.receiverProvince}}{{item.receiverCity}}{{item.receiverDistrict}}{{item.receiverAddress}}</span>
          </div>
          <div style="width: 20%;float: left">
            <span @click="editAddress(item)">修改</span>
            <!--   @click="tomodify(item.id)"-->
          </div>
        </div>

        <div>
          <br>
          <br>
          <hr>
        </div>

      </div>


    </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "Address",
      data(){
        return {
          addressList:[],
        }
      },
      methods:{
        ...mapActions(['isShowFooterBar']),
        ...mapActions(['setAddress','setJudgeAddress','setChangeAddress','setIsShowFooterBar','setaddressId']),
        selectAddress:function (item) {
          this.setAddress(item)
          console.log("=======xuanzedizhiid==========="+item.id)
          this.setaddressId(item.id)
          console.log("选中订单")
          console.log(item)
          this.setJudgeAddress(true)
          console.log("选中订单true")
          this.$router.go(-1)
        },
        editAddress:function (item) {
          this.setAddress(item)
          console.log("选中订单")
          console.log(item)
          this.setChangeAddress(true)
          this.$router.push("/MnewAddress")
        },
        back:function () {
          this.$router.go(-1)
        },
        getAddress:function () {
          var _vm=this
          this.service.post("/shipping/lookShippingMessageList",{
          }).then(function (response) {
            console.log(response)
            _vm.addressList = response.data.data.shippings
            _vm.firstAddress=_vm.addressList[0]
            _vm.setAddress(_vm.firstAddress)
            console.log(_vm.addressList)
          })
            .catch(function (error) {
              console.log(error);
            });
        },
        tomodify:function (id) {
          this.$router.push({
            name:"MnewAddress",
            params:{
              id:id
            }
          })
        },
        toAddAddress:function () {
          this.$router.push({
            name:"MnewAddress",

          })
        }
      },
      created(){
        var _vm=this //去掉底部导航栏
        _vm.isShowFooterBar(false)
      },
      mounted(){
        // console.log(this.uid+"==========id=======");
        // this.getMainProInfo(this.uid)
        this.getAddress()

      },
    }
</script>

<style scoped>

</style>
