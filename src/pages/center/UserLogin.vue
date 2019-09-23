<template>

  <div>

    <mt-header title="用户登录">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>


    <mt-field label="用户名" placeholder="请输入用户名"  name="username" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" name="password" v-model="password"></mt-field>
    <mt-button type="primary"  size="large" @click="userLogin">登录</mt-button>





  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import {mapActions} from 'vuex'
    export default {
        name: "UserLogin",
        data(){
          return {
            username:"",
            password:""
          }
        },
      methods:{
          ...mapActions(['setUserInfo']),
        userLogin:function () {

            if(this.username==''||this.password==''){
              Toast('用户名或密码为空');
            }else{
              var _vm=this;
              //通过axios
              this.service.post("/user/login.do",{
                //  params:{
                "username":this.username,
                "password":this.password
                //  }
              }).then(function (response) {
                console.log(response);
                if(response.data.status==0&&response.data.wrongMsg==null){
                  //当用户登录成功后，将用户信息保存到vuex中
                  _vm.setUserInfo(response.data.data)
                  _vm.$router.push("/my")
                 // _vm.$router.push("/my")
                }else{
                  Toast('用户不存在或密码错误')
                }

              })
                .catch(function (error) {
                  console.log(error);
                });
            }



        },
        back:function () {
          this.$router.go(-1)
        }
      }
    }
</script>

<style >

</style>
