<template>
  <div class="container">
    <!-- <cl-header :title="title" :step="step"></cl-header> -->
    <div class="header">
      <span>重置密码</span>
    </div>
    <div class="content">
      <div class="content-form">
        <div class="item">
          <span>账号</span>
          <p style="color:#999;">{{userInfo.accNum}}</p>
        </div>
        <div class="item">
          <span>手机</span>
          <input
            type="number"
            placeholder="请输入手机号"
            v-model="myPhone"
            oninput="if(value.length>11)value=value.slice(0,11)"
          />
        </div>
        <div class="itemSp">
          <div>
            <span>验证码</span>
            <input type="text" placeholder="请输入验证码" v-model="vCode" />
          </div>
          <span @click="sendMsg()">发送</span>
        </div>
        <div class="item">
          <span>重置密码</span>
          <input type="password" placeholder="请输入密码" v-model="newPass" />
        </div>
      </div>
      <div class="cut"></div>
      <div class="cut"></div>
      <div class="content-btn">
        <div class="bindBtn" @click="getResetPass()">
          <span>重置密码</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入接口
import { getResetPass, getPhone } from "../../api/restApi.js";
import { MessageBox, Toast } from "mint-ui";

export default {
  components: {},
  name: "",
  data() {
    return {
      title: "订餐系统",
      myPhone: "",
      vCode: "",
      myAccnum: "",
      newPass: "",
      userInfo: {},
      step: -1,
      userId:"",

    };
  },
  created() {
    this.userInfo = this.$route.params.userInfo;
  },
  methods: {
    // 发送短信
    sendMsg() {
      let self = this;
      if (self.myPhone == "" || !self.myPhone) {
        let instance = Toast("请输入电话号码");
        setTimeout(() => {
          instance.close();
        }, 700);
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(self.myPhone)) {
        let instance1 = Toast("电话号码格式错误");
        setTimeout(() => {
          instance1.close();
        }, 700);
        return false;
      } else {
        getPhone
          .create({
            phone: this.myPhone
          })
          .then(res => {
            console.log("发送信息", res);
            if (res.code == 0) {
              let instance3 = Toast("信息已发送");
              setTimeout(() => {
                instance3.close();
              }, 700);
            }
          })
          .catch(err => {
            console.log("报错信息getPhone", err);
          });
      }
    },
    // 绑定一卡通
    getResetPass() {
      const self = this;
       if (self.myPhone == "" || !self.myPhone) {
        let instance = Toast("请输入电话号码");
        setTimeout(() => {
          instance.close();
        }, 700);
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(self.myPhone)) {
        let instance1 = Toast("电话号码格式错误");
        setTimeout(() => {
          instance1.close();
        }, 700);
        return false;
      } else if (this.vCode == "") {
        let instance2 = Toast("验证码不能为空");
        setTimeout(() => {
          instance2.close();
        }, 700);

        return false;
      } else if (this.newPass == "") {
        let instance3 = Toast("新密码不能为空");
        setTimeout(() => {
          instance3.close();
        }, 700);
        return false;
      } else {
        getResetPass
          .create({
            workCode: this.userInfo.workCode, // 工号
            phone: this.myPhone, // 一卡通注册手机号
            smsCode: this.vCode, //短信验证码
            accNum: this.userInfo.accNum, // 一卡通卡号
            password: this.newPass //设置的支付密码
          })
          .then(res => {
            console.log("重置密码", res);
            if (res.code == 0) {
              let instance4 = Toast("重置成功");
              setTimeout(() => {
                instance4.close();
              }, 700);
              this.$router.go(-1);
            }
          })
          .catch(err => {
            console.log("报错信息user", err);
            MessageBox("无法重置", err.data.message);
          });
      }
    }
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
.container {
  background: #fbf9f9;
  width: 100vw;
  height: 100vh;
}
.header {
  //   border: 1px solid red;
  text-align: center;
  padding: 1rem;
  background: #efefef;
  font-size: 1.2rem;
}
.content {
  //   border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // margin: .5rem;
  padding: 1rem 0rem 2rem 1rem;
  background: #fff;
  box-shadow: 1px 3px 10px #aaa;
  .content-form {
    // border: 1px solid red;
    // width: 100%;
    .itemSp {
      // border: 1px solid red;
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      > span {
        // border: 1px solid red;
        padding: 0.5rem 1rem;
        border: 1px solid #999;
        border-radius: 3px;
        margin-right: 1rem;
      }
      > div {
        // border: 1px solid red;
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        span {
          width: 20%;
          // border: 1px solid red;
        }
        input {
          width: 50%;
          border: 1px solid #999;
          padding: 0.5rem 0 0.5rem 0.8rem;
          margin-left: 2.3rem;
          border-radius: 3px;
        }
      }
    }
    .item {
      // border: 1px solid red;
      display: flex;
      justify-content: flex-start;
      padding: 0.5rem 0;
      align-items: center;
      p {
        text-align: center;
        // border: 1px solid red;
        width: 70%;
      }
      span {
        width: 20%;
        // border: 1px solid red;
      }
      input {
        width: 50%;
        border: 1px solid #999;
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
