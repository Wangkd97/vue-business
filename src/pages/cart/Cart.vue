<template>

  <div>
    这是购物车组件
    <button @click="setUserInfo('lisi')">点击修改</button>
  </div>

</template>

<script>
  import { mapActions } from 'vuex'
    export default {
        name: "Cart",
      data(){
          return {
            status:-100
          }
      },

      mounted(){
          this.getCarts()
      },

      methods:{

         ...mapActions(['setUserInfo']),

          getCarts:function(){
           var  _vm=this
            this.service.get("/portal/cart/list.do").then(function(response){
              console.log(response)
              _vm.status=response.data.status
            }).catch(function (error) {
              console.log(error);
            });
          }
      }
    }
</script>

<style >

</style>
