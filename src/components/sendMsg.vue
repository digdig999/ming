<template>
  <div>
    <div class="content-form">
      <div class="item">
        <span>账号</span>
        <p style="color:#999;">{{userInfo.accNum}}</p>
      </div>
      <div class="item">
        <span>手机号</span>
        <input
          type="number"
          placeholder="请输入手机号"
          v-model="myPhone"
          oninput="if(value.length>11)value=value.slice(0,11)"
        />
      </div>
      <div class="itemSp">
        <span>验证码</span>
        <div>
          <input type="text" placeholder="请输入验证码" v-model="vCode" />
          <span v-show="sendAuthCode" @click="sendMsg()" class="send">{{btnTitle}}</span>
          <span v-show="!sendAuthCode">{{yzmTitle}}</span>
        </div>
      </div>
      <div class="item">
        <span>设置密码</span>
        <input v-show="earShow" type="password" placeholder="请输入密码" v-model="myPass" />
        <input v-show="!earShow" type="text" placeholder="请输入密码" v-model="myPass" />
        <i v-show="earShow" @click="changePass()" class="ear iconfont icon-yanjing_bi"></i>
        <i v-show="!earShow" @click="changePass()" class="ear iconfont icon-yanjing-zheng"></i>
      </div>
      <div class="item">
        <span>重置密码</span>
        <input v-show="earShow" type="password" placeholder="请输入新密码" v-model="newPass" />
        <input v-show="!earShow" type="text" placeholder="请输入新密码" v-model="newPass" />
        <i v-show="earShow" @click="changePass()" class="ear iconfont icon-yanjing_bi"></i>
        <i v-show="!earShow" @click="changePass()" class="ear iconfont icon-yanjing-zheng"></i>
      </div>
    </div>
    <div class="cut"></div>
    <div class="cut"></div>
    <div class="content-btn">
      <div class="bindBtn" @click="getCompanyUserBind()">
        <span>绑定</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    earShow: {
      type: Boolean
    },
    phoneShow: {
      type: Boolean
    },
    vCodeShow: {
      type: Boolean
    },
    passShow: {
      type: Boolean
    },
    newPassShow: {
      type: Boolean
    },
    accNum: {
      type: Number
    },
    phone:{
        type:Number
    },
    myPass:{
        type:Number
    },
    newPass:{
        type:Number
    },
    vCode:{
        type:Number
    },

  },
  components: {},
  name: "",
  data() {
    return {};
  },
  created() {
    this.band = JSON.parse(localStorage.getItem("band"));
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  methods: {
    sendMsg() {
      this.$parent.sendMsg();
    }
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
.content {
  // border: 1px solid red;
  display: flex;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
  // margin: .5rem;
  padding: 1rem 1.5rem;
  background: #fff;
  box-shadow: 1px 3px 10px #e6e4e4;
  .content-form {
    width: 100%;
    .itemSp {
      // border: 1px solid red;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      overflow: hidden;
      .send {
        font-size: 0.9rem;
        color: #999;
      }
      > span {
        width: 30%;
        // border: 1px solid red;
      }

      > div {
        width: 60%;
        border: 1px solid #e6e4e4;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 3px;
        padding: 0 0.8rem 0rem 0rem;

        span {
          // border: 1px solid red;
        }
        input {
          width: 60%;
          padding: 0.5rem 0 0.5rem 0.8rem;
          // border: 1px solid red;
        }
      }
    }
    .item {
      // border: 1px solid red;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0.5rem 0;
      position: relative;
      > i {
        position: fixed;
        right: 2.5rem;
      }
      p {
        text-align: center;
        // border: 1px solid red;
        width: 60%;
      }
      span {
        width: 30%;
        // border: 1px solid red;
      }
      input {
        width: 60%;
        border: 1px solid #e6e4e4;
        padding: 0.5rem 0 0.5rem 0.8rem;
        margin-left: 1rem;
        border-radius: 3px;
      }
    }
  }
  .content-btn {
    //   border: 1px solid red;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .bindBtn {
      //   border: 1px solid red;
      background: #e03325;
      padding: 0.5rem 0;
      width: 70%;
      text-align: center;
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>
