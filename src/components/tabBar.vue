<template>
  <div class="foot">
    <router-link tag="div" :class="activeChange=='band'?'bg1':0" to="/bindFood/band">
      <i class="iconfont icon-shouyeshouye" :class="activeChange=='band'?'bg1':0"></i>
      <span>首页</span>
    </router-link>
<!-- 
    <router-link tag="div" :class="activeChange=='find'?'bg1':0" to="/find">
      <i class="iconfont" :class="activeChange=='find'?'icon-faxian2 bg1':'icon-faxian1'"></i>
      <span>发现</span>
    </router-link>

    <router-link tag="div" :class="activeChange=='cart'?'bg1':0" to="/cart">
      <i class="iconfont" :class="activeChange=='cart'?'icon-gouwuche2 bg1':'icon-gouwuche1'"></i>
      <span>购物车</span>
    </router-link> -->

    <router-link tag="div" :class="activeChange=='order'?'bg1':0" to="/bindFood/order">
      <i style="font-size:1.3rem" class="iconfont icon-dingdan" :class="activeChange=='order'?'bg1':0"></i>
      <span>订单</span>
    </router-link>

    <router-link tag="div" :class="activeChange=='mine'?'bg1':0" to="/bindFood/mine">
      <i class="iconfont icon-wode"   :class="activeChange=='mine'?'bg1':0"></i>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["activeChange"],
  data() {
    return {
      
    };
  },
  created() {
  },
  methods: {
    jump(path) {
      this.$router.push({ path });
    }
  }
};
</script>

<style lang="scss" scoped>
.foot {
  width: 100vw;
  position: fixed;
  bottom: 0px;
  display: flex;
  align-items:center;
  justify-content: space-around;
  background: #fff;
  z-index: 10000;
  // border: 1px solid red;  
  height: 83px;
  line-height: 23px;
  box-shadow: 1px 1px 10px #aaa;
  // height: 10vh;
  > div {
    display: flex;
    text-align: center;
    color: #555;
    flex-direction: column;
    justify-content: space-around;
    > i {
      width:1.5rem;
      height:1.5rem;
      font-size: 1.5rem;
      color: #555;
      // border: 1px solid red;
    }
    > span {
      line-height: 20px;
      font-size: 12px;
    }
  }

  .bg1 {
    color: #E86B62;
  }
}
</style>