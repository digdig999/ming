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
          <div style="height:13vh;"></div>
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
                    <strong>{{itemOne.productName}}</strong>
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
          <div style="height:13vh;"></div>
        </div>
      </div>
    </div>
    <div v-show="cartListShow" @click="cartListShow=!cartListShow" class="cart-back"></div>
    <cart :shopCartList="shopCartList" :cartListShow="cartListShow" :obj="obj"></cart>
  </div>
</template>

<script>
//引入接口
import { MessageBox, Toast } from "mint-ui";
import ShopCart from "../../components/shopCart";
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
    cart: ShopCart
  },
  name: "",
  data() {
    return {
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
      obj: {},
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
    // this.userId = localStorage.getItem("uuid");
    this.getCompanyUserInfo();
    this.getProductList();
    // this._calculateHeight();
  },
  mounted() {},
  methods: {
    cartShow() {
      this.cartListShow = !this.cartListShow;
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
    },
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
      console.log("111");
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
    }
  },

  mounted() {
    //获取号码
    this.band = this.$route.params.band;
    this.bandPhone = this.$route.params.band.phone;
    console.log("商家", this.band);
  },
  beforeUpdate() {
    this.obj = {
      shopCartList: this.shopCartList,
      band: this.band,
      userInfo: this.userInfo
    };
  }
};
</script>

<style lang='scss' scoped>
// 遮罩
.cart-back {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #000, $alpha: 0.4);
  z-index: 1;
}
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
      font-size: 0.9rem;
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
      // border: 1px solid red;
      height: 74vh;
      width: 25%;
      // flex: 3;
      overflow-y: scroll;
      background: #eee;
      .left-type {
        // border: 1px solid red;
        text-align: center;
        padding: 0.5rem 0;
        font-size: 1rem;
        color: #999;
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
      height: 74vh;
      overflow-y: scroll;
      // flex: 7;
      .content-item {
        // border: 1px solid #222;
        > span {
          display: block;
          // border: 1px solid red;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
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
                font-size: 0.9rem;
              }
              > span {
                font-size: 0.8rem;
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
                font-size: 0.9rem;
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
</style>






 