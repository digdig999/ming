<template>
  <div>
    <cl-header :title="title"></cl-header>
    <div class="content">
      <!-- <div v-for="(item,index) in list" :key="index"> -->
      <div class="content-item">
        <div class="item-img">
          <img src alt />
        </div>
        <div class="item-con">
          <div class="item-name">
            <span>集团公司会议</span>
          </div>
          <div class="item-time">
            <span>2020-19-29~2020-12-29</span>
            <span class="of">北京.电影学院大大阿达大啊</span>
          </div>
        </div>
      </div>
      <div class="cut"></div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "",
  data() {
    return {
      title:'会议列表'
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
// .header {
//   width: 100%;
//   height: 10vh;
//   // border: 1px solid red;
//   font-size: 1rem;
//   text-align: center;
//   position: relative;
//   line-height: 10vh;
//   background-image: linear-gradient(#0082fc, #05a9fc);
//   color: #fff;
//   > i {
//     // display: block;
//     position: absolute;
//     left: 0.5rem;
//     top: 0.5rem;
//     width: 2rem;
//     height: 2rem;
//     line-height: 2rem;
//     font-size: 1rem;
//     // border: 1px solid red;
//   }
// }
.header-box{
  width: 100%;
  height: 10vh;
}
.content {
  // border: 1px solid red;
  width: 100%;
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  .content-item {
    // border: 1px solid #222;
    width: 100%;
    font-size: 0.8rem;
    .item-img {
      width: 100%;
      height: 30vh;
      // border: 1px solid red;
      image {
        width: 100%;
      }
    }
    .item-con {
      display: flex;
      flex-direction: column;
      // align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      .item-name {
        padding-bottom: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .item-time {
        // padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.7rem;
        color: #999;

        > span:nth-of-type(2) {
          width: 40%;
          // border: 1px solid red;
        }
      }
    }
  }
}
</style>
