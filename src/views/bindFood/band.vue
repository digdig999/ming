<template>
  <div>
    <!-- <cl-header :title="title" :step="step"></cl-header> -->
    <div class="header">
      <div class="title">
        <i class="iconfont icon-huangguan"></i>
        <span>选择品牌</span>
      </div>
    </div>
    <div class="content">
      <div class="content-item" v-for="(item,index) in bandList" :key="index">
        <div class="bandItme" @click="jumpFood(item)">
          <div class="img">
            <img :src="item.picturePath" alt />
          </div>
          <div class="txt">
            <span>{{item.dealerName}}</span>
          </div>
        </div>
      </div>
      <div style="height:88px;"></div>
    </div>
    <tabBar activeChange="band"></tabBar>
  </div>
</template>

<script>
import TabBar from "../../components/tabBar";
//引入接口
import { getDealerList, getCompanyUserInfo } from "../../api/restApi.js";
export default {
  components: {
    tabBar: TabBar
  },
  name: "",
  data() {
    return {
      step: -1,
      title: "订餐系统",
      bandList: [],
      dealerNum: "",
      shopCartList: {
        totalNum: 0,
        totalPrice: 0,
        list: []
      }
    };
  },
  created() {
    this.getDealerList();
  },

  mounted() {
    if (this.$route.query.uuid != undefined) {
      localStorage.setItem("uuid", this.$route.query.uuid);
      console.log(11111);
      let uuid = this.$route.query.uuid;
      this.getCompanyUserInfo(uuid);
    }
  },
  methods: {
    // 清空购物车
    resetCart() {
      this.$set(this.shopCartList, "totalNum", 0);
      this.$set(this.shopCartList, "totalPrice", 0);
      this.$set(this.shopCartList, "list", []);
      localStorage.setItem("cart", JSON.stringify(this.shopCartList));
    },
    // 用户信息
    getCompanyUserInfo(e) {
      getCompanyUserInfo
        .create({
          workCode: e
        })
        .then(res => {
          console.log("用户信息", res);
          if (res.code == 0) {
            // this.userInfo = res.data;
            localStorage.setItem("userInfo", JSON.stringify(res.data));
          }
        })
        .catch(err => {
          console.log("报错信息getCompanyUserInfo", err);
        });
    },
    getDealerList() {
      getDealerList
        .create({})
        .then(res => {
          console.log("餐厅列表", res);
          if (res.code == 0) {
            this.bandList = res.data;
          }
        })
        .catch(err => {
          console.log("报错信息user", err);
        });
    },
    jumpFood(e) {
      console.log("品牌", e);
      localStorage.setItem("band", JSON.stringify(e));
      this.resetCart();
      this.$router.push({
        name: "foodIndex"
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.header {
  // border: 1px solid red;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  i {
    font-size: 1.5rem;
    color: #6ccfca;
  }
}
.content {
  // border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  .content-item {
    // border: 1px solid red;
    // background: blue;
    width: 49vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    padding: 0.3rem 0;
    .bandItme {
      width: 90%;
      height: 80%;
      // border: 1px solid red;
      box-shadow: 3px 3px 10px 3px #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      .img {
        width: 100%;
        // border: 1px solid red;
        img {
          width: 100%;
          height: 15vh;
        }
      }
      .txt {
        font-size: 0.75rem;
        padding-bottom: 0.3rem;
        color: #222222;
      }
    }
  }
}
</style>
