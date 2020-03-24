<template>
  <div class="container">
    <div class="foot">
      <div class="car-box">
        <!-- <div class="has"> -->
        <div class="has" v-show="shopCartList.totalNum>0">
          <div class="car">
            <div>
              <i @click="show()" class="iconfont icon-gouwucheman"></i>
              <div class="num">
                <span>{{shopCartList.totalNum}}</span>
              </div>
            </div>
            <span>￥{{shopCartList.totalPrice/100}}</span>
          </div>
          <div class="carBtn" @click="jumpSurePay()">
            <span>结算</span>
          </div>
        </div>
        <!-- <div class="nothing"> -->
        <div class="nothing" v-show="shopCartList.totalNum==0">
          <div class="noth">
            <div class="noCar">
              <i class="iconfont icon-gouwucheman"></i>
              <span>未选购商品</span>
            </div>
            <div class="noBtn">
              <span>结算</span>
            </div>
          </div>
        </div>
        <div class="cartListFixed" v-show="cartListShow">
          <div class="cartTitle">
            <span>已选商品</span>
            <span @click="clearCart">
              清空
              <i class="iconfont icon-lajitong"></i>
            </span>
          </div>
          <div class="cartBox">
            <ul>
              <li
                style="display:block"
                v-for="(itemCart,indexCart) in shopCartList.list"
                :key="indexCart"
              >
                <div class="cartItem">
                  <div class="itemName">
                    <span style="display:inline-block" class="of">{{itemCart.productName}}</span>
                    <span style="font-size:.8rem">({{itemCart.payUnit}})</span>
                  </div>
                  <div class="bot">
                    <span>￥{{itemCart.price*itemCart.quantity/100}}</span>
                    <div class="computed">
                      <div>
                        <i class="iconfont icon-icon--" @click="cartReduce(itemCart,indexCart)"></i>
                      </div>
                      <div>
                        <span>{{itemCart.quantity}}</span>
                      </div>
                      <div>
                        <i class="iconfont icon-jiahao" @click="cartAdd(itemCart,indexCart)"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bind" v-show="bindShow">
      <div class="txt">
        <div>
          <img src="../assets/gobind.png" alt />
        </div>
        <p>尚未绑定一卡通</p>
      </div>
      <div class="btn">
        <span @click="goBind('def')">取消</span>
        <span class="bgColor" @click="goBind('yes')">前往绑定</span>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox, Toast } from "mint-ui";
import { getCompanyUserInfo } from "../api/restApi.js";

export default {
  props: {
    userId: {
      type: String
    },
    shopCartList: {
      required: true,
      type: Object,
      default() {
        return [];
      }
    },
    cartListShow: {
      required: true,
      type: Boolean,
      default() {
        return [];
      }
    },
    bindShow: {
      type: Boolean
    }
  },
  components: {},
  name: "shopcart",
  data() {
    return {};
  },
  computed: {
    // 计算总价
    computAllPrice() {
      let totalNum = 0;
      let totalPrice = 0;
      this.shopCartList.list.forEach((x, i) => {
        totalNum += x.quantity;
        totalPrice += x.price * x.quantity;
      });
      totalPrice = parseInt(totalPrice * 100) / 100;
      this.$set(this.shopCartList, "totalPrice", totalPrice);
      this.$set(this.shopCartList, "totalNum", totalNum);
    }
  },
  methods: {
    // 绑定
    goBind(e) {
      if (e == "yes") {
        this.$router.push({
          name: "bindCard"
        });
      } else {
        this.$router.go(-1);
      }
    },
    show() {
      this.$parent.cartShow();
    },
    // 结算
    jumpSurePay() {
      localStorage.setItem("cart", JSON.stringify(this.shopCartList));
      getCompanyUserInfo
        .create({
          workCode: this.userId
        })
        .then(res => {
          console.log("用户信息", res);
          if (res.code == 0) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            if (res.data.hasOpenCard) {
              this.$router.push({
                name: "orderPay",
                params: { shopCartList: this.shopCartList }
              });
            } else {
              this.$parent.showBind();
            }
          }
        })
        .catch(err => {
          console.log("报错信息getCompanyUserInfo", err);
        });
    },
    // 购物车增加(前台)
    cartAdd(el, idx) {
      if (
        this.shopCartList.list[idx].quantity ==
        this.shopCartList.list[idx].productStock
      ) {
        let instance = Toast("已达上限");
        setTimeout(() => {
          instance.close();
        }, 700);
        return false;
      }
      this.shopCartList.list[idx].quantity++;
      this.computAllPrice;
    },
    // 购物车减少(前台)
    cartReduce(el, idx) {
      this.shopCartList.list[idx].quantity--;
      if (this.shopCartList.list[idx].quantity == 0) {
        this.shopCartList.list.splice(idx, 1);
      }
      this.computAllPrice;
      if (this.shopCartList.totalNum == 0) {
        this.$parent.cartShow();
      }
    },
    clearCart() {
      this.$parent.clearCart();
    }
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
.foot {
  // border: 1px solid red;
  width: 100vw;
  position: fixed;
  bottom: 0;
  height: 10vh;
  z-index: 99;
  background: rgba($color: #58595a, $alpha: 0.98);
  // overflow: hidden;
  .car-box {
    // border: 1px solid blue;
    width: 100%;
    height: 100%;
    height: 10vh;
    display: flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    align-items: center;
    justify-content: flex-start;
    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    -moz-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
    .has {
      display: flex;
      width: 100%;
      align-items: center;
      // justify-content: space-between;
      // border: 1px solid red;
      .car {
        // border: 1px solid red;
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        padding-left: 1rem;
        > div {
          position: relative;
          // border: 1px solid red;
          i {
            font-size: 2.5rem;
            color: #fff;
          }
          .num {
            // border: 1px solid red;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 16px;
            background: #ff6356;
            color: #fff;
            border-radius: 50%;
            position: absolute;
            left: 2rem;
            top: -5px;
            z-index: 9;
          }
        }

        > span {
          // border: 1px solid red;
          margin-left: 1rem;
          font-size: 18px;
          color: #ff6356;
        }
      }
      .carBtn {
        width: 25%;
        text-align: center;
        padding: 0.3rem 0;
        margin-right: 1rem;
        font-size: 1rem;
        color: #fff;
        background: #e03325;
        border-radius: 3px;
        // border: 1px solid red;
      }
    }
  }
  .nothing {
    // border: 1px solid red;
    width: 100%;
    .noth {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .noCar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // border: 1px solid red;
        padding-left: 1rem;

        i {
          font-size: 2.5rem;
          color: #fff;
        }
        span {
          padding-left: 1rem;
          color: #b2b2b2;
          font-size: 0.93rem;
        }
      }
      .noBtn {
        width: 25%;
        text-align: center;
        padding: 0.5rem 0;
        margin-right: 1rem;
        font-size: 0.93rem;
        color: #bfbfbf;
        background: #d8d8d8;
        border-radius: 3px;
      }
    }
  }
}
.cartListFixed {
  // border: 1px solid red;
  overflow: hidden;
  width: 100%;
  height: 35vh;
  position: fixed;
  z-index: 8500;
  left: 0;
  right: 0;
  bottom: 10vh;
  width: 100%;
  background: #fff;
  border-top: 1px solid #999;

  .cartTitle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
    background: #edeef0;
    height: 5vh;
    overflow: hidden;
    color: #999;

    i {
      padding-left: 0.2rem;
    }
    span {
      padding: 0.5rem;
      // border: 1px solid red;
    }
  }
  .cartBox {
    width: 100%;
    height: 30vh;
    // border: 1px solid red;
    overflow-y: scroll;
    > ul {
      width: 100%;
      > li {
        width: 100%;
        // border: 1px solid red;
        .cartItem {
          // border: 1px solid red;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          .itemName {
            // border: 1px solid red;
            color: #636565;
            width: 45%;
            padding-left: 1rem;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .bot {
            width: 45%;
            // border: 1px solid #222;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: 1rem;
            padding-right: 0.3rem;
            font-size: 1rem;
            > span {
              display: flex;
              justify-content: flex-start;
              color: #ff2d1c;
              flex: 1;
              font-size: 0.93rem;
              span {
                color: #636565;
              }
            }
            .computed {
              flex: 1;
              // border: 1px solid red;
              font-size: 1rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              div {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                > span {
                  flex: 1;
                  font-size: 0.9rem;
                  text-align: center;
                  // border: 1px solid red;
                }
                i {
                  flex: 1;
                  font-size: 1.5rem;
                  color: #ff6356;
                }
              }
            }
          }
        }
      }
    }
  }
}
.bind {
  position: fixed;
  left: 10vw;
  right: 10vw;
  top: 30vh;
  z-index: 99999;
  height: 12rem;
  background: #fff;
  border-radius: 5px;
  // border: 1px solid red;
  // overflow: hidden;
  // position: relative;
  .txt {
    // border: 1px solid red;
    height: 75%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 1.125rem;
    font-weight: 500;
    color: #3e3e3e;
    // position: fixed;

    div {
      // border:1px solid red;
      margin-top: -5rem;
    }
    p {
      margin-top: 1rem;
    }
  }
  .btn {
    height: 25%;
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
      color: #3e3e3e;
    }
    .bgColor {
      background: #e03325;
      color: #fff;
    }
  }
}
</style>
