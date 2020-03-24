<template>
  <div class="login">
    <mt-field class="login-item" label="登录" placeholder="请输入用户名" v-model="loginName"></mt-field>
    <mt-field class="login-item" label="密码" placeholder="请输入密码" type="passwd" v-model="passwd"></mt-field>
    <mt-field label="图片验证码">
      <img :src="imageCode" >
    </mt-field>
    <mt-button class="login-btn" @click="gotoType">登录</mt-button>
  </div>
</template>

<script>
  //引入接口
  import { getImageCodeApi,loginApi } from '../api/restApi.js';

  export default {
    name: "login",
    data(){
      return{
        loginName:'',
        passwd:'',
        imageCode:''
      }
    },
    created(){
      this.getImage();
    },
    methods:{
      getImage(){
        //获取图片
        getImageCodeApi.find({},{responseType: 'arraybuffer'})
          .then(res => {
            console.log('图片',res)
            if(res){
              console.log(111);
              // this.imageCode = res;
              this.imageCode = 'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((res, byte) => res + String.fromCharCode(byte), ''))
            }
          })
          .catch(err=>{
            console.log('报错信息',err)
          })
      },
      //登录
      gotoType(){
        loginApi.create({
          loginName:this.loginName,
          passwd:this.passwd,
          imageCode:2
        })
          .then(res => {
            console.log('登录',res)
            if(res.code==0){
              this.$router.push({path:'/chooseType'})
            }
          })
          .catch(err=>{
            console.log('报错信息',err)
          })
      }
    },
  }
</script>

<style lang="less">
.login{
  padding: 20px;
  .login-item{
    .mint-cell-value{
      margin: 10px 0;
      padding: 10px;
      border: 1px #eee solid;
    }
  }
  .login-btn{
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
    color: #fff;
    background-color: #FF2C2C;
  }
}

</style>
