<template>
  <div id="app">
    <!--内容-->
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <router-view></router-view>
  </div>
</template>

<script>
//引入公共样式
import "./style/reset.css";

export default {
  name: "App"
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.cut {
  height: 20px;
  // border: 1px solid red;
}
//css溢出
.of {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ofd {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.flex-c {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-b {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.empty {
  position: fixed;
  top: 30vh;
  bottom: 25vh;
  left: 10vh;
  right: 10vh;
  div {
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
  }
  p {
    margin-top: 1rem;
    color: #AFABAF;
    text-align: center;
  }
}
</style>
