<template>
    <div>
      <div>
        <mt-header title="编辑收货地址">
          <router-link to="/" slot="left">
            <mt-button icon="back" @click="back">返回</mt-button>
          </router-link>
          <mt-button icon="" slot="right"></mt-button>
        </mt-header>
      </div>

      <div>
        <span>收货人：</span><input :placeholder="address.receiverName"><br>
        <span>手机号：</span><input :placeholder="address.receiverMobile"><br>
        <span>所在地区：</span>
        <span>详细地址：</span><input name="detailaddress" :placeholder="address.receiverAddress"><br>
      </div>
      <button @click="">确定</button>

    </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "modifyAddress",
      data(){
        return {
          addressid:this.$route.params.id,
          address:"",
        }
      },
      created(){
        var _vm=this //去掉底部导航栏
        _vm.isShowFooterBar(false)
      },
      methods: {
        ...mapActions(['isShowFooterBar']),
        back: function () {
          this.$router.go(-1)
        },
        getAddress:function (id) {
          var _vm=this
          this.service.post("/shipping/lookShippingMessage",{
            shippingId:id
          }).then(function (response) {
            console.log(response)
            _vm.address = response.data.data

            console.log(_vm.address)
          })
            .catch(function (error) {
              console.log(error);
            });
        }
        
      },
      mounted(){
        // console.log(this.uid+"==========id=======");
        // this.getMainProInfo(this.uid)
        this.getAddress(this.addressid)

      },

    }
</script>

<style scoped>

</style>
