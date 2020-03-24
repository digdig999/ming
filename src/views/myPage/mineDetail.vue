<template>
  <div class="homePage-mineDetail">
    <mt-header class="title" title="入住详情" v-if="chooseType=='shift'&&detailType=='type1'">
      <icon class="title-icon" name="chevron-left" slot="left" @click.native="gotoBack"></icon>
    </mt-header>
    <mt-header class="title" title="倒班楼详情" v-if="chooseType=='shift'&&detailType=='type2'">
      <icon class="title-icon" name="chevron-left" slot="left" @click.native="gotoBack"></icon>
    </mt-header>
    <mt-header class="title" title="入住详情" v-if="chooseType=='shift'&&detailType=='type3'">
      <icon class="title-icon" name="chevron-left" slot="left" @click.native="gotoBack"></icon>
    </mt-header>
    <mt-header class="title" title="会议详情" v-if="chooseType=='meeting'">
      <icon class="title-icon" name="chevron-left" slot="left" @click.native="gotoBack"></icon>
    </mt-header>
    <mt-header class="title" title="活动中心详情" v-if="chooseType=='active'">
      <icon class="title-icon" name="chevron-left" slot="left" @click.native="gotoBack"></icon>
    </mt-header>

    <div class="content">
      <!--倒班-->
      <div class="mine-detail-box" v-if="chooseType=='shift'">
        <div class="mine-detail">
          <!--<img src="../../assets/888.jpg"/>-->
          <img
            :src="applyItem&&applyItem.imagePath?imagePath+applyItem.imagePath:'../../assets/888.jpg'"/>
          <div class="mine-detail-txt">
            <span class="txt1">{{applyItem.address}}</span>
            <span class="txt2">入住时间：{{applyItem.applyTime}}</span>
            <div class="txt-box">
              <span class="mine-detail-man">入住人员：</span>
              <div class="mine-detail-tabs">
                <span class="tab-item" v-for="(item,index) in applyItem.roomMember" :key="index">{{item.userName}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mine-detail-remark">
          <span>备注：{{applyItem.remark}}</span>
        </div>
      </div>
      <!--会议-->
      <div class="mine-detail-box" v-if="chooseType=='meeting'">
        <div class="mine-detail">
          <img
            :src="meetingInfo&&meetingInfo.imagePath?imagePath+meetingInfo.imagePath:'../../assets/888.jpg'"/>
          <div class="mine-detail-txt">
            <span
              class="txt1">{{meetingInfo&&meetingInfo.meetingName?meetingInfo.meetingName:''}}</span>
            <span class="txt2">会议室：{{meetingInfo&&meetingInfo.addressName?meetingInfo.addressName:''}}</span>
            <div class="txt-box">
              <span class="mine-detail-man">参会人：</span>
              <div class="mine-detail-tabs" v-if="meetingInfo&&meetingInfo.meetingMember">
                <span class="tab-item" v-for="(item,index) in meetingInfo.meetingMember"
                      :key="index">{{item.userName}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mine-detail-remark">
          <span>主题：{{meetingInfo&&meetingInfo.subject?meetingInfo.subject:''}}</span>
        </div>
        <div class="mine-detail-remark">
          <span>会议日期：{{meetingInfo&&meetingInfo.applyDate?meetingInfo.applyDate:''}}</span>
        </div>
        <div class="mine-detail-remark">
          <span>会议时间：{{meetingInfo&&meetingInfo.startTime?meetingInfo.startTime:''}}-{{meetingInfo&&meetingInfo.endTime?meetingInfo.endTime:''}}</span>
        </div>
        <div class="mine-detail-remark">
          <span>备注：{{meetingInfo&&meetingInfo.remark?meetingInfo.remark:''}}</span>
        </div>
      </div>
      <!--<div class="mine-detail-box" v-if="chooseType=='meeting'&&detailType=='type1'">-->
      <!--<p>会议纪要</p>-->
      <!--<div class="mine-detail-upload">-->
      <!--&lt;!&ndash;<span style="color: blue;">张亮的会议申请纪要</span>&ndash;&gt;-->
      <!--<form enctype="multipart/form-data" name="fileinfo" id="myForm">-->
      <!--<input type="file" id="people-export" ref="inputer" @change="getFileUpload($event)"/>-->
      <!--</form>-->
      <!--<span style="color: red;" @click="upLoadFile">上传</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="mine-detail-box" v-if="chooseType=='meeting'&&detailType=='type2'">-->
      <!--<p>会议纪要</p>-->
      <!--<div class="meeting-remark">-->
      <!--<span>张亮的会议申请纪要</span>-->
      <!--</div>-->
      <!--</div>-->
      <div class="mine-detail-box" v-if="chooseType=='meeting'&&detailType=='type2'">
        <div class="meeting-code">
          <span>我的二维码</span>
          <icon name="angle-right"></icon>
        </div>
      </div>
      <div class="mine-detail-box" v-if="chooseType=='meeting'&&detailType=='type3'">
        <p>会议纪要</p>
        <div class="mine-detail-upload">
          <span v-if="meetingInfo.filePath.length>0"
                style="color: blue;">{{meetingInfo.filePath.length>0?meetingInfo.filePath[0].fileName:''}}</span>
          <form v-if="!meetingInfo.filePath.length>0" enctype="multipart/form-data" name="fileinfo"
                id="myForm">
            <input type="file" id="people-export" ref="inputer" @change="getFileUpload($event)"/>
          </form>
          <!--          <span style="color: red;" @click="upLoadFile">{{meetingInfo}}</span>-->
        </div>
      </div>
      <!--活动中心-->
      <div class="mine-detail-box" v-if="chooseType=='active'">
        <div class="mine-detail">
          <img
            :src="applyItem&&applyItem.imagePath?imagePath+applyItem.imagePath:'../../assets/888.jpg'"/>
          <div class="mine-detail-txt">
            <span class="txt1">{{applyItem&&applyItem.subject?applyItem.subject:''}}</span>
            <span class="txt2">预定时间：{{applyItem&&applyItem.applyTime?applyItem.applyTime:''}}</span>
            <span class="txt2">运动中心地点：{{applyItem&&applyItem.address?applyItem.address:''}}</span>
            <div class="txt-box">
              <span class="mine-detail-man">参加人员：</span>
              <div class="mine-detail-tabs" v-if="applyItem&&applyItem.placeMember">
                <span class="tab-item" v-for="(item,index) in applyItem.placeMember" :key="index">{{item.userName}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mine-detail-remark">
          <span>备注：{{applyItem&&applyItem.remark?applyItem.remark:''}}</span>
        </div>
      </div>

      <div class="mine-detail-box">
        <p>已过流程</p>
        <div class="mine-detail-steps">
          <div class="steps-slide">
            <icon class="icon icon1" name="circle"></icon>
            <span class="slide"></span>
            <icon class="icon icon0" name="circle"
                  v-if="meetingInfo.applyStatus ==0||applyItem.applyStatus ==0"></icon>
            <icon class="icon icon1" name="circle"
                  v-if="meetingInfo.applyStatus ==1||applyItem.applyStatus ==1"></icon>
            <icon class="icon icon2" name="circle"
                  v-if="meetingInfo.applyStatus ==2||applyItem.applyStatus ==2"></icon>
            <icon class="icon icon3" name="circle"
                  v-if="meetingInfo.applyStatus ==3||applyItem.applyStatus ==3"></icon>
          </div>
          <div class="steps-content" v-if="chooseType=='meeting'">
            <p>{{meetingInfo&&meetingInfo.applyUserName?meetingInfo.applyUserName:''}}</p>
            <p class="tip">发起</p>
            <p v-for="(item,index) in meetingInfo.approvalList" :key="index">
              {{item.approval?item.approval:'暂无审核人'}}
              <span class="tip" v-if="meetingInfo.applyStatus ==0 ">处理中</span>
              <span class="tip" v-if="meetingInfo.applyStatus ==1 ">已通过</span>
              <span class="tip" v-if="meetingInfo.applyStatus ==2 ">已拒绝</span>
              <span class="tip" v-if="meetingInfo.applyStatus ==3 ">已取消</span>
            </p>
          </div>
          <div class="steps-content" v-else>
            <p>{{applyItem&&applyItem.applyUserName?applyItem.applyUserName:''}}</p>
            <p class="tip">发起</p>
            <span v-for="(item,index) in applyItem.approvalList" :key="index">
              {{item.approval?item.approval:'暂无审核人'}}
              <span class="tip" v-if="applyItem.applyStatus ==0 ">处理中</span>
              <span class="tip" v-if="applyItem.applyStatus ==1 ">已通过</span>
              <span class="tip" v-if="applyItem.applyStatus ==2 ">已拒绝</span>
              <span class="tip" v-if="applyItem.applyStatus ==3 ">已取消</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="foot-box" v-if="detailType=='type1'">
        <div class="foot-btn-box">
          <div class="foot-btn btn1" @click="agreeApply(1)">同意</div>
        </div>
        <div class="foot-btn-box">
          <div class="foot-btn btn2" @click="agreeApply(2)">驳回</div>
        </div>
      </div>
      <div class="foot-box"
           v-if="detailType=='type2'&&(applyItem.applyStatus!=3||meetingInfo.applyStatus!=3)&&(applyItem.applyStatus!=2||meetingInfo.applyStatus!=2)">
        <div class="foot-btn-box">
          <div v-if='applyItem.applyStatus==0' class="foot-btn btn1" @click="agreeApply(3)">撤销</div>
        </div>
      </div>
    </div>

    <!--<div v-if="chooseType=='shift' || chooseType=='active'">-->
    <!--<div class="foot-box" v-if="applyItem&&applyItem.applyStatus==0">-->
    <!--<div class="foot-btn-box">-->
    <!--<div class="foot-btn btn1" @click="agreeApply(1)">同意</div>-->
    <!--</div>-->
    <!--<div class="foot-btn-box">-->
    <!--<div class="foot-btn btn2" @click="agreeApply(2)">拒绝</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="foot-box" v-if="applyItem&&applyItem.applyStatus==1">-->
    <!--<div class="foot-btn-box">-->
    <!--<div class="foot-btn btn1" @click="agreeApply(3)">撤销</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="foot-box" v-if="detailType=='type1'">-->
    <!--<div class="foot-btn-box">-->
    <!--<div class="foot-btn btn1">同意</div>-->
    <!--</div>-->
    <!--<div class="foot-btn-box">-->
    <!--<div class="foot-btn btn2">拒绝</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="foot-box" v-if="detailType=='type2'">-->
    <!--<div class="foot-btn-box">-->
    <!--<div class="foot-btn btn1">撤销</div>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
    //引入接口
    import {
        imagePath,
        getMeetingInfoApi,
        roomApplyActionApi,
        fileUploadApi,
        fileBadingApi,
        meetingApplyStatusApi,
        placeApplyActionApi
    } from '../../api/restApi.js'

    export default {
        name: 'mine',
        data() {
            return {
                imagePath: '',
                chooseType: '',
                detailType: '',
                manList: [
                    {name: '张亮'},
                    {name: '张亮'},
                ],
                meetingInfo: {},
                applyItem: {},
                file: [],
            }
        },
        created() {
            this.imagePath = imagePath

            //当前预定类型
            if (this.$route.query.chooseType) {
                this.chooseType = this.$route.query.chooseType
            }

            if (this.$route.query.detailType) {
                this.detailType = this.$route.query.detailType
            }

            if (this.$route.query.applyItem) {
                this.applyItem = JSON.parse(this.$route.query.applyItem)
                console.log('详情', this.applyItem)
            }

            if (this.chooseType == 'meeting') {
                //会议详情
                // this.getMeetingInfoApi()
                this.meetingInfo = JSON.parse(this.$route.query.applyItem)
                console.log(this.meetingInfo);
            }

        },
        methods: {
            gotoBack() {
                this.$router.go(-1)
            },
            //申请
            agreeApply(type) {
                if (this.chooseType == 'shift') {
                    roomApplyActionApi.create({
                        applyId: this.applyItem.applyId,
                        applyStatus: type,
                        approvalUserId: this.applyItem.approvalList[this.applyItem.approvalList.length - 1].id,
                        approval: this.applyItem.approvalList[this.applyItem.approvalList.length - 1].approval
                    })
                        .then(res => {
                            console.log('申请', res.data)
                            if (res.code == 0) {
                                this.$toast('操作成功')
                                this.$router.back()
                            } else {
                                this.$toast(res.message)
                            }
                        })
                        .catch(err => {
                            this.$toast(err.data.message)
                        })
                }
                if (this.chooseType == 'meeting') {
                    meetingApplyStatusApi.create({
                        applyId: this.applyItem.applyId,
                        applyStatus: type,
                        approvalUserId: this.applyItem.approvalList[this.applyItem.approvalList.length - 1].id,
                        approval: this.applyItem.approvalList[this.applyItem.approvalList.length - 1].approval
                    })
                        .then(res => {
                            console.log('申请', res.data)
                            if (res.code == 0) {
                                this.$toast('操作成功')
                                this.$router.back()
                            } else {
                                this.$toast(res.message)
                            }
                        })
                        .catch(err => {
                            this.$toast(err.data.message)
                        })
                }
                if (this.chooseType == 'active') {
                    placeApplyActionApi.create({
                        applyId: this.applyItem.applyId,
                        type: type,
                    })
                        .then(res => {
                            console.log('申请', res.data)
                            if (res.code == 0) {
                                this.$toast('操作成功')
                                this.$router.back()
                            } else {
                                this.$toast(res.message)
                            }
                        })
                        .catch(err => {
                            this.$toast(err.data.message)
                        })
                }
            },

            //会议室-获取会议详情
            getMeetingInfoApi() {
                var meetingId = ''
                if (this.$route.query.meetingId) {
                    meetingId = this.$route.query.meetingId
                }
                getMeetingInfoApi.create({
                    meetingId: 1
                })
                    .then(res => {
                        console.log('会议详情', res.data)
                        if (res.code == 0) {
                            this.meetingInfo = res.data
                        }
                    })
                    .catch(err => {
                        console.log('报错信息', err)
                    })
            },
            //上传文件
            getFileUpload(event) {
                // 上传文件
                this.file = event.target.files
                this.upLoadFile()
            },
            upLoadFile() {
                var formData = new FormData()
                formData.append('file', this.file[0])
                // 文件上传
                fileUploadApi.create(formData)
                    .then(res => {
                        console.log('上传', res.data)
                        if (res.code == 0) {
                            var formData1 = new FormData()
                            formData1.append('applyId', this.applyItem.applyId)
                            formData1.append('fileName', res.data.fileName)
                            formData1.append('filePath', res.data.filePath)
                            fileBadingApi.create(formData1)
                                .then(res => {
                                    if (res.code == 0) {
                                        this.$toast('上传成功')
                                    }
                                })
                            // this.$toast('上传成功')
                        }
                    })
                    .catch(err => {
                        console.log('报错信息', err)
                    })
            }
        }
    }
</script>

<style lang="less">
  .homePage-mineDetail {
    min-height: 100vh;
    background-color: #eee;

  .title {
    height: 50px;
    padding: 10px;
    background-color: #FF2C2C;
    font-size: 16px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;

  .title-icon {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 10px;
    bottom: 10px;
  }

  }
  .content {

  .mine-detail-box {
    min-height: 40px;
    background-color: #fff;
    padding: 10px 15px;
    margin-top: 10px;
    -moz-box-shadow: 5px 5px 5px #E3E3E3;
    box-shadow: 5px 5px 5px #E3E3E3;
    font-size: 12px;

  .mine-detail {
    display: flex;

  img {
    width: 90px;
    height: 50px;
    object-fit: cover;
  }

  .mine-detail-txt {
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
    margin-top: 10px;
  }

  .txt-box {
    display: flex;
    font-size: 12px;
    line-height: 15px;
    margin-top: 10px;

  .mine-detail-man {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    flex-shrink: 0;
  }

  .mine-detail-tabs {
    display: flex;
    flex-wrap: wrap;

  .tab-item {
    padding: 3px 5px;
    border-radius: 3px;
    border: 1px solid #FF2C2C;
    font-size: 12px;
    color: #FF2C2C;
    margin: 0 0 5px 5px;
  }

  }
  }
  }
  }
  .mine-detail-remark {
    padding: 5px 0 15px 0;
    font-size: 12px;
  }

  .mine-detail-steps {
    padding: 15px 0;
    display: flex;

  .steps-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;

  .icon {
    width: 14px;
    height: 14px;
  }

  .icon3 {
    color: #BEBEBE;
  }

  .icon1 {
    color: #00CD00;
  }

  .icon0 {
    color: #EDBD25;
  }

  .icon2 {
    color: #FF6347;
  }

  .slide {
    width: 1px;
    height: 50px;
    background-color: #eee;
  }

  }
  .steps-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  .tip {
    color: #BEBEBE;
  }

  }
  }
  .mine-detail-upload {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  .meeting-remark {
    min-height: 80px;
    margin: 10px 0;
  }

  .meeting-code {
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  }
  }
  .foot-box {
    /*position: fixed;*/
    /*bottom: 0;*/
    width: 100%;
    box-sizing: border-box;
    padding: 30px 0;
    display: flex;
    justify-content: center;

  .foot-btn-box {
    width: 50%;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .foot-btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
  }

  .btn1 {
    background-color: #FF2C2C;
    color: #fff;
  }

  .btn2 {
    background-color: #fff;
  }

  }
  }
</style>
