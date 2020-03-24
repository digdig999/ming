<template>
  <div class="container">
    <!-- <cl-header :title="title" :step="step"></cl-header> -->
    <!-- <div class="head">
      <i @click="cancelOrder()" class="iconfont icon-jiantou1"></i>
      <span>{{title}}</span>
    </div>-->
    <div class="content">
      <div class="content-top">
        <div class="content-title">
          <div class="img">
            <img :src="band.picturePath" alt />
          </div>
          <div class="title">
            <span>{{band.dealerName}}</span>
            <!-- <span>每日订餐</span> -->
          </div>
        </div>
        <div class="content-item">
          <div class="item" v-for="(item,index) in shopCartList.list" :key="index">
            <span>
              {{item.productName}}
              <span
                style="padding-left:.3rem"
              >({{item.quantity}}{{item.payUnit}})</span>
            </span>
            <span style="color:#000;font-size:.9rem">￥{{item.quantity*item.price/100}}</span>
          </div>
          <!-- <div class="item">
            <span>实物卷抵用金额</span>
            <span>
              无可用卷
              <i class="iconfont icon-xiangyou"></i>
            </span>
          </div>-->
          <div class="item">
            <span>支付方式</span>
            <span style="color:#E03325">
              一卡通支付
              <i class="iconfont icon-xiangyou"></i>
            </span>
          </div>
        </div>
        <div class="content-price">
          <div class="phone">
            <i @click="callPhone()" class="iconfont icon-dianhua"></i>
            <span>服务电话</span>
          </div>
          <div class="price">
            <span>实付</span>
            <span>￥{{shopCartList.totalPrice/100}}</span>
          </div>
        </div>
      </div>
      <div style="height:20px"></div>
      <div class="content-bot">
        <div class="takeType">
          <span>{{takeType}}</span>
        </div>
        <div class="item">
          <span>{{phoneType}}</span>
          <span>{{userInfo.phone}}</span>
        </div>
        <div class="item">
          <span>{{address}}</span>
          <span style="color:#999">{{type}}</span>
        </div>
        <!-- <div class="itemText">
          <span>{{notes}}</span>
          <input type="text" v-model="remark" maxlength="150">
        </div>-->
        <div class="itemText">
          <span>{{notes}}</span>
          <textarea v-model="remark" maxlength="150"></textarea>
        </div>
      </div>
      <div style="height:10vh"></div>
      <div class="payBox">
        <div v-show="canPay" class="payBtn" @click="createOrder()">
          <span>确定下单</span>
        </div>
      </div>
    </div>
    <div v-show="paymentShow" @click="paymentShow=!paymentShow" class="back"></div>

    <div class="payment" v-show="paymentShow">
      <div class="close" @click="closePay()">
        <i class="iconfont icon-close"></i>
      </div>
      <div class="pay-top">
        <span>支付订单</span>
        <p>￥{{shopCartList.totalPrice/100}}</p>
      </div>
      <div class="pay-bot">
        <div class="pay-type">
          <span>支付方式</span>
          <span>一卡通支付</span>
        </div>
        <div class="pay-pass">
          <div>
            <input v-show="earShow" type="password" placeholder="请输入密码" v-model="myPass" />
            <input v-show="!earShow" type="text" placeholder="请输入密码" v-model="myPass" />
            <i v-show="earShow" @click="changePass()" class="ear iconfont icon-yanjing_bi"></i>
            <i v-show="!earShow" @click="changePass()" class="ear iconfont icon-yanjing-zheng"></i>
          </div>

          <span>
            一卡通余额
            <span>{{cardMoney}}</span>元
          </span>
        </div>
        <div class="payMoney" @click="surePay()">
          <span>确定支付</span>
        </div>
      </div>
    </div>
    <div class="back" v-show="cancelShow"></div>
    <!-- 支付完返回的状态 -->
    <div class="icontip" v-show="successShow">
      <i class="iconfont icon-gou success"></i>
      <span>{{success?success:'支付成功'}}</span>
    </div>
    <div class="icontip" v-show="failShow">
      <i class="iconfont icon-untitled96 fail"></i>
      <span>{{err?err:'支付失败'}}</span>
    </div>
    <div class="cancels" v-show="cancelShow">
      <div class="txt">
        <span>是否取消订单</span>
      </div>
      <div class="btn">
        <span @click="cancelOrder()">取消订单</span>
        <span class="bgColor" @click="goPay()">继续支付</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getCreateOrder, getDoPay, getCardMoney } from "../../api/restApi.js";
import { Indicator, Toast, MessageBox } from "mint-ui"; //加载

export default {
  components: {},
  name: "",
  data() {
    return {
      myPass: "",
      step: -2,
      title: "订单系统",
      address: "配送地址",
      type: "自提",
      phoneType: "联系方式",
      phone: "",
      notes: "订单备注",
      takeType: "配送信息",
      shopCartList: "",
      paymentShow: false,
      cancelShow: false,
      successShow: false,
      failShow: false,
      canPay: true,
      create: false,
      userId: "",
      cardMoney: "",
      err: "",
      success: "",
      earShow: true,
      remark: ""
    };
  },
  created() {
    this.shopCartList = this.$route.params.shopCartList;
    this.band = JSON.parse(localStorage.getItem("band"));
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
    // 清空购物车
    resetCart() {
      this.$set(this.shopCartList, "totalNum", 0);
      this.$set(this.shopCartList, "totalPrice", 0);
      this.$set(this.shopCartList, "list", []);
      localStorage.setItem("cart", JSON.stringify(this.shopCartList));
    },
    // 生成订单
    createOrder() {
      this.getCardMoney();
      let shopList = JSON.stringify(this.shopCartList.list);
      if (!this.create) {
        console.log("订单第一次生成");
        getCreateOrder
          .create({
            accNum: this.userInfo.accNum, // 一卡通卡号
            dealerNum: this.band.dealerNum, //一次只能对一个商家下单
            shopList: JSON.parse(shopList),
            remark: this.remark
          })
          .then(res => {
            console.log("下订单", res);
            if (res.code == 0) {
              this.resetCart();
              this.orderCode = res.data;
              this.paymentShow = !this.paymentShow;
              this.create = true;
            }
          })
          .catch(err => {
            console.log("报错信息getCreateOrder", err);
            // console.log(err.data.message);
            // alert(err.data.message);
            MessageBox("无法购买", err.data.message);
          });
      } else {
        console.log("已生成");
        this.paymentShow = !this.paymentShow;
      }
    },
    //余额查询
    getCardMoney() {
      getCardMoney
        .create({
          accNum: this.userInfo.accNum // 一卡通卡号
        })
        .then(res => {
          console.log("余额", res);
          if (res.code == 0) {
            this.cardMoney = res.data.balance;
          }
        })
        .catch(err => {
          console.log("报错信息getCardMoney", err);
        });
    },
    // 支付
    surePay() {
      // console.log("订单号",this.orderCode);
      if (this.orderCode == undefined) {
        Toast("订单不存在,暂时无法支付");
        return false;
      } else if (this.myPass == "") {
        Toast("请输入支付密码");
        return false;
      } else {
        this.paymentShow = false;
        Indicator.open({
          text: "支付中...",
          spinnerType: "fading-circle"
        });
        getDoPay
          .create({
            orderNo: this.orderCode.orderNo,
            password: this.myPass
          })
          .then(res => {
            Indicator.close();
            console.log("支付", res);
            if (res.code == 0) {
              this.success = res.message;
              console.log(res.message);
              this.successShow = true;
              this.canPay = false;
              setTimeout(() => {
                this.successShow = false;
                this.$router.back(-2);
              }, 1000);
            } else {
              this.failShow = true;
              this.canPay = false;
              setTimeout(() => {
                this.failShow = false;
                this.$router.back(-2);
              }, 1000);
            }
          })
          .catch(err => {
            Indicator.close();
            this.failShow = true;
            this.canPay = false;
            this.err = err.data.message;
            setTimeout(() => {
              this.failShow = false;
              this.$router.back(-2);
            }, 2000);
            console.log("报错信息getDoPay", err);
          });
      }
    },
    // 关闭支付窗口 弹出继续支付
    closePay() {
      this.paymentShow = !this.paymentShow;
    },
    goPay() {
      this.paymentShow = !this.paymentShow;
      this.cancelShow = !this.cancelShow;
    },

    // 打电话
    callPhone() {
      window.location.href = "tel://" + this.band.phone;
    },

    goBack() {
      console.log("返回点餐");
      // if (this.create) {
      //   this.resetCart();
      // }
      sessionStorage.clear();
      this.$router.replace({
        path: "/bindFood/foodIndex"
      });
    }
  },
  mounted() {
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  }
};
</script>

<style lang='scss' scoped>
.container {
  background: #f7f7f7;
  // height: 100vh;
  width: 100vw;
  position: relative;
  .back {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba($color: #000, $alpha: 0.3);
    z-index: 11;
  }
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
  .icontip {
    // border: 1px solid red;
    position: fixed;
    top: 40vh;
    bottom: 40vh;
    left: 25vw;
    right: 25vw;
    background: rgba($color: #000, $alpha: 0.4);
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    border-radius: 5px;
    padding: 1rem 0;
    span {
      color: #fff;
    }
    i {
      background: #fff;
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid red;
    }
    .success {
      color: #52c41a;
    }
    .fail {
      color: #e03325;
    }
  }
}
.content {
  //   border: 1px solid red;
  padding: 1rem;
  position: relative;
  overflow-y: scroll;
  height: 84vh;

  .content-top {
    // border: 1px solid red;
    border-radius: 10px;
    padding: 0.5rem;
    background: #fff;
    box-shadow: 0px 3px 10px #999;
    .content-title {
      //   border: 1px solid red;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0.5rem 0;
      .img {
        // border: 1px solid red;
        width: 38px;
        height: 38px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        border-bottom: 1px solid #ddd;
        width: 80%;
        padding: 0.5rem;
        margin-left: 2%;
        span {
          //   padding-left: 10px;
          font-size: 1.1rem;
          font-weight: 500;
        }
      }
    }
    .content-item {
      //   border: 1px solid red;
      font-size: 0.9rem;
      .item {
        padding: 0.5rem 0 0.5rem 10vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        span {
          display: flex;
          //   border: 1px solid red;
          i {
            // border: 1px solid red;
            display: block;
            width: 1rem;
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
          }
        }
      }
    }
    .content-price {
      //   border: 1px solid red;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      font-size: 1rem;
      .phone {
        display: flex;
        align-items: center;
        > i {
          //   border: 1px solid red;
          display: block;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: #999;
          color: #e03325;
        }
        span {
          padding-left: 0.5rem;
        }
      }
      .price > span:nth-of-type(2) {
        font-size: 1rem;
      }
    }
  }
  .content-bot {
    border-radius: 10px;
    padding: 0.5rem 1rem;
    background: #fff;
    box-shadow: 0px 3px 10px #999;
    .takeType {
      // border: 1px solid red;
      font-size: 1.1rem;
      font-weight: 500;
      color: #222;
    }
    .item {
      // border: 1px solid red;
      color: #666;
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      font-size: 0.9rem;
    }
    .itemText {
      // border: 1px solid #222;
      color: #666;
      padding: 0.5rem 1rem;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      font-size: 0.9rem;
      > span {
        // border:1px solid red;
        flex: 2;
      }
      textarea {
        flex: 5;
        // border: 1px solid red;
        height: 4rem;
      }
      input {
        // border: 1px solid red;
        padding: 0.5rem 1rem;
      }
    }
  }
}
.payBox {
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .payBtn {
    // border: 1px solid red;
    padding: 0.5rem 3.5rem;
    font-size: 0.93rem;
    text-align: center;
    border-radius: 30px;
    background: #e03325;
    color: #fff;
  }
}

.payment {
  // border: 1px solid red;
  position: fixed;
  left: 10vw;
  right: 10vw;
  top: 25vh;
  height: 22rem;
  z-index: 999;
  padding: 0 1rem;
  background: #fff;
  border-radius: 10px;
  .close {
    // border: 1px solid red;
    width: 1.3rem;
    height: 1.3rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 1rem;
    }
  }
  .pay-top {
    border-bottom: 1px solid #d8d8d8;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    span {
      padding: 0.5rem 0;
      text-align: center;
      font-size: 1.06rem;
    }
    p {
      font-size: 2.125rem;
      color: #000000;
    }
  }
  .pay-pass {
    width: 100%;
    height: 50%;
    // border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
    input {
      width: 100%;
      border: 1px solid #dbdbdb;
      text-align: center;
      padding: 0.5rem 0;
      margin-top: 1rem;
      color: #b1b1b1;
      font-size: 0.875rem;
      background: #fbfbfb;
    }
    > div {
      // border: 1px solid red;
      width: 100%;
      position: relative;
    }
    i {
      position: absolute;
      right: 1rem;
      top: 1.5rem;
      // top: 0rem;
    }
    > span {
      // border: 1px solid red;
      font-size: 0.75rem;
      > span {
        // border: 1px solid red;
        color: #e03325;
        font-size: 0.875rem;
      }
    }
  }
  .pay-bot {
    height: 55%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    // border: 1px solid red;
    .pay-type {
      // height: 30%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0;
      font-size: 0.875rem;
      // border: 1px solid red;
      span:nth-of-type(1) {
        color: #b1b1b1;
      }
      span:nth-of-type(2) {
        color: #353636;
        font-weight: 500;
      }
    }
    .payMoney {
      position: absolute;
      // border: 1px solid red;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 1rem;
      margin: 0 auto;
      background: #e03325;
      color: #fff;
      padding: 0.5rem 3rem;
      border-radius: 15px;
      font-size: 1rem;
    }
  }
}
.cancels {
  // border: 1px solid red;
  position: fixed;
  left: 10vw;
  right: 10vw;
  top: 40vh;
  z-index: 999;
  height: 8rem;
  background: #fff;
  .txt {
    // border: 1px solid red;
    height: 65%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }
  .btn {
    height: 35%;
    // border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      // border: 1px solid red;
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }
    .bgColor {
      background: #e03325;
      color: #fff;
    }
  }
}
</style>
