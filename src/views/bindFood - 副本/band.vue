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
        <div class="bandItme" @click="jump(item)">
          <div class="img">
            <img :src="item.picturePath" alt />
          </div>
          <div class="txt">
            <span>{{item.dealerName}}</span>
          </div>
        </div>
      </div>
    </div>
    <tabBar activeChange="band"></tabBar>
  </div>
</template>

<script>
import TabBar from "../../components/tabBar";
//引入接口
import { getDealerList } from "../../api/restApi.js";
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
      dealerNum: ""
    };
  },
  created() {
    // console.log("地址",this.$route.query.uuid);
    if (this.$route.query.uuid!=undefined) {
      localStorage.setItem("uuid", this.$route.query.uuid);
    }
    // this.userId = localStorage.getItem("uuid");
    this.getDealerList();
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // B 跳转到 A 时，让 A 缓存，即不刷新
    next();
  },
  methods: {
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
    jump(e) {
      console.log("品牌", e);
      this.$router.push({
        name: "foodIndex",
        params: { band: e }
      });
    }
  },
  mounted() {}
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
        font-size: 0.7rem;
        padding-bottom: 0.2rem;
      }
    }
  }
}
</style>
