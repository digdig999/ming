<template>
  <div>
    <cl-header :title="title"></cl-header>
    <div class="content">
      <div class="content-img">
        <img src alt />
      </div>
      <div class="content-item">
        <div class="item-icon">
          <div class="icon">
            <i>图标</i>
          </div>
          <div class="txt">
            <span>文字</span>
          </div>
        </div>
        <div class="item-icon">
          <div class="icon">
            <i>图标</i>
          </div>
          <div class="txt">
            <span>文字</span>
          </div>
        </div>
        <div class="item-icon">
          <div class="icon">
            <i>图标</i>
          </div>
          <div class="txt">
            <span>文字</span>
          </div>
        </div>
        <div class="item-icon">
          <div class="icon">
            <i>图标</i>
          </div>
          <div class="txt">
            <span>文字</span>
          </div>
        </div>
        <div class="item-icon">
          <div class="icon">
            <i>图标</i>
          </div>
          <div class="txt">
            <span>文字</span>
          </div>
        </div>
        <div class="item-icon">
          <div class="icon">
            <i>图标</i>
          </div>
          <div class="txt">
            <span>文字</span>
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
      title: "集团公司2020年度工作会议"
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
.content {
  border: 1px solid red;
  width: 100%;
  border: 1px solid red;
  .content-img {
    height: 35vh;
    width: 100%;
    border: 1px solid red;
  }
  .content-item {
    // border: 1px solid red;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;
    flex-direction: row;
    .item-icon {
      width: 20vw;
      //   height: 5rem;
      padding: 0.5rem 0;
      margin:10px 0 10px 10px;
      border: 1px solid red;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      >.icon{
          width:16vw;
          height:16vw;
          border: 1px solid red;    
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center; 
      }
    }
  }
}
</style>
