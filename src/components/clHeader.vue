<template>
  <div>
    <div class="head">
      <i @click="jump(step)" class="iconfont icon-jiantou1"></i>
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title","step"],
  components: {},
  name: "",
  data() {
    return {};
  },
  methods: {
    jump(e) {
      if (window.history.length <= 1) {
        // this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(e);
      }
    }
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
.head {
  width: 100%;
  height: 8vh;
  font-size: 1rem;
  text-align: center;
  position: relative;  z-index: 999;
  line-height: 8vh;
  background: #E03325;
  color: #fff;
  > i {
    position: absolute;
    left: 1rem;
    font-size: .8rem;
  }
}
</style>
