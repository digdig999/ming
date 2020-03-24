<template>
  <div>
    <cl-header :title="title"></cl-header>
    <div class="content">
      <div>
        <div class="content-item">
          <div class="item-header">
            <div>
              <span>第一组</span>
            </div>
            <div>
              <span></span>
              <span></span>
            </div>
          </div>
            <div class="item-con">
                <div><span>召集人 :</span></div>
                <div><span>联络员 :</span></div>
                <div><span>时间 :</span></div>
                <div><span>地点 :</span></div>
                <div><span>成员 :</span></div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "",
  data() {
    return {
      title: "分组名单"
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
</style>
