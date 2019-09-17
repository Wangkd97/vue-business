<template>
  <div>
    <div>
      <mt-header title="新建收货地址">
        <router-link to="/" slot="left">
          <mt-button icon="back" @click="back">返回</mt-button>
        </router-link>
        <mt-button icon="" slot="right"></mt-button>
      </mt-header>
    </div>

    <div>
      <span>收货人：</span><input style="border-color: #3E3E3E;border: 2px">
      <br>
      <span>手机号：</span><input style="">
      <br>
      <span>所在地区：</span>
      <span>详细地址：</span><input name="detailaddress">
    </div>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "newAddress",
      data(){
        return {


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
      },
    }
</script>

<style scoped>

</style>
