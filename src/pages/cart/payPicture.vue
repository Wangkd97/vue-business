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
  import { Toast } from 'mint-ui';
    export default {
      name: "payPicture",
      data() {
        return {
          imgSrc: this.$route.params.imgSrc,
          orderId: this.$route.params.orderId,
          count: "",//倒计时
          timer:null
        }
      },
      methods: {

        back: function () {
          this.$router.go(-1)
        },
        findstatus: function (orderId) {
          console.log("aaaaaaaaa"+orderId)
          var _vm = this;
          //通过axios
          this.service.post("/portal/order/searPayStatus", {
            "orderNo": orderId,
          }).then(function (response) {
            console.log(response);
            if (response.data.status == 0 && response.data.data != false && JSON.stringify(response.data.data) == '{}') {
              Toast('支付成功')
              _vm.$router.go(-1)
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        },
        threeGo() {
          const TIME_COUNT = 5;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                //跳转的页面写在此处
                this.$router.push({
                  path: 'myorder'
                });
              }
            }, 1000)
          }


        },
        goGrdoupRecor(){
          const TIME_COUNT = 5;
          if(!this.timer){
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(()=>{
              if(this.count > 0 && this.count <= TIME_COUNT){
                this.count--;
              }else{
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                //跳转的页面写在此处
                this.$router.push('/myOrder')
              }
            },1000)
          }
        },
        mounted() {
          this.threeGo()
          console.log(this.orderId + "=====orderid=======")
          if (this.orderId != '' || this.orderId != null) {
            this.timer = window.setInterval(() => {
              setTimeout(this.findstatus(this.orderId), 0)
            }, 3000)
          }
          this.goGrdoupRecor()
          this.timer=setInterval(this.findstatus,1000)
        },

      }
    }


</script>

<style scoped>

</style>
