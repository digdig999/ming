<template>
  <div class="container">
    <!-- <cl-header :title="title" :step="step"></cl-header> -->
    <div class="header">
      <span>解绑一卡通</span>
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
        <div class="cut"></div>
        <div class="content-btn">
          <div class="bindBtn" @click="getDisBindCard">
            <span>取消绑定</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDisBindCard, getPhone } from "../../api/restApi.js";
import { MessageBox, Toast } from "mint-ui";

export default {
  components: {},
  name: "",
  data() {
    return {
      title: "订餐系统",
      myPhone: "",
      vCode: "",
      step: -1,
      userId:"",

    };
  },
  created() {
    this.userInfo = this.$route.params.userInfo;
  },
  methods: {
    // 取绑
    getDisBindCard() {
      const self = this;
      if (self.myPhone == "" || !self.myPhone) {
        let instance = Toast("请输入电话号码");
        setTimeout(() => {
          instance.close();
        }, 700);
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(self.myPhone)) {
      // } else if (false) {
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
      } else {
        getDisBindCard
          .create({
            workCode: this.userInfo.workCode,
            phone: this.myPhone,
            smsCode: this.vCode,
            accNum: this.userInfo.accNum
          })
          .then(res => {
            console.log("解绑", res);
            if (res.code == 0) {
              let instance3 = Toast("解绑成功");
              setTimeout(() => {
                instance3.close();
              }, 700);
              setTimeout(() => {
                this.$router.go(-1);
              },700);
            }
          })
          .catch(err => {
            console.log("报错信息getDisBindCard", err);
            MessageBox("无法解绑", err.data.message);

            // let instance4 = Toast("解绑失败");
            // setTimeout(() => {
            //   instance4.close();
            // }, 700);
          });
      }
    },
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
      // } else if (false) {
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
  padding: 1rem 0rem 2rem 1rem;
  background: #fff;
  box-shadow: 1px 3px 10px #aaa;
  .content-form {
    // border: 1px solid red;
    width: 100%;
    .itemSp {
      // border: 1px solid red;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      > span {
        // border: 1px solid red;
        padding: 0.5rem 1rem;
        border: 1px solid #999;
        border-radius: 3px;
        margin-right: 1rem;
        font-size: 1.1rem;
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
      align-items: center;
      justify-content: flex-start;
      padding: 0.5rem 0;
      p {
        text-align: center;
        // border: 1px solid red;
        width: 70%;
      }
      span {
        width: 20%;
        // border: 1px solid red;
        font-size: 1.1rem;
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
      width: 70%;
      padding: 0.5rem 0;
      text-align: center;
      border-radius: 5px;
      color: #fff;
      font-size: 1rem;
    }
  }
}
</style>
