<template>
  <div class="container">
    <!-- <cl-header :title="title" :step="step"></cl-header> -->
    <div class="mine">
      <div class="img">
        <img src alt />
      </div>
      <div class="msg">
        <strong>{{userInfo.accName}}</strong>
        <span>部门: {{userInfo.depName}}</span>
        <span>工号: {{userInfo.workCode}}</span>
      </div>
    </div>
    <div style="height:10px"></div>
    <div class="bind" @click="goBind">
      <span>绑定一卡通</span>
      <i class="iconfont icon-xiangyou"></i>
    </div>
    <div style="height:.5rem"></div>
    <div class="bind" @click="resetPass">
      <span>重置密码</span>
      <i class="iconfont icon-xiangyou"></i>
    </div>
    <tabBar activeChange="mine"></tabBar>
  </div>
</template>

<script>
import TabBar from "../../components/tabBar";
import { getCompanyUserInfo } from "../../api/restApi.js";

export default {
  components: {
    tabBar: TabBar
  },
  name: "",
  data() {
    return {
      title: "订餐系统",
      step: -1,
      userInfo: ""
    };
  },
  created() {
    this.userId = localStorage.getItem("uuid");
    this.getCompanyUserInfo();
  },
  mounted() {},
  methods: {
    // 绑定一卡通
    goBind() {
      if (this.userInfo.hasOpenCard) {
        this.$router.push({
          name: "disBindCard",
          params: {
            userInfo: this.userInfo
          }
        });
      } else {
        this.$router.push({
          name: "bindCard",
          params: {
            userInfo: this.userInfo
          }
        });
      }
    },
    // 重置密码
    resetPass() {
           if (this.userInfo.hasOpenCard) {
        this.$router.push({
          name: "resetPass",
          params: {
            userInfo: this.userInfo
          }
        });
      } else {
        this.$router.push({
          name: "bindCard",
          params: {
            userInfo: this.userInfo
          }
        });
      }
    },
    // 用户信息
    getCompanyUserInfo() {
      getCompanyUserInfo
        .create({
          workCode:this.userId
        })
        .then(res => {
          console.log("用户信息", res);
          if (res.code == 0) {
            this.userInfo = res.data;
            console.log(this.userInfo.accNum);
          }
        })
        .catch(err => {
          console.log("报错信息getCompanyUserInfo", err);
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.container {
  background: #efefef;
  width: 100vw;
  height: 100vh;
}
.mine {
  // border: 1px solid red;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
  box-shadow: 1px 1px 5px #999;
  background: #fff;
  .img {
    width: 35%;
    // border: 1px solid red;
    height: 5rem;
  }
  .msg {
    width: 60%;
    // border: 1px solid red;
    margin-left: 0.5rem;
    font-size: 1rem;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    strong {
      font-size: 1.3rem;
      padding: 0.5rem 0;
    }
    span {
      padding: 0.5rem 0;
      color: #999;
    }
  }
}
.bind {
  // border:1px solid red;
  background: #fff;
  padding: 1.5rem 1rem;
  font-weight: 500;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 1px 5px #999;
  i {
    font-size: 1.2rem;
    color: #999;
  }
}
</style>
