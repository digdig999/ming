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
        <input type="text" placeholder="想吃什么搜一搜" readonly="readonly" @click="goSearch()" />
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
                            style="font-size:.75rem"
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
    <!-- 购物车遮罩 -->
    <div v-show="cartListShow" @click="cartListShow=!cartListShow" class="cart-back"></div>
    <!-- 绑定弹窗遮罩 -->
    <div v-show="bindShow" @click="bindShow=!bindShow" class="cart-backBind"></div>
    <!-- 购物车组件 -->
    <cart
      :cartListShow="cartListShow"
      :shopCartList="shopCartList"
      :bindShow="bindShow"
      :userId="userId"
    ></cart>
  </div>
</template>

<script>
//引入接口
import { MessageBox, Toast } from "mint-ui";
import ShopCart from "../../components/shopcart";
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
        totalNum: 0,
        totalPrice: 0,
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
    if (JSON.parse(localStorage.getItem("cart")) != undefined) {
      this.shopCartList = JSON.parse(localStorage.getItem("cart"));
    }
    console.log("购物车", this.shopCartList);
  },
  mounted() {
    this.band = JSON.parse(localStorage.getItem("band"));
    // console.log(this.band);
    this.getProductList(this.band);

    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  methods: {
    // 购物车同步列表
    upDateList(item) {
      let list = this.shopCartList.list;
      item.forEach((el, i) => {
        el.productList.forEach((it, idx) => {
          list.forEach((e, l) => {
            if (it.productId == e.productId) {
              this.$set(this.shopList[i].productList, l, e);
            }
          });
        });
      });
    },
    // 清空购物车
    resetCart() {
      this.$set(this.shopCartList, "totalNum", 0);
      this.$set(this.shopCartList, "totalPrice", 0);
      this.$set(this.shopCartList, "list", []);
      localStorage.setItem("cart", JSON.stringify(this.shopCartList));
    },
    // 监听浏览器返回
    goBack() {
      // console.log("返回商家");
      // 清空购物车
      this.resetCart();
      sessionStorage.clear();
      this.$router.replace({
        path: "/bindFood/band"
      });
    },
    // 跳转查询页面
    goSearch() {
      if (this.shopCartList.totalNum != 0) {
        localStorage.setItem("cart", JSON.stringify(this.shopCartList));
      }
      this.$router.push({
        name: "searchFood",
        // params: {
        //   list: this.shopList
        // }
      });
    },
    // 购物车显隐
    cartShow() {
      this.cartListShow = !this.cartListShow;
    },
    // 绑定弹窗
    showBind() {
      this.bindShow = !this.bindShow;
    },
    // 左边栏跳转
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
        })
        .then(res => {
          console.log("查询菜品", res);
          if (res.code == 0) {
            this.shopList = res.data;
            this.upDateList(res.data);
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

    //清空购物车(前台)
    clearCart() {
      MessageBox.confirm("确定清空购物车?").then(action => {
        console.log(this);
        this.resetCart();
        this.cartListShow = false;
        this.getProductList(this.band);
        // console.log("购物车", this.shopCartList);
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
      background: #979899;
      margin: 0 0.5rem;
    }
    i {
      font-size: 1.2rem;
      color: #e03325;
      // border: 1px solid red;
    }
  }
  .search {
    width: 260px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    background: #ecedee;
    border-radius: 16px;
    height: 32px;
    line-height: 32px;
    // border: 1px solid red;
    i {
      font-size: 0.8rem;
      background: #ecedee;
      margin-left: 1rem;
    }
    input {
      font-size: 0.875rem;
      background: #ecedee;
      padding-left: 0.5rem;
      color: #979899;
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
    height: calc(100vh - 151px);
    .content-left {
      // border: 1px solid red;
      height: calc(100vh - 151px);
      width: 25%;
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
      height: calc(100vh - 151px);
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
              font-size: 0.93rem;
              > span {
                display: flex;
                justify-content: flex-start;
                align-items: flex-end;
                color: #ff2d1c;
                flex: 1;
                span {
                  color: #656565;
                  font-size: 0.75rem;
                  text-align: end;
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
</style>






 