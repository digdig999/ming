<template>
  <div>
    <p style="text-align:center;margin:50vh auto;">测试传值</p>

  </div>
</template>

<script>
export default {
  components: {},
  name: '',
  data() {
    return {
    };
  },
  methods: {},
  mounted(){
      console.log(this.$route.query.uuid);
  },
};
</script>

<style lang='scss' scoped>

</style>
