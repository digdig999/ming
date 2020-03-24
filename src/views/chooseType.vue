<template>
  <div class="chooseType">
    <mt-header class="title" title="预定项目"></mt-header>
    <div class="content">
      <mt-button :class="type==='shift'?'btn btn-bg':'btn'" @click.native="chooseType('shift')">倒班楼</mt-button>
      <mt-button :class="type==='meeting'?'btn btn-bg':'btn'" @click.native="chooseType('meeting')">会议室</mt-button>
      <mt-button :class="type==='active'?'btn btn-bg':'btn'" @click.native="chooseType('active')">活动中心</mt-button>
      <!--<mt-button :class="type==='hotel'?'btn btn-bg':'btn'" @click.native="chooseType('hotel')">酒店</mt-button>-->
      <mt-button :class="type==='hotel'?'btn btn-bg':'btn'" @click.native="chooseType('dining')">食堂</mt-button>
           <!-- <mt-button :class="type==='hotel'?'btn btn-bg':'btn'" @click.native="chooseType('band')">订餐</mt-button> -->
    </div>
  </div>
</template>

<script>
  import { getUrlKey } from '../util/urlParams';
  export default {
    name: "chooseType",
    data(){
      return{
        type:'shift'
      }
    },
    created(){
      let uuid = getUrlKey("uuid",window.location.href);
      localStorage.setItem('uuid',uuid);
      // localStorage.setItem('uuid',this.$route.query.uuid);

      console.log("uuid",uuid);
    },
    methods:{
      chooseType(type){
        this.type=type
        if(type=='dining'){
          this.$router.push({path:'/homePage/dining'})
        }else if(type=='band'){
          this.$router.push({name:"band"})
        }
        else{
          this.$router.push({path:'/homePage/home',query:{chooseType:type}})
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .chooseType{
    .title{
      position: fixed;
      top:0;
      z-index: 999;
      width: 100%;
      height: 50px;
      padding: 10px;
      background-color: #FF2C2C;
      font-size:16px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }
    .content{
      min-height: 100vh;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .btn{
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin-bottom: 20px;
        background-color: #fff;
        text-align: center;
        border-radius: 5px;
        -moz-box-shadow: 5px 5px 5px #E3E3E3;
        box-shadow: 5px 5px 5px #E3E3E3;
        font-size: 16px;
        font-weight: 500;
        border: 1px solid #eee;
      }
      .btn-bg{
        background-color: #FF2C2C;
        color: #fff;
      }
    }
  }
</style>
