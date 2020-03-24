<template>
  <div class="homePage-dining">
    <mt-header class="title" title="食堂"></mt-header>
    <div class="content">
      <div class="tit">
        <span>当前食堂人流量</span>
        <span>
          <span style="color: #FF2C2C;">{{totalNum?totalNum:0}}</span>人
        </span>
      </div>
      <div class="tab-cell">
        <mt-navbar class="tab-type-cell">
          <mt-tab-item
            :class="type==='type1'?'tab-type-item isType':'tab-type-item'"
            id="type1"
            @click.native="changeType('type1')"
          >
            <span>早</span>
          </mt-tab-item>
          <mt-tab-item
            :class="type==='type2'?'tab-type-item isType':'tab-type-item'"
            id="type2"
            @click.native="changeType('type2')"
          >
            <span>中</span>
          </mt-tab-item>
          <mt-tab-item
            :class="type==='type3'?'tab-type-item isType':'tab-type-item'"
            id="type3"
            @click.native="changeType('type3')"
          >
            <span>晚</span>
          </mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="type">
          <mt-tab-container-item id="type1" v-if="diningList&&diningList.length>0">
            <div class="dining-cell">
              <div class="dining-item" v-for="(item,index) in diningList" :key="index">
                <div class="dining-item-left">
                  <!--<img src="../../assets/888.jpg"/>-->
                  <div class="img">
                    <img :src="item&&item.imageUrl?imagePath+item.imageUrl:'../../assets/888.jpg'" />
                    <span v-if="index<10" class="img-top">Top{{index+1}}</span>
                  </div>
                  <div class="item-name">
                    <span>{{item.menuName}}</span>
                    <span>￥{{item.price}}</span>
                  </div>
                </div>
                <div class="dining-item-right" @click="addLike(item.menuId)">
                  <icon name="thumbs-up"></icon>
                  <span>{{item.likeNum}}</span>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="type2" v-if="diningList&&diningList.length>0">
            <div class="dining-cell">
              <div class="dining-item" v-for="(item,index) in diningList" :key="index">
                <div class="dining-item-left">
                  <!--<img src="../../assets/888.jpg"/>-->
                  <div class="img">
                    <img :src="item&&item.imageUrl?imagePath+item.imageUrl:'../../assets/888.jpg'" />
                    <span v-if="index<10" class="img-top">Top{{index+1}}</span>
                  </div>
                  <div class="item-name">
                    <span>{{item.menuName}}</span>
                    <span>￥{{item.price}}</span>
                  </div>
                </div>
                <div class="dining-item-right" @click="addLike(item.menuId)">
                  <icon name="thumbs-up"></icon>
                  <span>{{item.likeNum}}</span>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="type3" v-if="diningList&&diningList.length>0">
            <div class="dining-cell">
              <div class="dining-item" v-for="(item,index) in diningList" :key="index">
                <div class="dining-item-left">
                  <!--<img src="../../assets/888.jpg"/>-->
                  <div class="img">
                    <img :src="item&&item.imageUrl?imagePath+item.imageUrl:'../../assets/888.jpg'" />
                    <span v-if="index<10" class="img-top">Top{{index+1}}</span>
                  </div>
                  <div class="item-name">
                    <span>{{item.menuName}}</span>
                    <span>￥{{item.price}}</span>
                  </div>
                </div>
                <div class="dining-item-right" @click="addLike(item.menuId)">
                  <icon name="thumbs-up"></icon>
                  <span>{{item.likeNum}}</span>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container v-else class="empty">
            <div class="imgnone">
              <div>
                <img src="../../assets/8b5f1a8fcc864d63d5779bbcb3687e3.png" alt />
              </div>
              <div>暂无数据</div>
            </div>
          </mt-tab-container>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
//引入接口
import {
  imagePath,
  getDiningListApi,
  getCurrentTrafficApi,
  addLikeApi
} from "../../api/restApi.js";

export default {
  name: "dining",
  data() {
    return {
      imagePath: "",
      type: "type1",
      dinnerType: 1,
      diningList: [],
      totalNum: ""
    };
  },
  created() {
    this.imagePath = imagePath;
    this.getDiningList(1);
  },
  methods: {
    changeType(type) {
      console.log(type);
      this.type = type;
      if (type == "type1") {
        this.dinnerType = 1;
        this.getDiningList(this.dinnerType);
      }
      if (type == "type2") {
        this.dinnerType = 2;
        this.getDiningList(this.dinnerType);
      }
      if (type == "type3") {
        this.dinnerType = 3;
        this.getDiningList(this.dinnerType);
      }
    },
    getDiningList(dinnerType) {
      getDiningListApi
        .create({
          sellDate: new Date().format("yyyy-MM-dd"),
          dinnerTime: dinnerType
        })
        .then(res => {
          console.log("食堂", res);
          this.diningList = res.data;
          if (this.diningList.length > 0) {
            this.getCurrentTraffic(this.diningList[0].messId);
          }
        })
        .catch(err => {
          this.$toast(err.message);
          console.log("报错信息", err);
        });
    },
    getCurrentTraffic(messId) {
      getCurrentTrafficApi
        .create({
          messId: messId
        })
        .then(res => {
          console.log("流量", res);
          this.totalNum = res.data.today;
        })
        .catch(err => {
          this.$toast(err.message);
          console.log("报错信息", err);
        });
    },
    addLike(menuId) {
      addLikeApi
        .create({
          menuId: menuId
        })
        .then(res => {
          console.log("点赞", res);
          this.$toast("点赞成功");
          this.getDiningList(this.dinnerType);
        })
        .catch(err => {
          this.$toast(err.message);
          console.log("报错信息", err);
        });
    }
  }
};
</script>

<style lang="less">
.homePage-dining {
  min-height: 100vh;
  overflow: hidden;
  background-color: #eee;
  .title {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 50px;
    padding: 10px;
    background-color: #ff2c2c;
    font-size: 16px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .content {
    padding: 50px 0 66px 0;
    .tit {
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
      -moz-box-shadow: 0px 5px 5px #bebebe;
      box-shadow: 0px 5px 5px #bebebe;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
    }
    .tab-type-cell {
      display: flex;
      -moz-box-shadow: 0px 5px 5px #e3e3e3;
      box-shadow: 0px 5px 5px #e3e3e3;
      background-color: #fff;
      font-size: 14px;
      color: #999;
      margin: 0 10px;
      .tab-type-item {
        width: 33.33%;
        box-sizing: border-box;
        padding: 15px 10px;
        text-align: center;
      }
      .isType {
        color: #ff2c2c;
        border-bottom: 2px solid #ff2c2c;
        margin-bottom: 1px;
      }
    }
    .dining-cell {
      margin: 10px;
      background-color: #fff;
      padding: 10px;
      border-radius: 5px;
      -moz-box-shadow: 0px 5px 5px #bebebe;
      box-shadow: 0px 5px 5px #bebebe;
      .dining-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .dining-item-left {
          display: flex;
          .item-name {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            > span:nth-of-type(2) {
              color: #ff2c2c;
            }
          }
          .img {
            width: 120px;
            height: 80px;
            position: relative;
            z-index: 9;
            .img-top {
              position: absolute;
              top: 0;
              left: 0;
              width: 28px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              font-size: 14px;
              color: #fff;
              font-weight: 500;
              border-bottom-right-radius: 8px 8px;
              background: linear-gradient(
                top left,
                red,
                orange
              ); /*渐变从左上角到右下角*/
              background: -ms-linear-gradient(top left, red, orange);
              background: -webkit-linear-gradient(top left, red, orange);
              background: -moz-linear-gradient(top left, red, orange);
              z-index: 10;
            }
          }
          img {
            width: 120px;
            height: 80px;
            object-fit: cover;
          }
          span {
            padding: 0 10px;
          }
        }
        .dining-item-right {
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          span {
            margin-top: 2px;
          }
        }
      }
      .dining-item:last-child {
        margin-bottom: 0;
      }
    }
  }
}
.empty {
  position: fixed;
  left: 0;
  right: 0;
  top: 20vh;
  bottom: 0;
  height: 50vh;
  width: 100%;
  height: 100%;
  /*垂直居中*/
  /*水平居中*/
  color: #636565;
  font-size: 1.5em;
  z-index: 9;
}
.imgnone {
  // margin-top: -150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80vw;
  height: 30vh;
  margin: 100px auto;
}
.empty img {
  width: 100%;
  // border: 1px solid blue;
}
.empty .imgnone div:nth-of-type(2) {
  text-align: center;
  font-size: 0.8em;
}
</style>
