<template>
  <div>
    <p style="text-align:center;margin:50vh auto;">测试</p>
  </div>
</template>

<script>
export default {
  components: {},
  name: "",
  data() {
    return {};
  },
  methods: {
      goBack () {
        console.log("点击了浏览器的返回按钮");
        let test='测试1111111';
        this.$router.replace({path:'/bindFood/test2',query:{uuid:110}})
        // sessionStorage.clear();
        // window.history.back();
        // history.pushState(null, null, document.URL);
        
    }, 
  },
  mounted() {
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.goBack, false);
},
};
</script>

<style lang='scss' scoped>
</style>
