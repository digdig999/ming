<template>
  <div class="homePage-buildApply">
    <mt-header class="title" title="倒班楼申请" v-if="chooseType=='shift'">
      <icon class="title-icon" name="chevron-left" slot="left" @click.native="gotoBack"></icon>
    </mt-header>
    <mt-header class="title" title="会议室申请" v-if="chooseType=='meeting'">
      <icon class="title-icon" name="chevron-left" slot="left" @click.native="gotoBack"></icon>
    </mt-header>
    <mt-header class="title" title="活动中心申请" v-if="chooseType=='active'">
      <icon class="title-icon" name="chevron-left" slot="left" @click.native="gotoBack"></icon>
    </mt-header>

    <!--倒班-->
    <div class="content" v-if="chooseType=='shift'">
      <div class="apply-info">
        <img
          :src="shiftInfo&&shiftInfo.imagePath?imagePath+shiftInfo.imagePath:'../../assets/888.jpg'"
        />
        <div class="apply-info-txt">
          <span class="txt1">{{shiftInfo&&shiftInfo.roomName?shiftInfo.roomName+'室':'暂无'}}</span>
          <span class="txt2">{{shiftInfo&&shiftInfo.bedInfo?shiftInfo.bedInfo:'暂无'}}</span>
        </div>
      </div>
      <div class="apply-info">
        <span class="apply-info-man">入住人员：</span>
        <div class="apply-info-tabs">
          <span
            class="tab-item"
            v-for="(item,idx) in departmentUserIdsInner"
            :key="idx"
            @click="delPeople1(idx)"
          >{{item.userName}}</span>
          <span
            class="tab-item"
            v-for="(item,index) in departmentUserIdsSide"
            :key="index"
            @click="delPeople2(idx)"
          >{{item.userName}}</span>
          <span class="tab-item tab-item-add" @click="isBox=!isBox">
            <icon class="icon" name="plus"></icon>
          </span>
        </div>
      </div>
      <div class="apply-info">
        <span class="apply-info-man">备注：</span>
        <textarea class="apply-info-remark" v-model="shiftRemark" placeholder="请在此输入信息"></textarea>
      </div>
      <!--<div class="apply-info apply-time">-->
      <!--<span class="apply-info-man">入住时间：</span>-->
      <!--<div class="apply-info-tabs">-->
      <!--<span class="tab-item" v-for="(item,index) in timeList" :key="index">{{item.name}}</span>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <!--会议-->
    <div class="content" v-if="chooseType=='meeting'">
      <div class="apply-info">
        <img
          :src="applyInfo&&applyInfo.imagePath?imagePath+applyInfo.imagePath:'../../assets/888.jpg'"
        />
        <div class="apply-info-txt">
          <span
            class="txt1"
          >{{applyInfo&&applyInfo.meetingName?applyInfo.meetingName:''}}{{applyInfo&&applyInfo.number?'('+applyInfo.number+'人)':'（0人）'}}</span>
          <span class="txt2">所属园区：{{applyInfo&&applyInfo.addressName?applyInfo.addressName:''}}</span>
        </div>
      </div>
      <div class="apply-info">
        <span class="apply-info-man">会议人员：</span>
        <div class="apply-info-tabs">
          <span
            class="tab-item"
            v-for="(item,idx) in departmentUserIdsInner"
            :key="idx"
            @click="delPeople1(idx)"
          >{{item.userName}}</span>
          <span
            class="tab-item"
            v-for="(item,index) in departmentUserIdsSide"
            :key="index"
            @click="delPeople2(idx)"
          >{{item.userName}}</span>
          <span class="tab-item tab-item-add" @click="isBox=!isBox">
            <icon class="icon" name="plus"></icon>
          </span>
        </div>
      </div>
      <div class="apply-info">
        <span>
          会议主题：
          <input v-model="subject" placeholder="请输入会议主题"/>
        </span>
      </div>
      <div class="apply-info">
        <span class="apply-info-man">备注：</span>
        <textarea v-model="meetRemark" class="apply-info-remark" placeholder="请在此输入信息"></textarea>
      </div>
      <!-- 日期 -->

      <div class="apply-info">
        <div style="width: 100%;">
          <div class="form-time" @click="openDate">
            <span>选择日期</span>
            <span style="display: flex;align-items: center;">
              {{formDate}}
              <icon name="angle-right" style="font-size: 12px;line-height: 12px;margin-left:10px;"></icon>
            </span>
          </div>
          <div class="form-time" @click="openStart">
            <span>开始时间</span>
            <span style="display: flex;align-items: center;">
              {{startTime?startTime:''}}
              <icon name="angle-right" style="font-size: 12px;line-height: 12px;margin-left:10px;"></icon>
            </span>
          </div>
          <div class="form-time" @click="openEnd">
            <span>结束时间</span>
            <span style="display: flex;align-items: center;">
              {{endTime?endTime:''}}
              <icon name="angle-right" style="font-size: 12px;line-height: 12px;margin-left:10px;"></icon>
            </span>
          </div>
          <mt-datetime-picker
            v-model="formDate"
            type="date"
            ref="formdate"
            :startDate="startDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @cancel="handCancel"
            @confirm="handleConfirmDate"
          >
          </mt-datetime-picker>
          <mt-datetime-picker
            ref="dateStart"
            type="time"
            :startHour="8"
            :endHour="endHour"
            @confirm="handleConfirmStart"
          ></mt-datetime-picker>
          <mt-datetime-picker
            ref="dateEnd"
            type="time"
            :startHour="startHour"
            :endHour="17"
            @confirm="handleConfirmEnd"
          ></mt-datetime-picker>
        </div>
      </div>
      <div class="apply-info">
        <div>
          <div>可预约时间：</div>
          <div style="margin-top: 10px;" v-if="meetTime&&meetTime.length>0">
            <span
              v-for="(item,index) in meetTime"
              :key="index"
            >{{item&&item.startTime&&item.endTime?item.startTime+'-'+item.endTime:'暂无'}}&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>
      </div>
    </div>

    <!--活动中心-->
    <div class="content" v-if="chooseType=='active'">
      <div class="apply-info">
        <img
          :src="shiftInfo&&shiftInfo.imagePath?imagePath+shiftInfo.imagePath:'../../assets/888.jpg'"
        />
        <div class="apply-info-txt">
          <span class="txt1">{{shiftInfo&&shiftInfo.placeName?shiftInfo.placeName+'室':'暂无'}}</span>
          <span class="txt2">{{shiftInfo&&shiftInfo.address?shiftInfo.address:'暂无'}}</span>
        </div>
      </div>
      <div class="apply-info">
        <span class="apply-info-man">参加人员：</span>
        <div class="apply-info-tabs">
          <span
            class="tab-item"
            v-for="(item,idx) in departmentUserIdsInner"
            :key="idx"
            @click="delPeople1(idx)"
          >{{item.userName}}</span>
          <span
            class="tab-item"
            v-for="(item,index) in departmentUserIdsSide"
            :key="index"
            @click="delPeople2(idx)"
          >{{item.userName}}</span>
          <span class="tab-item tab-item-add" @click="isBox=!isBox">
            <icon class="icon" name="plus"></icon>
          </span>
        </div>
      </div>
      <div class="apply-info apply-active">
        <span>
          运动主题：
          <input v-model="subject" placeholder="请输入运动主题"/>
        </span>
      </div>
      <div class="apply-info">
        <span class="apply-info-man">备注：</span>
        <textarea v-model="placeRemark" class="apply-info-remark" placeholder="请在此输入信息"></textarea>
      </div>
      <div class="apply-info">
        <div>
          <div>可预约时间：</div>
          <div class="tabs" v-if="timeList&&timeList.length>0">
            <span
              v-for="(item,index) in timeList"
              :key="index"
              @click="selectTime(index)"
              :style="item.isSelect?'border: 1px solid #FF2C2C;color:#FF2C2C;':''"
            >{{item&&item.startTime&&item.endTime?item.startTime+'-'+item.endTime:'暂无'}}&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>
      </div>
    </div>

    <div class="foot-btn" @click="apply">申请</div>

    <div class="dialog-box" @click="isBox=!isBox" v-show="isBox">
      <div class="dialog">
        <div class="dialog-btn" @click="chooseMan(1)">集团内人员</div>
        <div class="dialog-btn" @click="chooseMan(2)">集团外人员</div>
      </div>
    </div>
  </div>
</template>

<script>
  //引入接口
  import {
    imagePath,
    getMeetingInfoApi,
    meetingApplyApi,
    roomApplyApi,
    getUserInfoApi,
    placeApplyApi,
    placeTimeApi,
    meetingFreeApi
  } from "../../api/restApi.js";
  
  export default {
    name: "buildApply",
    data() {
      return {
        formDate: "",
        canApply: true,
        userId: "",
        imagePath: "",
        shiftInfo: {},
        meetingInfo: {}, //会议详情
        chooseType: "",
        applyInfo: {},
        manList: [],
        roomId: "",
        shiftRemark: "",
        departmentUserIds: [],
        departmentUserIdsInner: [],
        departmentUserIdsSide: [],
        userInfo: {},
        startTime: "",
        startHour: 9,
        endTime: "",
        endHour: 17,
        subject: "",
        meetRemark: "",
        placeRemark: "",
        applyDate: "",

        timeList: [],
        selectTimeList: [],
        isBox: false,
        placeSelect: "",
        placeList: [
          {placeId: 1, placeName: "羽毛球场"},
          {placeId: 2, placeName: "乒乓球场"},
          {placeId: 3, placeName: "气排球场"}
        ],
        placeDate: "",
        startDate: new Date(),
        meetTime: []
      };
    },
    created() {
      this.userId = localStorage.getItem("uuid");
      this.imagePath = imagePath;
      this.getUserInfo();
      this.placeTime();
      //当前申请类型
      if (this.$route.query.chooseType) {
        this.chooseType = this.$route.query.chooseType;
        console.log("当前申请类型", this.chooseType);
      }

      if (this.$route.query.shiftInfo) {
        this.shiftInfo = JSON.parse(this.$route.query.shiftInfo);
        let profile = this.shiftInfo.profile;
        this.departmentUserIdsInner.push(profile);
        console.log("详情", this.shiftInfo);
        if (this.shiftInfo) {
          this.roomId = this.shiftInfo.roomId;
          this.placeId = this.shiftInfo.placeId;
          if (this.shiftInfo.placeType == 1) {
            this.subject = "羽毛球场";
          }
          if (this.shiftInfo.placeType == 2) {
            this.subject = "乒乓球场";
          }
          if (this.shiftInfo.placeType == 3) {
            this.subject = "气排球场";
          }
        }
      }
      if (this.$route.query.applyInfo) {
        this.applyInfo = JSON.parse(this.$route.query.applyInfo);
        this.meetingId = this.applyInfo.meetingId;
        let profile = this.applyInfo.profile;
        this.departmentUserIdsInner.push(profile);
        console.log("首次加入", this.departmentUserIdsInner);
        if (this.applyInfo.subject) {
          this.subject = this.applyInfo.subject;
        }
        this.applyDate = this.applyInfo.meetingDate;
        console.log("智能选择", this.applyInfo);

        this.getMeetingFree(this.meetingId, this.applyInfo.meetingDate);
      }

      if (this.$route.query.departmentUserIdsInner) {
        console.log("删除后的");
        this.departmentUserIdsInner = JSON.parse(
          this.$route.query.departmentUserIdsInner
        );
        console.log("选择后的集团内人员", this.departmentUserIdsInner);
      }
      if (this.$route.query.departmentUserIdsSide) {
        this.departmentUserIdsSide = JSON.parse(
          this.$route.query.departmentUserIdsSide
        );
        console.log("选择前的集团外人员", this.departmentUserIdsSide);
      }
    },
    methods: {
      delPeople1(index) {
        this.departmentUserIdsInner.splice(index, 1);
        console.log("集团内", this.departmentUserIdsInner);
      },
      delPeople2(index) {
        this.departmentUserIdsSide.splice(index, 1);
      },
      selectTime(index) {
        let item = this.timeList[index];
        if (item.status == 1) {
          this.$toast("该时间段已被预约");
        } else {
          item.isSelect = !item.isSelect;
        }
        this.$set(this.timeList, index, item);
      },
      gotoBack() {
        this.$router.go(-1);
      },
      //选择入住人员
      chooseMan(manType) {
        console.log("manType", manType);
        this.isBox = false;
        if (manType == 1) {
          if (this.chooseType == "shift" || this.chooseType == "active") {
            this.$router.push({
              path: "/homePage/peopleList",
              query: {
                chooseType: this.chooseType,
                shiftInfo: JSON.stringify(this.shiftInfo),
                departmentUserIdsInner: JSON.stringify(
                  this.departmentUserIdsInner
                ),
                departmentUserIdsSide: JSON.stringify(this.departmentUserIdsSide)
              }
            });
          }
          if (this.chooseType == "meeting") {
            console.log("集团内会议");
            console.log("集团内人员", this.departmentUserIdsInner);
            console.log("集团外人员", this.departmentUserIdsSide);
            this.applyInfo.subject = this.subject;
            this.$router.push({
              path: "/homePage/peopleList",
              query: {
                chooseType: this.chooseType,
                applyInfo: JSON.stringify(this.applyInfo),
                departmentUserIdsInner: JSON.stringify(
                  this.departmentUserIdsInner
                ),
                departmentUserIdsSide: JSON.stringify(this.departmentUserIdsSide)
              }
            });
          }
        } else {
          if (this.chooseType == "shift" || this.chooseType == "active") {
            this.$router.push({
              path: "/homePage/peopleApply",
              query: {
                chooseType: this.chooseType,
                shiftInfo: JSON.stringify(this.shiftInfo),
                departmentUserIdsInner: JSON.stringify(
                  this.departmentUserIdsInner
                ),
                departmentUserIdsSide: JSON.stringify(this.departmentUserIdsSide)
              }
            });
          }
          if (this.chooseType == "meeting") {
            console.log("集团外会议");
            console.log("集团内人员", this.departmentUserIdsInner);
            console.log("集团外人员", this.departmentUserIdsSide);
            this.applyInfo.subject = this.subject;
            this.$router.push({
              path: "/homePage/peopleApply",
              query: {
                chooseType: this.chooseType,
                applyInfo: JSON.stringify(this.applyInfo),
                departmentUserIdsInner: JSON.stringify(
                  this.departmentUserIdsInner
                ),
                departmentUserIdsSide: JSON.stringify(this.departmentUserIdsSide)
              }
            });
          }
        }
      },
      // 日期
      openDate() {
        this.$refs.formdate.open();
        if (!this.formDate) {
          this.formDate =
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate();
          console.log("日期", this.formDate);
        }
      },
      //会议室-空闲时段
      getMeetingFree(meetingId, meetingDate) {
        meetingFreeApi
          .create({
            meetingId: meetingId,
            date: meetingDate
          })
          .then(res => {
            console.log("会议时间", res);
            this.meetTime = res.data;
          })
          .catch(err => {
            console.log("报错信息free", err);
          });
      },

      //时间
      openStart() {
        this.$refs.dateStart.open();
        if (!this.startTime) {
          this.startTime = "08:00";
        }
      },
      openEnd() {
        this.$refs.dateEnd.open();
        if (!this.endTime) {
          this.endTime = "17:00";
        }
      },
      handleConfirmDate(val) {
        console.log(val,"value");
        if (this.formDate) {
          this.formDate =
            new Date(val).getFullYear() +
            "-" +
            (new Date(val).getMonth() + 1) +
            "-" +
            new Date(val).getDate();
          console.log(this.formDate,"2222");
        }
      },

      handCancel() {
        // this.formDate= this.$moment().format('ll');
        this.formDate =
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate();

        console.log("1", this.formDate);

        console.log("取消了")
        
      },
      // 判断时间大小
      determine(s1, s2, type) {
        s1 = s1.split(":");
        s2 = s2.split(":");
        let start = parseInt(s1[0]) * 3600 + parseInt(s1[1]) * 60;
        let end = parseInt(s2[0]) * 3600 + parseInt(s2[1]) * 60;
        if (type == "start") {
          return end - start == 0 || end - start > 0;
        } else {
          return end - start == 0 || end - start < 0;
        }
      },
      handleConfirmStart(val) {
        let time = this.meetTime[0].startTime;
        if (this.determine(time, val, "start")) {
          this.startTime = val;
        } else {
          this.$toast("请在可预约时间内选择开始时间");
          this.startTime = "";
        }
      },
      handleConfirmEnd(val) {
        let time = this.meetTime[0].endTime;
        if (this.determine(time, val, "end")) {
          this.endTime = val;
        } else {
          this.$toast("请在可预约时间内选择结束时间");
          this.endTime = "";
        }
      },
      handleConfirm1(val) {
        console.log("dfd", val);
        var year = new Date(val).getFullYear();
        var month = new Date(val).getMonth() + 1;
        var date = new Date(val).getDate();
        this.placeDate = year + "-" + month + "-" + date;
        this.applyDate = this.placeDate;
      },
      //个人信息
      getUserInfo() {
        getUserInfoApi
          .create({
            userId: this.userId
          })
          .then(res => {
            console.log("个人信息", res);
            if (res.code == 0) {
              this.userInfo = res.data;
            }
          })
          .catch(err => {
            console.log("报错信息user", err);
          });
      },
      //获取活动中心空闲时段
      placeTime() {
        placeTimeApi
          .create({
            placeId: this.placeId,
            date: this.shiftInfo.meetingDate
          })
          .then(res => {
            console.log("活动-空闲时段", res);
            if (res.code == 0) {
              this.timeList = res.data;
            }
          })
          .catch(err => {
            console.log("报错信息time", err);
          });
      },
      //申请
      apply() {
        if (this.canApply) {
          this.canApply = false;
          this.departmentUserIds = [];
          this.departmentUserIds = [
            ...this.departmentUserIdsSide,
            ...this.departmentUserIdsInner
          ];
          console.log("参会人", this.departmentUserIds);
          if (this.chooseType == "shift") {
            if (!this.roomId) {
              this.$toast("没有匹配的房间号");
              return;
            }
            if (this.departmentUserIds.length == 0) {
              this.$toast("请选择人员");
              return;
            }

            roomApplyApi
              .create({
                roomId: this.roomId,
                applyTime: this.shiftInfo.meetingDate,
                remark: this.shiftRemark,
                roomMember: this.departmentUserIds,
                applyUserId: this.userInfo.userId,
                applyUserName: this.userInfo.userName
              })
              .then(res => {
                this.canApply = true;
                console.log("倒班申请", res);
                if (res.code == 0) {
                  this.$toast("操作成功");
                  this.$router.push({
                    path: "/homePage/home",
                    query: {chooseType: this.chooseType, uuid: this.userId}
                  });
                } else if (res.code == 500) {
                  this.$toast("该时间段已经被占用，请重新选择");
                }
              })
              .catch(err => {
                this.$toast(err.data.message);
              });
          }
          if (this.chooseType == "meeting") {
            if (!this.meetingId) {
              this.$toast("没有匹配的会议室！");
              return;
            }
            if (!this.subject) {
              this.$toast("请填写会议主题！");
              return;
            }
            if (!this.departmentUserIds || this.departmentUserIds.length == 0) {
              this.$toast("请选择会议人员！");
              return;
            }

            meetingApplyApi
              .create({
                meetingId: this.meetingId,
                subject: this.subject,
                remark: this.meetRemark,
                applyDate: this.applyDate,
                startTime: this.startTime,
                endTime: this.endTime,
                meetingMember: this.departmentUserIds,
                applyUserId: this.userInfo.userId,
                applyUserName: this.userInfo.userName
              })
              .then(res => {
                this.canApply = true;
                console.log("会议申请", res);
                if (res.code == 0) {
                  this.$toast("操作成功");
                  this.$router.push({
                    path: "/homePage/home",
                    query: {chooseType: this.chooseType, uuid: this.userId}
                  });
                } else if (res.code == 500) {
                  this.$toast("该时间段已经被占用，请重新选择");
                }
              })
              .catch(err => {
                this.$toast(err.data.message);
              });
          }
          if (this.chooseType == "active") {
            if (!this.placeId) {
              this.$toast("没有匹配的活动中心！");
              return;
            }
            if (!this.departmentUserIds || this.departmentUserIds.length == 0) {
              this.$toast("请选择参加人员！");
              return;
            }

            var selectItem = [];
            this.timeList.forEach((v, k) => {
              if (v.isSelect) {
                selectItem.push(v);
              }
            });
            if (!selectItem || selectItem == 0) {
              this.$toast("请选择预约时间！");
              return;
            }

            placeApplyApi
              .create({
                placeId: this.placeId,
                subject: this.subject,
                applyDate: this.shiftInfo.meetingDate,
                applyTimes: selectItem,
                placeMember: this.departmentUserIds,
                applyUserId: this.userInfo.userId,
                applyUserName: this.userInfo.userName,
                remark: this.placeRemark
              })
              .then(res => {
                this.canApply = true;
                console.log("活动中心申请", res);
                if (res.code == 0) {
                  this.$toast("操作成功");
                  this.$router.push({
                    path: "/homePage/home",
                    query: {chooseType: this.chooseType, uuid: this.userId}
                  });
                } else if (res.code == 500) {
                  this.$toast("该时间段已经被占用，请重新选择");
                }
              })
              .catch(err => {
                this.$toast(err.data.message);
              });
          }
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .tabs {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;

    span {
      line-height: 12px;
      padding: 2px 8px;
      margin: 0 15px 15px 15px;
      border: 1px #888888 solid;
      border-radius: 10px;
      color: #888888;
    }
  }

  .homePage-buildApply {
    min-height: 100vh;
    background-color: #eee;

    .title {
      height: 50px;
      padding: 10px;
      background-color: #ff2c2c;
      font-size: 16px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: fixed;
      top: 0;
      z-index: 999;
      width: 100%;

      .title-icon {
        position: absolute;
        width: 20px;
        height: 20px;
        left: 10px;
        bottom: 10px;
      }
    }

    .content {
      margin: 50px 0 66px 0;
      overflow: hidden;

      .apply-info {
        background-color: #fff;
        padding: 10px 15px;
        margin-top: 10px;
        -moz-box-shadow: 5px 5px 5px #e3e3e3;
        box-shadow: 5px 5px 5px #e3e3e3;
        display: flex;
        font-size: 14px;

        img {
          width: 90px;
          height: 50px;
          object-fit: cover;
        }

        .apply-info-txt {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 10px;
          box-sizing: border-box;
          flex: 1;

          .txt1 {
            font-size: 14px;
            font-weight: 500;
          }

          .txt2 {
            font-size: 12px;
            line-height: 15px;
            margin-top: 15px;
          }
        }

        .apply-info-man {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          flex-shrink: 0;
        }

        .apply-info-tabs {
          display: flex;
          flex-wrap: wrap;

          .tab-item {
            padding: 5px 10px;
            border-radius: 3px;
            // border: 1px solid #ff2c2c;
            font-size: 12px;
            color: #ff2c2c;
            margin: 0 0 10px 5px;
            line-height: 20px;
          }

          .tab-item-add {
            border: 1px solid #eee;
            color: #999;
            display: flex;
            align-items: center;

            .icon {
              color: #999;
            }
          }
        }

        .apply-info-remark {
          width: 100%;
          min-height: 50px;
          padding-left: 10px;
          line-height: 30px;
        }

        .form-time {
          width: 100%;
          padding: 10px 0;
          box-sizing: border-box;
          border-bottom: 1px solid #eee;
          text-align: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      .apply-time {
        background: none;
        -moz-box-shadow: none;
        box-shadow: none;

        .apply-info-tabs {
          .tab-item {
            border: none;
            color: #000;
            background-color: #fff;
            -moz-box-shadow: 5px 5px 5px #e3e3e3;
            box-shadow: 5px 5px 5px #e3e3e3;
          }
        }
      }

      .apply-meet {
        padding: 0 5px;
        margin: 0;
      }

      .apply-active {
        display: flex;
        justify-content: space-between;

        select {
          height: 100%;
          text-align: center;
          text-align-last: center;
          background: none;
          border: none;
          outline: none;
        }

        .apply-active-select {
          display: flex;
          align-items: center;
        }
      }
    }

    .foot-btn {
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      height: 70px;
      line-height: 70px;
      text-align: center;
      color: #ff2c2c;
      font-size: 16px;
      font-weight: 500;
      -moz-box-shadow: 0px -5px 5px -5px #e3e3e3;
      box-shadow: 0px -5px 5px -5px #e3e3e3;
    }

    .dialog-box {
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.65);
      position: absolute;
      top: 0;
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;

      .dialog {
        width: 200px;
        padding: 40px 40px 20px 40px;
        border: 1px solid #eee;
        border-radius: 3px;
        background-color: #fff;
        color: #fff;

        .dialog-btn {
          width: 100%;
          height: 50px;
          line-height: 50px;
          margin-bottom: 20px;
          background-color: #ff2c2c;
          text-align: center;
          border-radius: 5px;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }
</style>
