<template>
  <div>
<div>
  <mt-header title="支付">
    <router-link to="/" slot="left">
      <mt-button icon="back" @click="back">返回</mt-button>
    </router-link>
    <!--<mt-button icon="more" slot="right"></mt-button>-->
  </mt-header>


</div>


    <img :src="'http://'+imgSrc">



  </div>




</template>

<script>

    export default {
        name: "payPicture",
      data(){
        return {
          imgSrc:this.$route.params.imgSrc,
          orderId:this.$route.params.orderId,
        }
      },
    methods: {

      back: function () {
        this.$router.go(-1)
      },
      findstatus:function(orderId){
        var _vm=this;
        //通过axios
        this.service.post("/portal/order/searPayStatus",{
          "orderNo":orderId,
        }).then(function (response) {
          console.log(response);
          if(response.data.status==0){
            Toast('支付成功')
              _vm.$router.go(-1)
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      }

    },
      mounted(){
        console.log(this.orderId+"=====orderid=======")
        if (this.orderId!=''||this.orderId!=null){
        this.timer=  window.setInterval(() => {
            setTimeout(this.findstatus(this.orderId), 0)
          }, 3000)
        }
      },
      beforeDestroy(){
          clearInterval(this.timer)
      },
      destroyed(){
        clearInterval(this.timer)
      }

    }
</script>

<style scoped>

</style>
