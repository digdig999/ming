<template>
  <div>
    <cl-header :title="title" :step="step"></cl-header>

    <div class="header">
      <div class="title">
        <span class="ofd">{{band.dealerName}}</span>
        <b></b>
        <i @click="callPhone()" class="iconfont icon-dianhua"></i>
      </div>
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="想吃什么搜一搜" />
      </div>
    </div>
    <div class="content">
      <div class="content-title">
        <!-- <i class="iconfont icon-xinpin"></i> -->
        <span>新品</span>
        <span>新品</span>
      </div>
      <div class="content-box">
        <scroll class="content-left" ref="leftMenu">
          <div class="left-menu">
            <ul>
              <li
                class="left-type"
                ref="leftItem"
                :class="{'bgColor':indexLeft==currentIndex}"
                @click="selectLeft(indexLeft, $event)"
                v-for="(itemLeft,indexLeft) in shopList"
                :key="indexLeft"
              >
                <p>{{itemLeft.categoryName}}</p>
              </li>
            </ul>
          </div>
        </scroll>
        <scroll class="content-right" ref="rightMenu" @scroll="scrollHeight"  :listenScroll="true"
      :probeType="3">
          <div class="right-menu">
            <ul>
              <li
                class="content-item"
                ref="rightItem"
                v-for="(itemRight,indexRight) in shopList"
                :key="indexRight"
              >
                <div>{{itemRight.categoryName}}</div>
                <ul>
                  <li v-for="(itemOne,indexOne) in itemRight.productList" :key="indexOne">
                    <div>
                      <div>{{itemOne.productName}}</div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </scroll>
      </div>
    </div>
    <div v-show="cartListShow" @click="cartListShow=!cartListShow" class="cart-back"></div>
    <div class="footer">
      <div class="car-box">
        <div class="cartListFixed" v-show="cartListShow">
          <div class="cartList">
            <div class="cartTitle">
              <span>已选商品</span>
              <span @click="clearCart()">清空</span>
            </div>
            <div class="cartBox">
              <div
                class="cartItem"
                v-for="(itemCart,indexCart) in shopCartList.list"
                :key="indexCart"
              >
                <div class="itemName">
                  <span>{{itemCart.productName}}</span>
                  <span style="font-size:.7rem">({{itemCart.payUnit}})</span>
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
            </div>
          </div>
        </div>
        <div class="has" v-show="shopCartList.totalNum>0">
          <div class="car">
            <i @click="cartListShow=!cartListShow" class="iconfont icon-gouwucheman"></i>
            <div class="num">
              <span>{{shopCartList.totalNum}}</span>
            </div>
            <span>￥{{shopCartList.totalPrice/100}}</span>
          </div>
          <div class="carBtn" @click="jumpSurePay()">
            <span>结算</span>
          </div>
        </div>
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
      </div>
    </div>
  </div>
</template>

<script>
//引入接口
import { MessageBox, Toast } from "mint-ui";
import BScroll from "better-scroll";
import Scroll from "../../components/scroll.vue";
import {
  getProductList,
  getShopCartAdd,
  getShopCartEdit,
  getShopCartRemove,
  getShopCartList,
  getCompanyUserInfo
} from "../../api/restApi.js";
export default {
  components: {
    Scroll
  },
  name: "",
  data() {
    return {
      rightTops: [],
      scrollY: 0,
      leftScrollY: 0,
      // index: 0,
      rightHeight: [],
      band: "",
      step: -1,
      title: "订餐系统",
      shopCar: true,
      categoryId: "",
      cartListShow: false,
      bandPhone: "",
      dealerName: "",
      userInfo: "",
      shopList: [],
      shopCartList: {
        totalNum: "",
        totalPrice: "",
        list: []
      }
    };
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
    },
    //计算高度
    currentIndex() {
      const { scrollY, rightHeight } = this;
      const index = rightHeight.findIndex((height, index) => {
        return (
          scrollY >= rightHeight[index] && scrollY < rightHeight[index + 1]
        );
      });
      return index > 0 ? index : 0;
    }
  },
  created() {
    // this.userId = localStorage.getItem("uuid");

    this.getCompanyUserInfo();
    this.getProductList();
    this.$nextTick(() => {
      this._calculateHeight();
    });
  },
  mounted() {
   
    //获取号码
    this.band = this.$route.params.band;
    this.bandPhone = this.$route.params.band.phone;
    console.log("商家", this.band);
  },
  methods: {
    scrollHeight(pos) {
       if (this.listenScroll) {
      let me = this;
      this.scroll.on("scroll", pos => {
        me.$emit("scroll", pos);
      });
    }
      console.log(pos);
      this.scrollY = Math.abs(Math.round(pos.y));
    },
    _calculateHeight() {
      let lis = this.$refs.rightItem;
      let height = 0;
      this.rightHeight.push(height);
      Array.prototype.slice.call(lis).forEach(li => {
        height += li.clientHeight;
        this.rightHeight.push(height);
      });
      console.log(this.rightHeight);
    },

    // 左右联动
    selectLeft(index, event) {
      this.currentIndex==index
      if (!event._constructed) {
        return;
      }
      let rightItem = this.$refs.rightItem;
      let el = rightItem[index];
      this.$refs.rightMenu.scrollToElement(el, 500);
    },

    // 用户信息
    getCompanyUserInfo() {
      getCompanyUserInfo
        .create({
          workCode: "jkxx0106"
        })
        .then(res => {
          console.log("用户信息", res);
          if (res.code == 0) {
            this.userInfo = res.data;
          }
        })
        .catch(err => {
          console.log("报错信息getCompanyUserInfo", err);
        });
    },

    // 打电话
    callPhone() {
      window.location.href = "tel://" + this.bandPhone;
    },

    // 购物车增加(前台)
    cartAdd(el, idx) {
      // console.log("库存",this.shopCartList.list[idx].productStock);
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
        this.cartListShow = false;
      }
    },

    // 列表增加(前台)
    listAdd(el, all, idx, index) {
      if (
        this.shopList[idx].productList[index].quantity ==
        this.shopList[idx].productList[index].productStock
      ) {
        let instance = Toast("已达上限");
        setTimeout(() => {
          instance.close();
        }, 700);
        return false;
      }
      // console.log(el);
      this.shopList[idx].productList[index].quantity++;
      this.joinShopCart(el, all);
    },
    // 列表减少(前台)
    listReduce(el, all, idx, index) {
      if (this.shopList[idx].productList[index].quantity == 0) {
        return false;
      }
      this.shopList[idx].productList[index].quantity--;
      this.joinShopCart(el, all);
    },
    //清空购物车(前台)
    clearCart() {
      MessageBox.confirm("确定清空购物车?").then(action => {
        this.$set(this.shopCartList, "totalNum", 0);
        this.$set(this.shopCartList, "totalPrice", 0);
        this.$set(this.shopCartList, "list", []);
        this.cartListShow = false;
        this.getProductList();
        // console.log("购物车", this.shopCartList);
      });
    },
    // 加入购物车(前台)
    joinShopCart(el, all) {
      // console.log("goods", el);
      // console.log("goodsAll", all);
      let cartList = this.shopCartList;
      // let goods = {
      //   categoryId: all.categoryId,
      //   productList: el
      // };
      let goods = el;
      // 购物车为空时
      if (cartList.list == "") {
        this.$set(cartList, "totalPrice", el.price);
        this.$set(cartList, "totalNum", el.quantity);
        cartList.list.push(goods);
        console.log("购物车列表1", cartList.list);

        // 购物车不为空
      } else if (cartList.list != "") {
        let index = cartList.list.findIndex(
          item =>
            // item.categoryId == goods.categoryId &&
            item.productId == goods.productId
        );
        // console.log("查询", index);
        if (index == -1) {
          cartList.list.push(goods);
          console.log("购物车列表2", cartList.list);
        } else {
          this.$set(cartList.list, index, goods);
        }
        this.computAllPrice;
      }
      // 更新购物车
      this.$set(this.shopCartList, cartList);
      // console.log(this.shopCartList);
    },

    // 获取商品列表
    getProductList() {
      getProductList
        .create({
          dealerNum: this.$route.params.band.dealerNum, //所属商家编码
          categoryId: this.categoryId
        })
        .then(res => {
          console.log("查询菜品", res);
          if (res.code == 0) {
            this.shopList = res.data;
          }
        })
        .catch(err => {
          console.log("报错信息getProductList", err);
        });
    },
    // 跳转
    jumpSurePay() {
      let obj = {
        shopCartList: this.shopCartList,
        band: this.band,
        userInfo: this.userInfo
      };
      this.$router.push({
        name: "orderPay",
        params: { obj: obj }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.header {
  // border: 1px solid red;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem 0.5rem;
  box-shadow: 3px 3px 10px #ddd;
  .title {
    width: 30%;
    // border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    span {
      text-align: center;
      font-size: 0.6rem;
      flex: 6;
    }
    b {
      display: inline-block;
      width: 1px;
      height: 1.5rem;
      background: #999;
      margin: 0 0.5rem;
    }
    i {
      font-size: 1.2rem;
      color: #e03325;
      // border: 1px solid red;
    }
  }
  .search {
    width: 65%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    background: #ecedee;
    border-radius: 30px;
    padding: 0.3rem 0;
    i {
      font-size: 0.8rem;
      background: #ecedee;
      margin-left: 1rem;
    }
    input {
      font-size: 0.8rem;
      background: #ecedee;
      padding-left: 0.2rem;
      color: #999;
    }
  }
}
.content {
  // border: 1px solid red;
  .content-title {
    // border: 1px solid red;
    padding: 0.5rem;
    // border-bottom: 1px solid #999;
    i {
      font-size: 1rem;
      color: #e03325;
    }
    span {
      font-size: 0.9rem;
      padding-left: 0.2rem;
    }
  }
  .content-box {
    // border: 1px solid red;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .content-left {
      border: 1px solid red;
      height: 74vh;
      width: 25%;
      // flex: 3;
      background: #eee;
      .left-menu {
        border: 1px solid red;
        .left-type {
          // border: 1px solid red;
          text-align: center;
          padding: 0.3rem 0;
          font-size: 0.7rem;
          color: #999;
        }

        .bgColor {
          background: #fff;
          color: #000;
          border-left: 5px solid #f5e87f;
        }
      }
    }
    .content-right {
      border: 1px solid red;
      width: 73%;
      height: 74vh;
      overflow-y: scroll;
      // flex: 7;
      .right-menu {
        border: 1px solid red;
        overflow-y: scroll;
        .content-item {
          border: 1px solid #222;
          display: block;
          height: 100vh;
          > span {
            display: block;
            // border: 1px solid red;
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
          .item-one {
            // border: 1px solid red;
            display: flex;
            align-content: center;
            justify-content: space-between;
            .img {
              // border: 1px solid red;
              width: 4rem;
              height: 4rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .msg {
              // border: 1px solid red;
              width: 70%;
              display: flex;
              flex-direction: column;
              padding-left: 0.2rem;
              justify-content: space-between;
              .top {
                // border: 1px solid red;
                display: flex;
                flex-direction: column;
                strong {
                  font-size: 0.8rem;
                }
                > span {
                  font-size: 0.7rem;
                  color: #999;
                  padding: 0.2rem 0;
                }
              }
              .bot {
                // border: 1px solid red;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                font-size: 1rem;
                padding-right: 0.5rem;
                font-size: 0.7rem;
                > span {
                  display: flex;
                  justify-content: flex-start;
                  color: #ff2d1c;
                  flex: 1;
                  span {
                    color: #999;
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
                    span {
                      flex: 1;
                      font-size: 0.8rem;
                      text-align: center;
                      // border: 1px solid red;
                    }
                    i {
                      flex: 1;
                      font-size: 1.2rem;
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
  }
}
// 遮罩
.cart-back {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #000, $alpha: 0.4);
  z-index: 11;
}
.footer {
  // border: 1px solid red;
  width: 100vw;
  position: fixed;
  bottom: 0;
  height: 12vh;
  z-index: 999;
  background: rgba($color: #000, $alpha: 0.6);
  overflow: hidden;

  .car-box {
    // border: 1px solid blue;
    display: flex;
    height: 12vh;
    padding: 0 0.5rem 0 1rem;
    align-items: center;
    position: relative;
    .cartListFixed {
      // border: 1px solid blue;
      position: fixed;
      left: 0;
      bottom: 12vh;
      z-index: 199;
      width: 100%;
      background: #fff;
      border-top: 1px solid #999;
      .cartList {
        // border: 1px solid red;
        height: 35vh;
        .cartTitle {
          width: 100%;
          // border: 1px solid red;
          // padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.9rem;
          background: #edeef0;
          height: 5vh;
          overflow: hidden;
          span {
            padding: 0.2rem 0.5rem;
            // border: 1px solid red;
          }
        }
      }
      .cartBox {
        width: 100%;
        height: 30vh;
        // border: 1px solid red;
        overflow-y: scroll;
        .cartItem {
          // border: 1px solid red;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.3rem 0;
          .itemName {
            // border: 1px solid red;
            width: 50%;
            padding-left: 1rem;
            font-size: 0.9rem;
          }
          .bot {
            width: 45%;
            // border: 1px solid #222;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: 1rem;
            padding-right: 0.3rem;
            font-size: 0.6rem;
            > span {
              display: flex;
              justify-content: flex-start;
              color: #ff2d1c;
              flex: 1;
              span {
                color: #999;
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
                span {
                  flex: 1;
                  font-size: 0.8rem;
                  text-align: center;
                  // border: 1px solid red;
                }
                i {
                  flex: 1;
                  font-size: 1.2rem;
                  color: #ff6356;
                }
              }
            }
          }
        }
      }
    }
    .has {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      // border: 1px solid red;
      .car {
        // border: 1px solid red;
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        i {
          font-size: 1.8rem;
          color: #fff;
        }
        .num {
          // border: 1px solid red;
          width: 0.8rem;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          font-size: 0.6rem;
          background: #ff6356;
          color: #fff;
          border-radius: 50%;
          position: absolute;
          left: 1.5rem;
          top: 0rem;
          z-index: 9;
        }
        > span {
          // border: 1px solid red;
          margin-left: 1rem;
          font-size: 0.9rem;
          color: #ff6356;
        }
      }
      .carBtn {
        width: 25%;
        text-align: center;
        padding: 0.3rem 0;
        font-size: 0.8rem;
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
        i {
          font-size: 1.8rem;
          color: #fff;
        }
        span {
          padding-left: 1rem;
          font-size: 0.9rem;
          color: #999;
        }
      }
      .noBtn {
        width: 25%;
        text-align: center;
        padding: 0.3rem 0;
        font-size: 0.8rem;
        color: #999;
        background: #d8d8d8;
        border-radius: 3px;
      }
    }
  }
}
</style>
