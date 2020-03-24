<template>
  <div class="people-apply">
    <mt-header v-if="chooseType==='shift'" class="title" title="倒班楼预定"></mt-header>
    <mt-header v-if="chooseType==='meeting'" class="title" title="会议室预定"></mt-header>
    <mt-header v-if="chooseType==='active'" class="title" title="活动中心预定"></mt-header>

    <div class="apply">
      <div class="apply-box" v-for="(item,index) in departmentUserIdsSide" :key="index">
        <input v-model="item.userName" class="apply-input" placeholder="姓名" />
        <input v-model="item.company" class="apply-input" placeholder="公司" />
        <input v-model="item.post" class="apply-input" placeholder="职位" />
        <input
          v-model="item.phone"
          @blur="inputPhone"
          type="number"
          maxlength="11"
          class="apply-input no-bottom"
          placeholder="电话"
        />
      </div>
      <div>
        <div class="apply-btn" @click="sure">完成</div>
        <div class="apply-btn" @click="add" style="background-color: darkgrey;margin-top: 10px">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "peopleApply",
  data() {
    return {
      chooseType: "",
      shiftInfo: {},
      applyInfo: {},
      departmentUserIdsInner: [],
      departmentUserIdsSide: [
        {
          isGroupUser: 0,
          userName: "",
          phone: "",
          company: "",
          post: ""
        }
      ]
    };
  },
  created() {
    //当前申请类型
    if (this.$route.query.chooseType) {
      this.chooseType = this.$route.query.chooseType;
      console.log(this.chooseType);
    }
    if (this.$route.query.shiftInfo) {
      this.shiftInfo = JSON.parse(this.$route.query.shiftInfo);
      console.log("倒班楼详情", this.shiftInfo);
      if (this.shiftInfo) {
        this.roomId = this.shiftInfo.roomId;
      }
    }
    if (this.$route.query.applyInfo) {
      this.applyInfo = JSON.parse(this.$route.query.applyInfo);
      console.log("智能选择", this.applyInfo);
    }
    if (this.$route.query.departmentUserIdsInner) {
      this.departmentUserIdsInner = [];
      this.departmentUserIdsInner = JSON.parse(
        this.$route.query.departmentUserIdsInner
      );
    }

    if (this.$route.query.departmentUserIdsSide) {
      var departmentUserIdsSide = JSON.parse(
        this.$route.query.departmentUserIdsSide
      );
      if (departmentUserIdsSide && departmentUserIdsSide.length > 0) {
        this.departmentUserIdsSide = departmentUserIdsSide;
      }
      console.log("选择人员", departmentUserIdsSide);
    }
  },
  methods: {
    inputPhone(e) {
      console.log("手机号", e);
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(e.target.value)) {
        this.$toast("手机号码有误");
        return false;
      }
    },
    add() {
      // this.$router.back();
      if (this.chooseType == "shift" || this.chooseType == "active") {
        this.$router.replace({
          path: "/homePage/buildApply",
          query: {
            chooseType: this.chooseType,
            // departmentUserIdsSide: JSON.stringify(this.departmentUserIdsSide),
            departmentUserIdsInner: JSON.stringify(this.departmentUserIdsInner),
            shiftInfo: JSON.stringify(this.shiftInfo)
          }
        });
      }
      if (this.chooseType == "meeting") {
        this.$router.replace({
          path: "/homePage/buildApply",
          query: {
            chooseType: this.chooseType,
            // departmentUserIdsSide: JSON.stringify(this.departmentUserIdsSide),
            departmentUserIdsInner: JSON.stringify(this.departmentUserIdsInner),
            applyInfo: JSON.stringify(this.applyInfo)
          }
        });
      }
    },
    sure() {
      var len = this.departmentUserIdsSide.length;
      if (!this.departmentUserIdsSide[len - 1].userName) {
        this.$toast("请填写姓名");
        return false;
      }
      if (!this.departmentUserIdsSide[len - 1].company) {
        this.$toast("请填写公司");
        return false;
      }

      if (this.chooseType == "shift" || this.chooseType == "active") {
        this.$router.push({
          path: "/homePage/buildApply",
          query: {
            chooseType: this.chooseType,
            departmentUserIdsSide: JSON.stringify(this.departmentUserIdsSide),
            departmentUserIdsInner: JSON.stringify(this.departmentUserIdsInner),
            shiftInfo: JSON.stringify(this.shiftInfo)
          }
        });
      }
      if (this.chooseType == "meeting") {
        this.$router.push({
          path: "/homePage/buildApply",
          query: {
            chooseType: this.chooseType,
            departmentUserIdsSide: JSON.stringify(this.departmentUserIdsSide),
            departmentUserIdsInner: JSON.stringify(this.departmentUserIdsInner),
            applyInfo: JSON.stringify(this.applyInfo)
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
.people-apply {
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

  .apply {
    padding: 50px 0 66px 0;

    .apply-box {
      padding: 10px;
      background-color: #fff;
      margin-bottom: 10px;

      .apply-input {
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding-bottom: 10px;
        border-bottom: 1px #eee solid;
      }

      .no-bottom {
        border-bottom: none;
      }
    }
    .apply-add {
      margin: 20px 0;
      padding: 0 10px;
      background-color: #fff;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }

    .apply-btn {
      width: 50%;
      margin: 0 25%;
      height: 50px;
      line-height: 50px;
      color: #fff;
      text-align: center;
      background-color: #ff2c2c;
      border-radius: 10px;
    }
  }
}
</style>
