<template>
  <div class="container">
    <div class="header">
      <div class="search-box">
        <div>
          <span>订单</span>
        </div>
        <div class="search">
          <div>
            <i class="iconfont icon-sousuo flex-c"></i>
            <form action>
              <input type="search" @blur="getMyOrder" placeholder="搜索订单" v-model="keyword" />
            </form>
          </div>
        </div>
        <div class="searchIcon" @click="showSelect=!showSelect">
          <span>
            <i class="iconfont icon-shaixuan"></i>
          </span>
        </div>
      </div>

      <div class="type-box">
        <div class="type-item" v-show="showSelect">
          <div
            @click="typeSelect(item.label)"
            :class="selectIndex==item.label?'bgColor':''"
            v-for="(item,index) in selectList"
            :key="index"
          >
            <span>{{item.value}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="orderList.length>0">
      <div class="content">
        <div class="content-item" v-for="(items,index) in orderList" :key="index">
          <div @click="jumpDetail(items)">
            <div class="item-title">
              <div class="logo">
                <img :src="items.picturePath" alt />
              </div>
              <div class="item-right">
                <div class="item-con">
                  <div class="txt">
                    <span>{{items.dealerName}}</span>
                    <span>{{items.orderTime}}</span>
                  </div>

                  <div class="type">
                    <span>{{items.orderStatus==0?'待支付':(items.orderStatus==1?'已付款':(items.orderStatus==2?'已收货':(items.orderStatus==3?'已取消':(items.orderStatus==4?'已取消':(items.orderStatus==5?'已退款':'已取消')))))}}</span>
                  </div>
                </div>

                <div class="goods">
                  <div>
                    <span>
                      <span class="of">{{items.orderDetailList[0].productName}}</span>
                      ({{items.orderDetailList[0].payUnit}})
                    </span>
                    <span>等{{items.amount}}件</span>
                  </div>
                  <div>
                    <span>￥{{items.totalPrice/100}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item-phone" @click="callPhone(items.phone)">
            <i class="iconfont icon-dianhua"></i>
            <div>
              <span>退款协商</span>
            </div>
          </div>
        </div>
        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <p class="ptxt">已加载全部...</p>
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      <div>
        <img src="../../assets/empty.png" alt />
        <p>暂无搜索结果</p>
      </div>
    </div>
    <tabBar activeChange="order"></tabBar>
  </div>
</template>

<script>
import TabBar from "../../components/tabBar";
import { Toast, InfiniteScroll } from "mint-ui";
import { getMyOrder, getCompanyUserInfo } from "../../api/restApi.js";
export default {
  components: {
    tabBar: TabBar
  },
  name: "",
  data() {
    return {
      userId: "",
      page: 1,
      keyword: "",
      pageSize: 19,
      loading: true,
      step: -1,
      userInfo: "",
      title: "订餐系统",
      phoneNumber: "",
      showSelect: false,
      selectIndex: 0,
      orderList: [],
      selectList: [
        { label: 0, value: "全部" },
        { label: 1, value: "已取消" },
        { label: 2, value: "已付款" },
        { label: 3, value: "已收货" },
        { label: 4, value: "已退款" }
      ]
    };
  },
  created() {
    this.userId = localStorage.getItem("uuid");
    console.log("userId", this.userId);
    this.getCompanyUserInfo();
  },
  mounted() {},
  methods: {
    // 滚动加载
    loadMore() {
      this.loading = true;
      console.log("触发");
      setTimeout(() => {
        this.page++;
        console.log("页", this.page);
        this.getMyOrder();
      }, 500);
    },
    // 跳转详情
    jumpDetail(e) {
      this.$router.push({ name: "orderDetail", params: { detail: e } });
    },
    // 用户信息
    getCompanyUserInfo() {
      getCompanyUserInfo
        .create({
          workCode: this.userId
        })
        .then(res => {
          console.log("用户信息", res);
          if (res.code == 0) {
            this.userInfo = res.data;
            this.getMyOrder(res.data.accNum);
          }
        })
        .catch(err => {
          console.log("报错信息getCompanyUserInfo", err);
        });
    },
    // 获取订单
    getMyOrder() {
      getMyOrder
        .create({
          accNum: this.userInfo.accNum,
          page: this.page,
          type: this.selectIndex,
          keyword: this.keyword
        })
        .then(res => {
          console.log("订单list", res);
          // console.log(this.page, res);
          if (res.code == 0) {
            if (this.page == 1) {
              this.orderList = res.data;
              // console.log("orderList",this.orderList);
            } else {
              this.orderList = this.orderList.concat(res.data);
            }
            this.loading = false;
            if (res.data.length < this.pageSize) {
              this.loading = true;
            }
          }
        })
        .catch(err => {
          console.log("报错信息getMyOrder ", err);
        });
    },
    // 选择状态
    typeSelect(e) {
      this.page = 1;
      this.loading = true;
      this.selectIndex = e;
      setTimeout(() => {
        this.showSelect = !this.showSelect;
        this.getMyOrder();
      }, 300);
    },
    // 打电话
    callPhone(e) {
      window.location.href = "tel://" + e;
    }
  }
};
</script>

<style lang='scss' scoped>
.container {
  background: #f7f7f7;
}
.header {
  border-bottom: 1px solid #e6e4e4;
  background: #fff;
  position: relative;
  // border: 1px solid red;
  .search-box {
    // border: 1px solid red;
    width: 100%;
    height: 53px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      width: 79px;
      // border: 1px solid red;
      text-align: center;
    }
    .search {
      // border: 1px solid red;
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        border-radius: 16px;
        width: 218px;
        height: 32px;
        display: flex;
        background: #ecedee;
        align-items: center;
        justify-content: flex-start;
        font-size: 0.9rem;
        i {
          width: 1rem;
          height: 1rem;
          margin-left: 2rem;
          //   border: 1px solid red;
          font-size: 0.9rem;
        }
        input {
          padding-left: 1rem;
          font-size: 0.75rem;
          background: #ecedee;
        }
      }
    }
    .searchIcon {
      // border: 1px solid red;
      width: 79px;
      text-align: center;
      i {
        font-size: 1rem;
      }
    }
  }
  .type-box {
    position: relative;
    width: 100%;
    bottom: 0;
    .type-item {
      width: 100vw;
      box-shadow: 1px 3px 10px #e6e4e4;
      position: fixed;
      height: 217px;
      z-index: 999;
      background: #fff;
      > div {
        text-align: center;
        height: 43px;
        line-height: 43px;
      }
      > div:nth-of-type(4),
      > div:nth-of-type(1) {
        border: none;
      }
      > div {
        border-top: 1px solid #f5f5f5;
        border-bottom: 1px solid #f5f5f5;
      }
      .bgColor {
        background: #e03325;
        color: #fff;
      }
    }
  }
}
.content {
  padding: 1rem 0;
  height: calc(100vh - 225px);
  background: #f7f7f7;
  overflow-y: scroll;
  .content-item {
    background: #fff;
    margin: 0 auto;
    padding: 16px;
    height: 118px;
    width: 320px;
    border-radius: 15px;
    margin-bottom: 10px;
    // overflow: hidden;
    box-shadow: 1px 1px 10px #999;
    color: #636565;
    .item-title {
      //   border: 1px solid red;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      .logo {
        // border: 1px solid red;
        width: 38px;
        height: 38px;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .item-right {
        width: 80%;
        // border: 1px solid red;
        padding-left: 0.5rem;
        .item-con {
          //   border: 1px solid red;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ddd;
          .txt {
            // border: 1px solid red;
            font-size: 0.875rem;
            display: flex;
            flex-direction: column;
            font-size: 0.93rem;
            > span:nth-of-type(2) {
              padding: 0.3rem 0;
            }
          }
          .type {
            // border: 1px solid red;
            font-size: 16px;
            color: rgb(99, 101, 101);
            text-align: center;
            // padding-bottom: 1rem;
          }
        }
        .goods {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #ddd;
          font-size: 1rem;
          > div:nth-of-type(1) {
            width: 75%;
            // border:1px solid #222;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            > span:nth-of-type(1) {
              // border: 1px solid blue;
              display: flex;
              max-width: 70%;
              font-size: 14px;
              > span:nth-of-type(1) {
                // border: 1px solid red;
                max-width: 70%;
                display: inline-block;
                padding-right: 0.5rem;
              }
            }
            > span:nth-of-type(2) {
              // border: 1px solid green;
              width: 30%;
              padding-left: 0.5rem;
            }
          }
        }
      }
    }
  }

  .item-phone {
    // border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    > i {
      width: 1.5rem;
      height: 1.5rem;
      text-align: center;
      line-height: 1.5rem;
      font-size: 1rem;
      color: #e03325;
      margin-left: 17px;
      margin-top: 10px;
    }
    > div {
      font-size: 0.875rem;
      margin-right: 18px;
      margin-top: 10px;
    }
  }
}
.ptxt {
  text-align: center;
  font-size: 0.8rem;
}
</style>
