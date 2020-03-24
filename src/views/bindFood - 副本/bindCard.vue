<template>
  <div class="container">
    <!-- <cl-header :title="title" :step="step" ref="header"></cl-header> -->
    <!-- <div class="head">
      <i @click="jump()" class="iconfont icon-jiantou1"></i>
      <span>{{title}}</span>
    </div> -->
    <div class="header">
      <span>绑定一卡通</span>
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
          <span>设置密码</span>
          <input type="password" placeholder="请输入密码" v-model="myPass" />
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
  </div>
</template>

<script>
//引入接口
import { getCompanyUserBind, getPhone } from "../../api/restApi.js";
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
      myPass: "",
      step: -1,
      userInfo: {},
      fromAdr: "",
      userId:"",

    };
  },
  created() {
    console.log("bangding", this.$route.params.band);
    this.userInfo = this.$route.params.userInfo;
    if (this.$route.params.band != "undefined") {
      this.band = this.$route.params.band;
    }
  },
  // mounted() {},
  // beforeRouteEnter(to, from, next) {
  //   // console.log("to",to);
  //   // console.log("from",from);
  //   // console.log("next",next);
  //   // from(vm => {
  //   //   console.log("sss",vm.fromAdr);
  //   //   vm.fromAdr = from.name;
  //   // });
  //   console.log(next);
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  //   // 设置下一个路由的 meta
  //   console.log("from",from);
  //   if (to.name=='foodIndex') {
  //     console.log("不刷新");
  //     to.meta.keepAlive =true;
  //   } else {
  //     to.meta.keepAlive =false;
  //   }
  //   // B 跳转到 A 时，让 A 缓存，即不刷新
  //   next();
  // },
   mounted() {
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  methods: {
       goBack (){
        console.log("点击了浏览器的返回按钮");
        let test='测试1111111';
        this.$router.replace({path:'/bindFood/foodIndex',query:{band:this.band}})
        // this.$router.push({name:'foodIndex',params:{band:this.obj.band}})
        // sessionStorage.clear();
        // window.history.back();
        // history.pushState(null, null, document.URL);
    }, 
    jump() {
      if (this.$route.params.band != undefined) {
        this.$router.push({ name: "chooseType" });
        this.$router.push({ name: "band" });
        this.$router.push({
          name: "foodIndex",
          params: {
            band: this.band
          }
        });
      } else {
        this.$router.go(-1);
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
    },
    // 绑定一卡通
    getCompanyUserBind() {
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
      } else if (this.myPass == "") {
        let instance3 = Toast("密码不能为空");
        setTimeout(() => {
          instance3.close();
        }, 700);
        return false;
      } else {
        getCompanyUserBind
          .create({
            workCode: this.userInfo.workCode, // 工号
            phone: this.myPhone, // 一卡通注册手机号
            smsCode: this.vCode, //短信验证码
            accNum: this.userInfo.accNum, // 一卡通卡号
            password: this.myPass //设置的支付密码
          })
          .then(res => {
            console.log("绑定一卡通", res);
            if (res.code == 0) {
              let instance4 = Toast("绑定成功");
              setTimeout(() => {
                instance4.close();
              }, 700);
              if (this.$route.params.band != undefined) {
                this.$router.push({ name: "chooseType" });
                this.$router.push({ name: "band" });
                this.$router.push({
                  name: "foodIndex",
                  params: {
                    band: this.band
                  }
                });
              } else {
                this.$router.go(-1);
              }
            }
          })
          .catch(err => {
            console.log("报错信息getCompanyUserBind", err);
            MessageBox("无法绑定", err.data.message);

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
  .head {
    width: 100%;
    height: 8vh;
    font-size: 1rem;
    text-align: center;
    position: relative;
    z-index: 999;
    line-height: 8vh;
    background: #e03325;
    color: #fff;
    > i {
      position: absolute;
      left: 1rem;
      font-size: 0.8rem;
    }
  }
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
      align-items: center;
      padding: 0.5rem 0;
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
