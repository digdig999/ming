<template>
  <div>
    <div class="header">
      <div class="title">
        <span class="ofd">{{band.dealerName}}</span>
        <b></b>
        <i @click="callPhone()" class="iconfont icon-dianhua"></i>
      </div>
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input
          type="text"
          placeholder="想吃什么搜一搜"
          readonly="readonly"
          @click="$router.push({name:'searchFood'})"
        />
      </div>
    </div>
    <div class="content">
      <div class="content-title">
        <!-- <i class="iconfont icon-xinpin"></i>
        <span>新品</span>
        <span>新品</span>-->
      </div>
      <div class="content-box">
        <div class="content-left">
          <div
            class="left-type"
            :class="idx==indexLeft?'bgColor':''"
            v-for="(itemLeft,indexLeft) in shopList"
            :key="indexLeft"
            @click="jumpGoods(indexLeft,$event)"
          >
            <span>{{itemLeft.categoryName}}</span>
          </div>
          <div style="height:11vh;"></div>
        </div>
        <div class="content-right">
          <div
            class="content-item"
            ref="rightItem"
            v-for="(itemRight,indexRight) in shopList"
            :key="indexRight"
          >
            <span>{{itemRight.categoryName}}</span>
            <div v-for="(itemOne,indexOne) in itemRight.productList" :key="indexOne">
              <div class="item-one">
                <div class="img">
                  <img :src="itemOne.picUrl" alt />
                </div>
                <div class="msg">
                  <div class="top">
                    <span class="of">{{itemOne.productName}}</span>
                    <span>{{itemOne.introduction}}</span>
                  </div>
                  <div class="bot">
                    <span>
                      ￥{{itemOne.price/100}}
                      <span>/{{itemOne.payUnit}}</span>
                    </span>
                    <div class="soldOut" v-if="itemOne.productStock==0">
                      <span>已售完</span>
                    </div>
                    <div class="computed" v-else>
                      <div @click="listReduce(itemOne,itemRight,indexRight,indexOne)">
                        <i v-show="itemOne.quantity>0" class="iconfont icon-icon--"></i>
                      </div>
                      <div>
                        <span v-show="itemOne.quantity>0">
                          {{itemOne.quantity}}/
                          <span
                            style="font-size:.7rem"
                          >{{itemOne.productStock}}</span>
                        </span>
                      </div>
                      <div @click="listAdd(itemOne,itemRight,indexRight,indexOne)">
                        <i class="iconfont icon-jiahao"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="height:.5rem;"></div>
            </div>
          </div>
          <div style="height:11vh;"></div>
        </div>
      </div>
    </div>
    <div v-show="cartListShow" @click="cartListShow=!cartListShow" class="cart-back"></div>
    <div class="footer">
      <div class="car-box">
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
        <div class="has" v-show="shopCartList.totalNum>0">
          <div class="car">
            <div>
              <i @click="cartListShow=!cartListShow" class="iconfont icon-gouwucheman"></i>
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
    <div v-show="bindShow" @click="bindShow=!bindShow" class="cart-backBind"></div>
    <div class="bind" v-show="bindShow">
      <div class="txt">
        <div>
          <img src="../../assets/gobind.png" alt />
        </div>
        <p>尚未绑定一卡通</p>
      </div>
      <div class="btn">
        <span @click="goBand()">取消</span>
        <span class="bgColor" @click="goBind()">前往绑定</span>
      </div>
    </div>
  </div>
</template>

<script>
//引入接口
import { MessageBox, Toast } from "mint-ui";

import {
  getProductList,
  getShopCartAdd,
  getShopCartEdit,
  getShopCartRemove,
  getShopCartList,
  getCompanyUserInfo
} from "../../api/restApi.js";
export default {
  components: {},
  name: "",
  data() {
    return {
      userId: "",
      bindShow: false,
      idx: 0,
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
    }
  },
  created() {
    this.userId = localStorage.getItem("uuid");
  },
  mounted() {
    this.band = JSON.parse(localStorage.getItem("band"));
    console.log(this.band);
    this.getProductList(this.band);
  },
  methods: {
    // 绑定
    goBand() {
      this.$router.go(-1);
    },
    goBind() {
      this.$router.push({
        name: "bindCard"
        // params: {
        //   userInfo: this.userInfo,
        //   band: this.band
        // }
      });
    },
    // 左边栏条状
    jumpGoods(index) {
      this.idx = index;
      var items = document.querySelectorAll(".content-item");
      for (var i = 0; i < items.length; i++) {
        if (index === i) {
          items[i].scrollIntoView({
            block: "start", //默认跳转到顶部
            behavior: "smooth" //滚动的速度
          });
        }
      }
    },

    // 获取商品列表
    getProductList(e) {
      getProductList
        .create({
          dealerNum: e.dealerNum //所属商家编码
          // categoryId: this.categoryId
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

    // 打电话
    callPhone() {
      window.location.href = "tel://" + this.band.phone;
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
        this.getProductList(this.band);
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
    },

    // 跳转确认支付
    jumpSurePay() {
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
              this.bindShow = false;
            } else {
              this.bindShow = true;
            }
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
.header {
  // border: 1px solid red;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 3px 3px 10px #e6e4e4;
  .title {
    width: 30%;
    // border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    color: #222222;
    span {
      text-align: center;
      font-size: 0.75rem;
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
    border-radius: 32px;
    height: 32px;
    line-height: 32px;
    i {
      font-size: 0.8rem;
      background: #ecedee;
      margin-left: 1rem;
    }
    input {
      font-size: 0.875rem;
      background: #ecedee;
      padding-left: 0.3rem;
      color: #999;
    }
  }
}
.content {
  // border: 1px solid red;
  .content-title {
    // border: 1px solid red;
    // padding: 0.5rem;
    height: 20px;
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
    height: calc(100vh - 161px);
    .content-left {
      // border: 1px solid red;
      height: calc(100vh - 141px);

      width: 25%;
      // flex: 3;
      overflow-y: scroll;
      background: #f7f8f9;
      .left-type {
        // border: 1px solid red;
        text-align: center;
        padding: 0.5rem 0;
        font-size: 1rem;
        color: #656565;
      }

      .bgColor {
        background: #fff;
        color: #000;
        border-left: 5px solid #f5e87f;
      }
    }
    .content-right {
      // border: 1px solid red;
      width: 73%;
      height: calc(100vh - 141px);
      overflow-y: scroll;
      // flex: 7;
      .content-item {
        // border: 1px solid #222;
        > span {
          display: block;
          // border: 1px solid red;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          color: #222525;
        }
        .item-one {
          // border: 1px solid red;
          display: flex;
          align-content: center;
          justify-content: space-between;
          .img {
            // border: 1px solid red;
            width: 6rem;
            height: 6rem;
            border-radius: 2px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .msg {
            // border: 1px solid red;
            width: 60%;
            display: flex;
            flex-direction: column;
            padding-left: 0.2rem;
            justify-content: space-between;
            .top {
              // border: 1px solid red;
              display: flex;
              flex-direction: column;
              > span:nth-of-type(1) {
                font-size: 0.93rem;
                color: #1e2020;
              }
              > span:nth-of-type(2) {
                font-size: 0.75rem;
                color: #656565;
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
              font-size: 1rem;
              > span {
                display: flex;
                justify-content: flex-start;
                color: #ff2d1c;
                flex: 1;
                span {
                  color: #999;
                }
              }
              .soldOut {
                // border: 1px solid red;
                font-size: 0.75rem;
                color: #656565;
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
                    font-size: 1rem;
                    text-align: center;
                    display: flex;
                    // border: 1px solid red;
                    justify-content: flex-start;
                    align-items: center;
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
}
// 遮罩
.cart-back {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #000, $alpha: 0.3);
  z-index: 1;
}
.cart-backBind {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #000, $alpha: 0.3);
  z-index: 9999;
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
.footer {
  // border: 1px solid red;
  width: 100vw;
  position: fixed;
  bottom: 0;
  height: 10vh;
  z-index: 999;
  background: rgba($color: #58595a, $alpha: 0.98);
  // overflow: hidden;
  .car-box {
    // border: 1px solid blue;
    width: 100%;
    height: 100%;
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
</style>






 