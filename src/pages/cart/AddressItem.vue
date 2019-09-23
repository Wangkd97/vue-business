<template>
  <div>
    <mt-header title="收货地址">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="lastpage">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <mt-field label="收货人姓名" placeholder="请添加收货人姓名"  v-model="receiverName"></mt-field>
    <mt-field label="收货人手机号" placeholder="请添加收货人手机号" type="email" v-model="receiverMobile"></mt-field>
    <mt-field label="收货人电话" placeholder="请添加收货人电话"  type="tel" v-model="receiverPhone"></mt-field>
    <mt-field label="所在省份" placeholder="请添加收货人所在省份" v-model="receiverProvince"></mt-field>
    <mt-field label="所在城市" placeholder="请添加收货人所在城市" v-model="receiverCity"></mt-field>
    <mt-field label="所在县区" placeholder="请添加收货人所在县区" v-model="receiverDistrict"></mt-field>
    <mt-field label="详细地址" placeholder="请添加收货人详细地址" v-model="receiverAddress"></mt-field>
    <mt-field label="邮政编码" placeholder="请添加收货人邮政编码" type="number" v-model="receiverZip"></mt-field>
    <mt-button type="primary" size="large" @click="changeIt()">{{this.text}}</mt-button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
    export default {
        name: "AddressItem",
      data(){
          return{
            title:"",
            text:"",
            address:{},
            receiverName:null,
            receiverMobile:null,
            receiverPhone:null,
            receiverProvince:null,
            receiverCity:null,
            receiverDistrict:null,
            receiverAddress:null,
            receiverZip:null,
            id:null,
            userId:null
          }
      },
      methods:{
          ...mapGetters(['getAddress','getChangeAddress']),
        ...mapActions(['setChangeAddress','setIsShowFooterBar']),
        lastpage:function(){
            this.setChangeAddress(false)
          this.$router.go(-1)

        },
        changeIt:async function () {
          var _vm=this
          if(this.getChangeAddress()) {
            await this.service.post("/shipping/loginUpdateShipping", {
              "receiverName": _vm.receiverName,
              "receiverMobile": _vm.receiverMobile,
              "receiverPhone": _vm.receiverPhone,
              "receiverProvince": _vm.receiverProvince,
              "receiverCity": _vm.receiverCity,
              "receiverDistrict": _vm.receiverDistrict,
              "receiverAddress": _vm.receiverAddress,
              "receiverZip": _vm.receiverZip,
              "id": _vm.id,
              "userId": _vm.userId
            }).then(function (response) {
              console.log(response)
            }).catch(function (error) {
              console.log(error)
            })
          }
          else{
            await this.service.post("/shipping/addShipping", {
              "receiverName": _vm.receiverName,
              "receiverMobile": _vm.receiverMobile,
              "receiverPhone": _vm.receiverPhone,
              "receiverProvince": _vm.receiverProvince,
              "receiverCity": _vm.receiverCity,
              "receiverDistrict": _vm.receiverDistrict,
              "receiverAddress": _vm.receiverAddress,
              "receiverZip": _vm.receiverZip
            }).then(function (response) {
              console.log(response)
            }).catch(function (error) {
              console.log(error)
            })
          }
          _vm.setChangeAddress(false)
          _vm.$router.go(-1)
        }
      },
      mounted(){
          this.setIsShowFooterBar(false)
          if(this.getChangeAddress()){
            this.text="修改"
            this.title="修改收货地址"
            this.address=this.getAddress()
            this.receiverName=this.address.receiverName
            this.receiverMobile=this.address.receiverMobile
            this.receiverPhone=this.address.receiverPhone
            this.receiverProvince=this.address.receiverProvince
            this.receiverCity=this.address.receiverCity
            this.receiverDistrict=this.address.receiverDistrict
            this.receiverAddress=this.address.receiverAddress
            this.receiverZip=this.address.receiverZip
            this.id=this.address.id
            this.userId=this.address.userId
          }else{
            this.text="添加"
            this.title="添加收货地址"
          }

      }
    }
</script>

<style scoped lang="stylus">
  .changeAddress
    margin-left: 40%
    margin-top:0.3rem
    background-color #20a0ff
    color white
    font-size 0.4rem
    width 0.8rem
</style>
