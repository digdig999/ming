<template>
  <div class="container">
    <!-- <cl-header :title="title" :step="step"></cl-header> -->
    <div class="header">
      <span style="font-size:.93rem">解绑一卡通</span>
    </div>
    <div class="content">
      <div class="content-form">
        <div class="item">
          <span>账号</span>
          <p>{{userInfo.accNum}}</p>
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
            <input type="text" placeholder="请输入验证码" v-model="vCode"/>
            <span v-show="sendAuthCode" @click="sendMsg()" class="send">{{btnTitle}}</span>
            <span v-show="!sendAuthCode">{{yzmTitle}}</span>
          </div>
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
  import {getDisBindCard, getPhone} from "../../api/restApi.js";
  import {MessageBox, Toast} from "mint-ui";

  export default {
    components: {},
    name: "",
    data() {
      return {
        sendAuthCode: true,
        btnTitle: "发送",
        yzmTitle: "",
        title: "订餐系统",
        myPhone: "",
        vCode: "",
        step: -1,
        userId: ""
      };
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    },
    mounted() {
    },
    methods: {
      changePass() {
        this.earShow = !this.earShow;
        if ((this.ear = "password")) {
          this.ear = "text";
        } else {
          this.ear = "password";
        }
      },
      validateBtn() {
        //倒计时
        let time = 60;
        //默认样式，防止快速点击好几次
        this.sendAuthCode = false;
        this.yzmTitle = time + "s";
        let timer = setInterval(() => {
          if (time == 0) {
            clearInterval(timer);
            this.disabled = true;
            this.sendAuthCode = true;
            this.btnTitle = "发送";
          } else {
            this.yzmTitle = time + "s";
            this.sendAuthCode = false;
            time--;
          }
        }, 1000);
      },
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
                }, 700);
              }
            })
            .catch(err => {
              console.log("报错信息getDisBindCard", err);
              MessageBox("无法解绑", err.data.message);
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
                this.validateBtn();
              }
            })
            .catch(err => {
              console.log("报错信息getPhone", err);
            });
        }
      }
    }
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
    background: #fbf9f9;
    font-size: 1rem;
  }

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
          font-size: 0.8rem;
          color: #403c3c;
        }

        > span {
          width: 30%;
          color: #403c3c;

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
          color: #909090;
        }

        span {
          width: 30%;
          color: #403c3c;
          font-size: 0.93rem;
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
