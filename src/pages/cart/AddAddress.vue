<template>
    <div>
      <div>
        <mt-header title="新建收货地址">
          <router-link to="/" slot="left">
            <mt-button icon="back" @click="back">返回</mt-button>
          </router-link>
          <mt-button icon="more" slot="right"></mt-button>

        </mt-header>
      <hr>
      添加收货地址
    </div>
      </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "AddAddress",
      methods:{
        ...mapActions(['isShowFooterBar']),
        back:function () {
          this.$router.go(-1)

        },
      },
      created(){
        var _vm=this //去掉底部导航栏
        _vm.isShowFooterBar(false)
      }
    }
</script>

<style scoped>

</style>
