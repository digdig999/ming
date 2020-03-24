<template>
  <div class="container">
    <div class="mine">
      <div class="img">
        <div>
          <img src="../../assets/mine.jpg" alt />
        </div>
      </div>
      <div class="msg">
        <p>{{userInfo.accName}}</p>
        <span>部门: {{userInfo.depName}}</span>
        <span>工号: {{userInfo.workCode}}</span>
      </div>
    </div>
    <div style="height:10px"></div>
    <div class="bind" @click="goBind('bind')">
      <span>绑定一卡通</span>
      <i class="iconfont icon-xiangyou"></i>
    </div>
    <div style="height:1px;background:#e6e4e4;"></div>
    <div class="bind" @click="goBind('pass')">
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
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  methods: {
    // 绑定一卡通
    goBind(e) {
      getCompanyUserInfo
        .create({
          workCode: this.userId
        })
        .then(res => {
          console.log("用户信息", res);
          if (res.code == 0) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            if (res.data.hasOpenCard) {
              if (e == "bind") {
                this.$router.push({
                  name: "disBindCard"
                });
              } else {
                this.$router.push({
                  name: "resetPass"
                });
              }
            } else {
              this.$router.push({
                name: "bindCard"
              });
            }
          }
        })
        .catch(err => {
          console.log("报错信息getCompanyUserInfo", err);
        });
    },

  }
};
</script>

<style lang='scss' scoped>
.container {
  background: #f4f4f4;
  width: 100vw;
  height: 100vh;
}
.mine {
  // border: 1px solid red;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  // box-shadow: 1px 5px 10px #e6e4e4;
  background: #fff;
  .img {
    width: 35%;
    // border: 1px solid red;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      // border: 1px solid red;
      height: 7rem;
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .msg {
    width: 60%;
    // border: 1px solid red;
    margin-left: 0.5rem;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    height: 7rem;
    p {
      font-size: 1.25rem;
      padding-bottom: 0.5rem;
      font-weight: 500;
      color: #434343;
    }
    span {
      padding-bottom: 0.5rem;
      color: #aaa8a8;
      font-size: 1rem;
    }
  }
}
.bind {
  // border:1px solid red;
  background: #fff;
  padding: 1.5rem 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #403c3c;
  // box-shadow: 1px 5px 20px #e6e4e4;
  i {
    color: #999;
  }
}
</style>
