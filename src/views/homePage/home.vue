<template>
  <div class="homePage-home">
    <!--标题-->
    <mt-header v-if="chooseType==='shift'&&tab===1" class="title" title="倒班楼预定"></mt-header>
    <mt-header v-if="chooseType==='meeting'&&tab===1" class="title" title="会议室预定"></mt-header>
    <mt-header v-if="chooseType==='active'&&tab===1" class="title" title="活动中心预定"></mt-header>
    <mt-header v-if="chooseType==='meeting'&&tab===2" class="title" title="会议室预定"></mt-header>
    <mt-header v-if="tab===3" class="title" title="我的"></mt-header>
    <!--内容-->
    <div :class="tab===3?'mine':'home'">
      <mt-tab-container v-model="selected">
        <!--首页-->

        <mt-tab-container-item id="tab1">
          <!--日期-->
          <div class="tab-tit-cell">
            <div
              :class="item.isToday?'tab-tit-item isTit':'tab-tit-item'"
              v-for="(item,index) in weekArr"
              :key="index"
              @click="changeWeek(item.date,item.data)"
            >
              <span>{{item.date}}</span>
              <span>{{item.week}}</span>
            </div>
          </div>

          <!--倒班楼预定-->
          <div class="tab-select-cell" v-if="chooseType==='shift'">
            <div class="tab-select-item">
              <select
                v-model="buildSelect"
                @change="changeBuild"
                style=" appearance: none;-moz-appearance: none;-webkit-appearance: none;"
              >
                <option value>全部楼栋</option>
                <option
                  :value="build.buildingId"
                  :key="build.buildingId"
                  v-for="build in buildList"
                >{{build.buildingName?build.buildingName:'楼'}}
                </option>
              </select>
              <icon name="angle-down"></icon>
            </div>
            <div class="tab-select-item">
              <select
                v-model="floorSelect"
                @change="getFreeRoomList"
                style=" appearance: none;-moz-appearance: none;-webkit-appearance: none;"
              >
                <option value>全部楼层</option>
                <option
                  :value="floor.floorId"
                  :key="floor.floorId"
                  v-for="floor in floorList"
                >{{floor.floorName?floor.floorName:'楼层'}}
                </option>
              </select>
              <icon name="angle-down"></icon>
            </div>
          </div>

          <!--会议室预定-->
          <div class="tab-select-cell" v-if="chooseType==='meeting'">
            <div class="tab-select-item" @click="openFloor">
              <!--<select v-model="floorSelect" @change="getMeetingList">-->
              <!--<option value="">楼层</option>-->
              <!--<option :value="floor.addressId" :key="floor.addressId" v-for="floor in floorList">{{floor.name}}</option>-->
              <!--</select>-->
              <span class="floor-select-name">{{floorSelectName}}</span>
              <icon name="angle-down"></icon>
            </div>
            <div class="floor-box" v-if="isFloor">
              <!--<div class="floor-left">-->
              <!--<span @click="chooseZone(index)" v-for="(item,index) in zoneList" :key="index" :style="zoneIndex==index?'background-color:#fff':''">{{item.dictLabel}}</span>-->
              <!--</div>-->
              <div class="floor-right">
                <span
                  @click="chooseFloor(index)"
                  v-for="(item,index) in floorList"
                  :key="index"
                  :class="floorIndex==index?'active':''"
                >{{item.name}}</span>
              </div>
            </div>
            <div class="tab-select-item" @click="openMeet">
              <!--<select v-model="meetSelect" @change="getMeetingList">-->
              <!--<option value="">类型</option>-->
              <!--<option :value="meet.value" :key="meet.value" v-for="meet in meetTypeList">{{meet.name}}</option>-->
              <!--</select>-->
              <span class="floor-select-name">{{meetSelectName}}</span>
              <icon name="angle-down"></icon>
            </div>
            <div class="floor-box" v-if="isMeet">
              <div class="floor-right">
                <span
                  @click="chooseMeet(index)"
                  v-for="(item,index) in meetTypeList"
                  :key="index"
                  :class="meetIndex==index?'active':''"
                >{{item.name}}</span>
              </div>
            </div>
            <div class="tab-select-item" @click="openTime">
              <!--<select v-model="timeSelect" @change="getMeetingList">-->
              <!--<option value="">时段</option>-->
              <!--<option :value="time" :key="index" v-for="(time,index) in timeList">{{time}}</option>-->
              <!--</select>-->
              <span class="floor-select-name">{{timeSelectName}}</span>
              <icon name="angle-down"></icon>
            </div>
            <div class="floor-box" v-if="isTime">
              <div class="floor-right">
                <span
                  @click="chooseTime(index)"
                  v-for="(item,index) in timeList"
                  :key="index"
                  :class="timeIndex==index?'active':''"
                >{{item}}</span>
              </div>
            </div>
            <!--<div class="floor-box" v-if="isTime">-->
            <!--<div class="floor-right">-->
            <!--<div class="time-line-box">-->
            <!--<div class="time-line-pick">-->
            <!--<div class="time-line-pick1"></div>-->
            <!--</div>-->
            <!--<div class="time1" @mousemove="getTimePick"></div>-->
            <!--<div class="time2"></div>-->
            <!--</div>-->
            <!--<div class="time-line-num" v-if="timeList&&timeList.length>0">-->
            <!--<p>{{timeList[0].startTime}}</p>-->
            <!--<p>{{timeList[0].endTime}}</p>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
          </div>

          <!--活动中心预定-->
          <div class="tab-select-cell" v-if="chooseType==='active'">
            <div class="tab-select-item">
              <select
                v-model="buildSelect"
                @change="changeBuild"
                style=" appearance: none;-moz-appearance: none;-webkit-appearance: none;"
              >
                <option value>全部楼号</option>
                <option
                  :value="build.buildingId"
                  :key="build.buildingId"
                  v-for="build in buildList"
                >{{build.buildingName?build.buildingName:'全部楼号'}}
                </option>
              </select>
              <icon name="angle-down"></icon>
            </div>
            <div class="tab-select-item">
              <select
                v-model="floorSelect"
                @change="getFreePlaceList"
                style=" appearance: none;-moz-appearance: none;-webkit-appearance: none;"
              >
                <option value>全部楼层</option>
                <option
                  :value="floor.floorId"
                  :key="floor.floorId"
                  v-for="floor in floorList"
                >{{floor.floorName?floor.floorName:'全部楼层'}}
                </option>
              </select>
              <icon name="angle-down"></icon>
            </div>
            <div class="tab-select-item">
              <select
                v-model="placeSelect"
                @change="getFreePlaceList"
                style=" appearance: none;-moz-appearance: none;-webkit-appearance: none;"
              >
                <option value>全部类型</option>
                <option
                  :value="place.placeId"
                  :key="place.placeId"
                  v-for="place in placeList"
                >{{place.placeName?place.placeName:'全部类型'}}
                </option>
              </select>
              <icon name="angle-down"></icon>
            </div>
          </div>

          <!--倒班楼-->
          <div class="tab-img-cell" v-if="chooseType==='shift' || chooseType==='active'">
            <div
              class="tab-img-item"
              v-for="(item,index) in imgList"
              :key="index"
              @click="goToBuildApply(item,chooseType)"
            >
              <div class="tab-img-position">
                <img :src="item&&item.imagePath?imagePath+item.imagePath:'../../assets/888.jpg'"/>
                <!--<img v-if="item.imagePath" :src="fileDownload(item.imagePath)"/>-->
                <!--<img v-else src="../../assets/888.jpg" />-->
                <!--活动中心-->
                <div class="tab-img-tip tab-img-active" v-if="chooseType==='active'">
                  <div>{{item.placeName}}</div>
                  <div class="active-tip">
                    <span>{{item.address}}</span>
                    <span
                      style="color: #00CD00;font-size: 16px;"
                    >{{item.number?'可容纳'+item.number+'人':''}}</span>
                  </div>
                </div>
                <!--倒班楼-->
                <div class="tab-img-tip" v-if="chooseType==='shift'">
                  <span>{{item&&item.roomName?item.roomName+'室':''}}</span>
                  <span>{{item&&item.bedInfo?item.bedInfo:''}}</span>
                </div>
              </div>
            </div>
          </div>

          <!--会议室-->
          <div class="tab-meet-cell" v-if="chooseType==='meeting'">
            <div
              class="tab-meet-item"
              v-for="(item,indexs) in meetList"
              :key="indexs"
              @click="goToBuildApply(item,chooseType)"
            >
              <img
                :src="item&&item.imagePath?imagePath+item.imagePath:require('../../assets/empty@2x.png')"
              />
              <!--<img v-if="item.imagePath" :src="fileDownload(item.imagePath)"/>-->
              <!--<img v-else src="../../assets/888.jpg" />-->
              <div class="tab-meet-content">
                <span class="content-tit">{{item&&item.meetingName?item.meetingName:'会议室'}}</span>
                <span class="content-tip">
                  <span>可容纳{{item&&item.number?item.number:0}}人</span>
                  <span>{{item.addressName?item.addressName:'暂无'}}</span>
                </span>
                <div class="tabs" v-if="item&&item.meetingDevices.length>0">
                  <span
                    v-for="(tab,index) in item.meetingDevices"
                    :key="tab.deviceId"
                  >{{tab.deviceName?tab.deviceName:'设备'+index }}</span>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>

        <!--智能选择-->

        <!-- 这个是内容 -->

        <mt-tab-container-item id="tab2">
          <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
            <div class="menu-container" ref="menuContainer">
              <div class="tab-meet-form" v-if="meetStep<3">
                <div class="form" v-if="meetStep==0">
                  <h3>会议人数</h3>
                  <input type="number" v-model="meetNum" placeholder="请输入人数"/>
                </div>
                <div class="form" v-if="meetStep==1">
                  <h3>时间选择</h3>
                  <div class="form-time" @click="openStart">{{startTime?startTime:'开始时间'}}</div>
                  <div
                    class="form-time"
                    style="margin-top:10px;"
                    @click="openEnd"
                  >{{endTime?endTime:'结束时间'}}
                  </div>
                  <mt-datetime-picker
                    ref="dateStart"
                    type="time"
                    :startHour="9"
                    :endHour="endHour"
                    v-model="startTime"
                    @confirm="handleConfirmStart"
                  ></mt-datetime-picker>
                  <mt-datetime-picker
                    ref="dateEnd"
                    type="time"
                    :startHour="startHour"
                    :endHour="17"
                    v-model="endTime"
                    @confirm="handleConfirmEnd"
                  ></mt-datetime-picker>
                </div>
                <div class="form" v-if="meetStep==2">
                  <h3>楼号选择</h3>
                  <div
                    class="form-floor-choose"
                    @click="openFloor1"
                  >{{floorSelectName1?floorSelectName1:'请选择楼号'}}
                  </div>
                  <div class="form-floor">
                    <!--<div class="form-floor-tit">楼号</div>-->
                    <!--<div class="form-floor-con">-->
                    <!--<mt-radio-->
                    <!--v-model="meetFloor"-->
                    <!--:options="zoneOption">-->
                    <!--</mt-radio>-->
                    <!--</div>-->
                    <div class="floor-box floor-postion" v-if="isFloor1">
                      <!--<div class="floor-left">-->
                      <!--<span @click="chooseZone(index)" v-for="(item,index) in zoneList" :key="index" :style="zoneIndex==index?'background-color:#fff':''">{{item.dictLabel}}</span>-->
                      <!--</div>-->
                      <div class="floor-right">
                        <span
                          @click="chooseFloor(index)"
                          v-for="(item,index) in floorList"
                          :key="index"
                          :class="floorIndex==index?'active':''"
                        >{{item.name}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!--<div class="form" v-if="meetStep==3||meetStep==4">-->
                <!--<h3>设备选择</h3>-->
                <!--<div class="form-device">-->
                <!--<mt-checklist v-model="meetDevice" class="device" :options="meetingDevices"></mt-checklist>-->
                <!--</div>-->
                <!--</div>-->
                <icon
                  v-if="meetStep<3"
                  class="change-form"
                  color="rgba(0,0,0,.2)"
                  name="chevron-circle-right"
                  @click.native="changeForm"
                ></icon>
              </div>
            </div>
          </v-touch>
          <!--会议室-->
          <div class="tab-meet-cell" v-if="chooseType==='meeting'&&meetStep==3">
            <div
              class="tab-meet-item"
              v-for="(item,index) in meetList1"
              :key="index"
              @click="goToBuildApply(item,chooseType)"
            >
              <img :src="item&&item.imagePath?imagePath+item.imagePath:'../../assets/888.jpg'"/>
              <!--<img v-if="item.imagePath" :src="fileDownload(item.imagePath)"/>-->
              <!--<img v-else src="../../assets/888.jpg" />-->
              <div class="tab-meet-content">
                <span class="content-tit">{{item&&item.meetingName?item.meetingName:'会议室'}}</span>
                <span class="content-tip">
                  <span>可容纳{{item&&item.number?item.number:0}}人</span>
                  <span>{{item.addressName?item.addressName:'暂无'}}</span>
                </span>
                <div class="tabs" v-if="item&&item.meetingDevices.length>0">
                  <span v-for="tab in item.meetingDevices" :key="tab.deviceId">{{tab.deviceName}}</span>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>

        <!--我的-->
        <mt-tab-container-item id="tab3">
          <mt-navbar class="tab-type-cell" v-model="type" @click="changeType(type)">
            <mt-tab-item :class="type==='type1'?'tab-type-item isType':'tab-type-item'" id="type1">
              <span @click="changeType('type1')">我的待办</span>
            </mt-tab-item>
            <mt-tab-item :class="type==='type2'?'tab-type-item isType':'tab-type-item'" id="type2">
              <span @click="changeType('type2')">我的申请</span>
            </mt-tab-item>
            <mt-tab-item :class="type==='type3'?'tab-type-item isType':'tab-type-item'" id="type3">
              <span @click="changeType('type3')" v-if="chooseType=='shift'">我的入住</span>
              <span @click="changeType('type3')" v-else-if="chooseType=='meeting'">我的会议</span>
              <span @click="changeType('type3')" v-else>我的预定</span>
            </mt-tab-item>
          </mt-navbar>

          <!--倒班-->
          <mt-tab-container v-model="type" v-if="chooseType=='shift'">
            <mt-tab-container-item id="type1">
              <div class="type-card-cell" v-if="cardList1">
                <div
                  class="type-card-item"
                  v-for="(card,index) in cardList1"
                  :key="index"
                  @click="goToMineDetail('type1',chooseType,card)"
                >
                  <div class="card-left">
                    <p class="card-left-tit">{{card.applyUserName}}的倒班申请</p>
                    <p class="card-left-con">倒班楼地点：{{card.address}}</p>
                    <p class="card-left-con">入住时间：{{card.applyTime}}</p>
                  </div>
                  <icon name="chevron-circle-right" class="card-right"></icon>
                </div>
              </div>
              <div v-else class="empty">
                <div class="imgnone">
                  <div>
                    <img src="../../assets/8b5f1a8fcc864d63d5779bbcb3687e3.png" alt/>
                  </div>
                  <div>暂无数据</div>
                </div>
              </div>
            </mt-tab-container-item>

            <mt-tab-container-item id="type2">
              <div class="type-card-cell">
                <div class="tab-select-cell" style="width: 100%;background-color: #ffffff">
                  <div
                    class="tab-select-item"
                    style="margin-left: 20px;margin-top: 5px;padding-top: 10px;padding-bottom: 10px"
                  >
                    <select
                      v-model="selectStatus"
                      @change="getMyRoomApplyList(2)"
                      style=" appearance: none;-moz-appearance: none;-webkit-appearance: none;"
                    >
                      <option
                        :value="item.value"
                        :key="item.value"
                        v-for="item in selectStatusList"
                      >{{item.lable}}
                      </option>
                    </select>
                    <icon name="angle-down"></icon>
                  </div>
                </div>
                <div v-if="cardList2">
                  <div
                    class="type-card-item"
                    v-for="(card,index) in cardList2"
                    :key="index"
                    @click="goToMineDetail('type2',chooseType,card)"
                  >
                    <div class="card-left" style="width: 100%">
                      <p class="card-left-tit">{{card.applyUserName}}的倒班申请</p>
                      <p style="float:right;color: #EDBD25" v-show="card.applyStatus ==0 ">处理中</p>
                      <p style="float:right;color: #00CD00" v-show="card.applyStatus ==1 ">已通过</p>
                      <p style="float:right;color: #FF6347" v-show="card.applyStatus ==2 ">已拒绝</p>
                      <p style="float:right;color: #BEBEBE" v-show="card.applyStatus ==3 ">已取消</p>

                      <p class="card-left-con">倒班楼地点：{{card.address}}</p>
                      <p class="card-left-con">入住时间：{{card.applyTime}}</p>
                      <p class="card-left-con tip">下一节点处理人</p>
                      <p class="card-left-con">
                        <span
                          v-for="(item,index) in card.approvalList"
                          :key="index"
                        >{{item.approval}}</span>
                        <icon name="tty" class="tty"></icon>
                      </p>
                    </div>
                    <icon name="chevron-circle-right" class="card-right"></icon>
                  </div>
                </div>
                <div v-else class="empty">
                  <div class="imgnone">
                    <div class="img">
                      <img src="../../assets/8b5f1a8fcc864d63d5779bbcb3687e3.png" alt/>
                    </div>
                    <div>暂无数据</div>
                  </div>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="type3">
              <div class="type-card-cell" v-if="cardList3">
                <div
                  class="type-card-item"
                  v-for="(card,index) in cardList3"
                  :key="index"
                  @click="goToMineDetail('type3',chooseType,card)"
                >
                  <div class="card-left">
                    <p class="card-left-tit">{{card.applyUserName}}的入住申请</p>
                    <p class="card-left-con">倒班楼地点：{{card.address}}</p>
                    <p class="card-left-con">
                      入住成员：
                      <span
                        v-for="(item,index) in card.roomMember"
                        :key="index"
                      >{{item.userName&&index!=card.roomMember.length-1?item.userName+',':item.userName}}</span>等
                    </p>
                    <p class="card-left-con">入住时间：{{card.applyTime}}</p>
                  </div>
                  <icon name="chevron-circle-right" class="card-right"></icon>
                </div>
              </div>
              <div v-else class="empty">
                <div class="imgnone">
                  <div>
                    <img src="../../assets/8b5f1a8fcc864d63d5779bbcb3687e3.png" alt/>
                  </div>
                  <div>暂无数据</div>
                </div>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>

          <!--会议-->
          <mt-tab-container v-model="type" v-if="chooseType=='meeting'">
            <mt-tab-container-item id="type1">
              <div class="type-card-cell">
                <div
                  class="type-card-item"
                  v-for="(card,index) in cardList1"
                  :key="index"
                  @click="goToMineDetail('type1',chooseType,card)"
                >
                  <div class="card-left">
                    <p class="card-left-tit">{{card.meetingName}}</p>
                    <p class="card-left-con">会议主题：{{card.subject}}</p>
                    <p class="card-left-con">会议地点：{{card.addressName}}</p>
                    <p class="card-left-con">会议日期：{{card.applyDate}}</p>
                    <p
                      class="card-left-con"
                    >会议时间：{{card.startTime?card.startTime:''}}-{{card.endTime?card.endTime:''}}</p>
                  </div>
                  <icon name="chevron-circle-right" class="card-right"></icon>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="type2">
              <div class="type-card-cell">
                <div class="tab-select-cell" style="width: 100%;background-color: #ffffff">
                  <div
                    class="tab-select-item"
                    style="margin-left: 20px;margin-top: 5px;padding-top: 10px;padding-bottom: 10px"
                  >
                    <select
                      v-model="selectStatus"
                      @change="getMyMeetingList(2)"
                      style=" appearance: none;-moz-appearance: none;-webkit-appearance: none;"
                    >
                      <option
                        :value="item.value"
                        :key="item.value"
                        v-for="item in selectStatusList"
                      >{{item.lable}}
                      </option>
                    </select>
                    <icon name="angle-down"></icon>
                  </div>
                </div>
                <div
                  class="type-card-item"
                  v-for="(card,index) in cardList2"
                  :key="index"
                  @click="goToMineDetail('type2',chooseType,card)"
                >
                  <div class="card-left" style="width: 100%">
                    <div class="card-left-tit">
                      {{card.meetingName}}
                      <p style="float:right;color: #EDBD25" v-show="card.applyStatus ==0 ">处理中</p>
                      <p style="float:right;color: #00CD00" v-show="card.applyStatus ==1 ">已通过</p>
                      <p style="float:right;color: #FF6347" v-show="card.applyStatus ==2 ">已拒绝</p>
                      <p style="float:right;color: #BEBEBE" v-show="card.applyStatus ==3 ">已取消</p>
                    </div>
                    <p class="card-left-con">会议主题：{{card.subject}}</p>
                    <p class="card-left-con">会议地点：{{card.addressName}}</p>
                    <p class="card-left-con">会议日期：{{card.applyDate}}</p>

                    <p
                      class="card-left-con"
                    >会议时间：{{card.startTime?card.startTime:''}}-{{card.endTime?card.endTime:''}}</p>
                    <p class="card-left-con tip">下一节点处理人</p>
                    <p class="card-left-con" v-if="card&&card.approvalList">
                      <span v-for="(item,index) in card.approvalList" :key="index">{{item.approval}}</span>
                      <icon name="tty" class="tty"></icon>
                    </p>
                  </div>
                  <icon name="chevron-circle-right" class="card-right"></icon>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="type3">
              <div class="type-card-cell">
                <div
                  class="type-card-item"
                  v-for="(card,index) in cardList3"
                  :key="index"
                  @click="goToMineDetail('type3',chooseType,card)"
                >
                  <div class="card-left">
                    <p class="card-left-tit">{{card.meetingName}}</p>
                    <p class="card-left-con">会议室：{{card.meetingName}}</p>
                    <p class="card-left-con" v-if="card&&card.meetingMember">
                      会议成员：
                      <span
                        v-for="(item,index) in card.meetingMember"
                        :key="index"
                      >{{item.userName&&index!=card.meetingMember.length-1?item.userName+',':item.userName }}</span>等
                    </p>
                    <p class="card-left-con" v-else>会议成员：</p>
                    <p class="card-left-con">会议日期：{{card.applyDate}}</p>

                    <p
                      class="card-left-con"
                    >会议时间：{{card.startTime?card.startTime:''}}-{{card.endTime?card.endTime:''}}</p>
                  </div>
                  <icon name="chevron-circle-right" class="card-right"></icon>
                </div>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>

          <!--活动中心-->
          <mt-tab-container v-model="type" v-if="chooseType=='active'">
            <mt-tab-container-item id="type1">
              <div class="type-card-cell">
                <div
                  class="type-card-item"
                  v-for="(card,index) in cardList1"
                  :key="index"
                  @click="goToMineDetail('type1',chooseType,card)"
                >
                  <div class="card-left">
                    <p
                      class="card-left-tit"
                    >{{card&&card.applyUserName?card.applyUserName+'的运动中心申请':''}}</p>
                    <p class="card-left-con">{{card&&card.subject?card.subject:''}}</p>
                    <p class="card-left-con">运动中心地点：{{card&&card.address?card.address:''}}</p>
                    <p class="card-left-con">预定时间：{{card&&card.applyTime?card.applyTime:''}}</p>
                  </div>
                  <icon name="chevron-circle-right" class="card-right"></icon>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="type2">
              <div class="type-card-cell">
                <div class="tab-select-cell" style="width: 100%;background-color: #ffffff">
                  <div
                    class="tab-select-item"
                    style="margin-left: 20px;margin-top: 5px;padding-top: 10px;padding-bottom: 10px"
                  >
                    <select
                      v-model="selectStatus"
                      @change="getMyPlaceList(2)"
                      style=" appearance: none;-moz-appearance: none;-webkit-appearance: none;"
                    >
                      <option
                        :value="item.value"
                        :key="item.value"
                        v-for="item in selectStatusList"
                      >{{item.lable}}
                      </option>
                    </select>
                    <icon name="angle-down"></icon>
                  </div>
                </div>
                <div
                  class="type-card-item"
                  v-for="(card,index) in cardList2"
                  :key="index"
                  @click="goToMineDetail('type2',chooseType,card)"
                >
                  <div class="card-left" style="width: 100%">
                    <div class="card-left-tit">
                      {{card&&card.subject?card.subject:''}}
                      <p style="float:right;color: #EDBD25" v-show="card.applyStatus ==0 ">处理中</p>
                      <p style="float:right;color: #00CD00" v-show="card.applyStatus ==1 ">已通过</p>
                      <p style="float:right;color: #FF6347" v-show="card.applyStatus ==2 ">已拒绝</p>
                      <p style="float:right;color: #BEBEBE" v-show="card.applyStatus ==3 ">已取消</p>
                    </div>
                    <p class="card-left-con">运动中心地点：{{card&&card.address?card.address:''}}</p>
                    <p class="card-left-con">预定时间：{{card&&card.applyTime?card.applyTime:''}}</p>
                    <p class="card-left-con tip">下一节点处理人</p>
                    <p class="card-left-con" v-if="card&&card.approvalList">
                      <span v-for="(item,index) in card.approvalList" :key="index">{{item.approval}}</span>
                      <icon name="tty" class="tty"></icon>
                    </p>
                  </div>
                  <icon name="chevron-circle-right" class="card-right"></icon>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="type3">
              <div class="type-card-cell">
                <div
                  class="type-card-item"
                  v-for="(card,index) in cardList3"
                  :key="index"
                  @click="goToMineDetail('type3',chooseType,card)"
                >
                  <div class="card-left">
                    <p class="card-left-tit">{{card&&card.subject?card.subject:''}}</p>
                    <p class="card-left-con">地点：{{card&&card.address?card.address:''}}</p>
                    <p class="card-left-con" v-if="card&&card.placeMember">
                      参加成员：
                      <span
                        v-for="(item,index) in card.placeMember"
                        :key="index"
                      >{{item.userName&&index!=card.placeMember.length-1?item.userName+',':item.userName}}</span>等
                    </p>
                    <p class="card-left-con">预定时间：{{card&&card.applyTime?card.applyTime:''}}</p>
                  </div>
                  <icon name="chevron-circle-right" class="card-right"></icon>
                </div>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!--tabbar-->
    <div class="footer" @click="changeIcon(selected)">
      <mt-tabbar class="tabbar" v-model="selected">
        <mt-tab-item id="tab1">
          <img slot="icon" v-show="tab!==1" src="../../assets/icon_tabbar_home.png"/>
          <img slot="icon" v-show="tab===1" src="../../assets/icon_tabbar_home@3x.png"/>
          <span :style="tab===1?'color:#FF2C2C;':''">首页</span>
        </mt-tab-item>
        <mt-tab-item id="tab2" v-if="chooseType=='meeting'">
          <img slot="icon" v-show="tab!==2" src="../../assets/history-search.png"/>
          <img slot="icon" v-show="tab===2" src="../../assets/history.png"/>
          <span :style="tab===2?'color:#FF2C2C;':''">智能选择</span>
        </mt-tab-item>
        <mt-tab-item id="tab3">
          <img slot="icon" v-show="tab!==3" src="../../assets/icon_tabbar_mine@3x.png"/>
          <img slot="icon" v-show="tab===3" src="../../assets/icon_tabbar_mine.png"/>
          <span :style="tab===3?'color:#FF2C2C;':''">我的</span>
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
  import {getUrlKey} from "../../util/urlParams";
  //引用日期转换
  import format from "../../util/formatDate";
  //引入接口
  import {
    imagePath,
    getRoomListApi,
    getRoomFloorListApi,
    getFreeRoomListApi,
    getMyRoomApplyListApi,
    meetingAddressApi,
    meetingFreeApi,
    getMyMeetingListApi,
    meetingListApi,
    fileDownloadApi,
    getZoneListApi,
    getPlaceBuildListApi,
    getPlaceFloorListApi,
    getFreePlaceListApi,
    getMyPlaceListApi,
    getUserInfoApi
  } from "../../api/restApi.js";
  import {MessageBox} from "mint-ui";

  export default {
    name: "home",
    data() {
      return {
        userInfo: "",
        imagePath: "",
        chooseType: "",
        isFloor: false,
        isFloor1: false,
        tab: 1,
        selected: "tab1",
        weekArr: [],
        floorSelect: "",
        floorList: [],
        floorOption: [],
        placeSelect: "",
        placeList: [
          {placeId: 1, placeName: "羽毛球场"},
          {placeId: 2, placeName: "乒乓球场"},
          {placeId: 3, placeName: "气排球场"}
        ],
        timeSelect: "",
        timeList: [],
        freeTimeList: [],
        userId: "",
        meetingDate: "",
        freeMeetingInfo: {},
        meetingDevices: [],
        buildSelect: "",
        buildList: [],

        meetSelect: "",
        meetTypeList: [
          {value: 1, name: "大型会议室"},
          {value: 2, name: "小型会议"}
        ],
        imgList: [],
        meetList: [],
        meetList1: [],
        type: "type1",
        cardList1: [],
        cardList2: [],
        cardList3: [],
        meetStep: 0,
        meetNum: "",
        meetFloor: "",
        meetTime: "",
        startTime: "",
        startHour: 9,
        endTime: "",
        endHour: 17,
        meetDevice: [],
        zoneList: [],
        zoneOption: [],
        floorIndex: -1,
        zoneIndex: 0,
        floorSelectName: "全部楼号",
        floorSelectName1: "请选择楼号",
        meetSelectName: "全部类型",
        isMeet: false,
        meetIndex: -1,
        isTime: false,
        timeSelectName: "全部时间",
        timeIndex: -1,
        selectStatus: null,
        selectStatusList: [
          {
            value: null,
            lable: "全部状态"
          },
          {
            value: 0,
            lable: "处理中"
          },
          {
            value: 1,
            lable: "同意"
          },
          {
            value: 2,
            lable: "拒绝"
          },
          {
            value: 3,
            lable: "已取消"
          }
        ]
      };
    },
    created() {
      //在这里获取用户id
      // let uuid = getUrlKey("uuid", window.location.href);
      // localStorage.setItem("uuid", uuid);
      this.userId = localStorage.getItem("uuid");
      console.log("用户id", this.userId);

      this.imagePath = imagePath;
      console.log("图片地址", imagePath);
      this.getUserInfo();
      //当前预定类型
      if (this.$route.query.chooseType) {
        this.chooseType = this.$route.query.chooseType;
        console.log("选择的类型", this.chooseType);
      }

      //日期
      var data = new Date();
      this.weekArr = format.format.getDate(data);
      this.meetingDate = this.weekArr[0].data;

      if (this.chooseType == "shift") {
        //倒班楼-楼栋
        this.getRoomList();
        //倒班楼-楼层
        this.getRoomFloorList();
        //倒班楼-空闲
        this.$nextTick(() => {
          this.getFreeRoomList();
        });
        //倒班楼
        this.getMyRoomApplyList(1);
      }

      if (this.chooseType == "meeting") {
        //获取会议时间
        this.getMeetingFree();
        //获取会议室地址
        this.getMeetingAddress();
        //会议类型
        // this.meetSelect = this.meetTypeList[0].value;
        this.getZoneList();
        this.getMyMeetingList(1);
      }

      if (this.chooseType == "active") {
        //活动中心-楼
        this.getPlaceBuildList();
        //活动-空闲
        this.$nextTick(() => {
          this.getFreePlaceList();
        });
        //获取活动中心
        this.getMyPlaceList(1);
      }
    },
    methods: {
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

      //倒班楼-楼栋
      getRoomList() {
        getRoomListApi
          .create({})
          .then(res => {
            console.log("楼栋", res);
            if (res.code == 0) {
              this.buildList = res.data;
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },
      //倒班楼-楼层
      getRoomFloorList(id) {
        getRoomFloorListApi
          .create({
            buildingId: id
          })
          .then(res => {
            console.log("楼层", res);
            if (res.code == 0) {
              this.floorList = res.data;
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },
      //切换--楼
      changeBuild() {
        if (this.chooseType == "shift") {
          if (this.buildSelect == "") {
            this.floorSelect = '';
            this.getFreeRoomList();
          } else {
            this.getRoomFloorList(this.buildSelect);
          }

        }
        if (this.chooseType == "active") {
          console.log("活动选择1", this.buildSelect)
          if (this.buildSelect == "") {
            this.placeSelect = '';
            this.getFreePlaceList();
          } else {
            this.getPlaceFloorList(this.buildSelect);
          }
        }
      },
      //倒班楼-空闲
      getFreeRoomList() {
        getFreeRoomListApi
          .create({
            date: this.meetingDate,
            buildingId: this.buildSelect,
            floorId: this.floorSelect
          })
          .then(res => {
            console.log("空闲倒班楼", res);
            if (res.code == 0) {
              this.imgList = res.data;
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },
      //倒班楼
      getMyRoomApplyList(type) {
        getMyRoomApplyListApi
          .create({
            userId: this.userId,
            type: type,
            applyStatus: this.selectStatus
          })
          .then(res => {
            console.log("空闲倒班楼", res);
            if (res.code == 0) {
              if (type == 1) {
                this.cardList1 = res.data;
              }
              if (type == 2) {
                this.cardList2 = res.data;
              }
              if (type == 3) {
                this.cardList3 = res.data;
              }
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },

      //会议室-楼
      openFloor() {
        console.log("floor");
        this.isFloor = !this.isFloor;
        this.isMeet = false;
        this.isTime = false;
      },
      chooseZone(val) {
        this.zoneIndex = val;
      },
      chooseFloor(val) {
        console.log("会议室楼号", val);
        if (this.isFloor) {
          if (this.floorList[val].addressId == this.floorSelect) {
            this.floorSelectName = "全部楼号";
            this.floorSelect = "";
            this.floorIndex = -1;
            this.getMeetingList();
          } else {
            this.floorIndex = val;
            if (this.floorIndex >= 0) {
              this.floorSelect = this.floorList[this.floorIndex].addressId;
              this.floorSelectName = this.floorList[this.floorIndex].name;
              this.getMeetingList();
            } else {
              this.floorSelectName = "全部楼号";
            }
          }
          this.isFloor = false;
        }

        if (this.isFloor1) {
          if (this.floorList[val].addressId == this.meetFloor) {
            this.floorSelectName1 = "请选择楼号";
            this.meetFloor = "";
            this.floorIndex = -1;
          } else {
            this.floorIndex = val;
            if (this.floorIndex >= 0) {
              this.meetFloor = this.floorList[this.floorIndex].addressId;
              this.floorSelectName1 =
                this.zoneList[this.zoneIndex].dictLabel +
                this.floorList[this.floorIndex].name;
            } else {
              this.floorSelectName1 = "请选择楼号";
            }
          }
          this.isFloor1 = false;
        }
      },
      //类型
      openMeet() {
        this.isMeet = !this.isMeet;
        this.isFloor = false;
        this.isTime = false;
      },
      chooseMeet(val) {
        console.log("会议室类型", val);
        if (this.isMeet) {
          if (this.meetTypeList[val].value == this.meetSelect) {
            this.meetSelectName = "全部类型";
            this.meetSelect = "";
            this.meetIndex = -1;
            this.getMeetingList();
          } else {
            this.meetIndex = val;
            if (this.meetIndex >= 0) {
              this.meetSelect = this.meetTypeList[this.meetIndex].value;
              this.meetSelectName = this.meetTypeList[this.meetIndex].name;
              this.getMeetingList();
            } else {
              this.meetSelectName = "全部类型";
            }
          }
          this.isMeet = false;
        }
      },
      //时间
      openStart() {
        this.$refs.dateStart.open();
        if (!this.startTime) {
          this.startTime = "9:00";
        }
      },
      openEnd() {
        this.$refs.dateEnd.open();
        if (!this.endTime) {
          this.endTime = "9:00";
        }
      },
      openTime() {
        this.isTime = !this.isTime;
        this.isMeet = false;
        this.isFloor = false;
      },
      chooseTime(val) {
        console.log("会议室时间", val);
        if (this.isTime) {
          if (this.timeList[val] == this.timeSelect) {
            this.timeSelectName = "全部类型";
            this.timeSelect = "";
            this.timeIndex = -1;
            this.getMeetingList();
          } else {
            this.timeIndex = val;
            if (this.timeIndex >= 0) {
              this.timeSelect = this.timeList[this.timeIndex];
              this.timeSelectName = this.timeList[this.timeIndex];
              this.getMeetingList();
            } else {
              this.timeSelectName = "全部类型";
            }
          }
          this.isTime = false;
        }
      },
      changeAction(e) {
        console.log("会议时间", e);
      },
      openFloor1() {
        this.isFloor1 = !this.isFloor1;
      },
      //园区
      getZoneList() {
        getZoneListApi
          .create({})
          .then(res => {
            console.log("园区", res.data);
            if (res.code == 0) {
              this.zoneList = res.data;
              if (this.zoneList.length > 0) {
                this.zoneOption = [];
                this.zoneList.forEach(el => {
                  this.zoneOption.push({
                    label: el.dictLabel,
                    value: el.dictValue
                  });
                });
              }
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },
      //会议室-地址
      getMeetingAddress() {
        meetingAddressApi
          .create({})
          .then(res => {
            console.log("会议地址", res);
            if (res.code == 0) {
              this.floorList = res.data;
              if (res.total > 0) {
                //获取空闲会议室
                this.getMeetingList();

                //获取智能排序选项列表
                this.floorOption = [];
                this.floorList.forEach(el => {
                  this.floorOption.push(el.name);
                });
              }
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },
      //会议室-空闲时间段
      getMeetingFree() {
        meetingFreeApi
          .create({})
          .then(res => {
            console.log("会议时间", res);
            if (res.code == 0) {
              // this.timeList = res.data;
              var timeList = res.data;
              let openTime = [];
              openTime.push(timeList[0].startTime + "-" + timeList[0].endTime);
              let y = new Date().getFullYear();
              let m = new Date().getMonth() + 1;
              let d = new Date().getDate();
              let start = [],
                end = []; //start起始时间数组，end结束时间数组
              for (let i = 0, len = openTime.length; i < len; i++) {
                //将时间字符串转换成日期格式并存入开始时间数组和结束时间数组
                let [s, e] = openTime[i].split("-");
                start.push(new Date(y + "/" + m + "/" + d + " " + s));
                end.push(new Date(y + "/" + m + "/" + d + " " + e));
              }
              let list = [];

              function formatTime(time) {
                //时间为个位数则补零
                return time < 10 ? "0" + time : time;
              }

              for (let i = 0, len = start.length; i < len; i++) {
                let len2 =
                  (end[i].getTime() - start[i].getTime()) / (30 * 60 * 1000); //计算各子区间以半小时为间隔拆分后的数组长度
                for (let j = 0; j < len2; j++) {
                  if (start[i].getTime() + 30 * 60 * 1000 <= end[i].getTime()) {
                    //将各子区间日期按半小时递增转换为时间并存入list数组
                    let ss = new Date(start[i].getTime() + 30 * 60 * 1000 * j),
                      ee = new Date(
                        start[i].getTime() + 30 * 60 * 1000 * (j + 1)
                      );
                    list.push([
                      formatTime(ss.getHours()) +
                      ":" +
                      formatTime(ss.getMinutes()),
                      formatTime(ee.getHours()) +
                      ":" +
                      formatTime(ee.getMinutes())
                    ]);
                  }
                }
              }
              list = list.map(item => {
                return item.join("-");
              });
              console.log("时间段", list);
              // this.timeList = []
              // this.timeList.push('全部时间')
              this.timeList = this.timeList.concat(list);
              // if(this.timeList.length>0){
              //   this.timeSelect = this.timeList[0]
              // }
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },
      //选择楼区
      changeFloor(val) {
        console.log(val);
      },
      //获取空闲会议室
      getMeetingList() {
        meetingListApi
          .create({
            date: this.meetingDate,
            addressId: this.floorSelect,
            type: this.meetSelect,
            startTime: this.timeSelect.split("-")[0],
            endTime: this.timeSelect.split("-")[1]
          })
          .then(res => {
            console.log("空闲会议", res.data);
            if (res.code == 0) {
              this.meetList = res.data;
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },
      //我的会议
      getMyMeetingList(type) {
        getMyMeetingListApi
          .create({
            userId: this.userId,
            type: type,
            applyStatus: this.selectStatus
          })
          .then(res => {
            console.log("我的会议", res.data);
            if (res.code == 0 && res.total > 0) {
              if (type == 1) {
                this.cardList1 = res.data;
              }
              if (type == 2) {
                this.cardList2 = res.data;
              }
              if (type == 3) {
                this.cardList3 = res.data;
              }
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },
      //选择日期
      changeWeek(date, data) {
        console.log(date);
        this.meetingDate = data;
        var weekList = this.weekArr;
        if (weekList.length > 0) {
          weekList.forEach(el => {
            if (el.date == date) {
              el.isToday = true;
            } else {
              el.isToday = false;
            }
          });
        }
        this.weekArr = weekList;

        if (this.chooseType == "shift") {
          this.getFreeRoomList();
        }
        if (this.chooseType == "meeting") {
          this.getMeetingList();
        }
        if (this.chooseType == "active") {
          this.getFreePlaceList();
        }
      },

      changeMeetType() {
      },
      changeTime() {
      },
      //智能选择
      // 左滑动
      changeForm(meetStep) {
        // console.log(this.meetStep)
        switch (meetStep) {
          case 3:
            // alert(3);
            meetingListApi
              .create({
                number: this.meetNum,
                date: this.meetingDate,
                startTime: this.startTime,
                endTime: this.endTime,
                addressId: this.meetFloor
              })
              .then(res => {
                console.log("智能会议", res.data);
                if (res.data.length > 0) {
                  this.meetList1 = res.data;
                } else {
                  MessageBox.alert("暂无可用会议室", "提示");
                  this.$router.go(0);
                }
              })
              .catch(err => {
                console.log("报错信息", err);
              });
            break;
          case 2:
            if (!this.meetFloor) {
              this.$toast("请选择会议楼号");
              return;
            } else {
              console.log("赋值");
              this.meetStep += 1;
              this.changeForm(this.meetStep);
            }
            break;
          case 1:
            if (!this.startTime || !this.endTime) {
              this.$toast("请选择会议时间");
              return;
            } else {
              return (this.meetStep = 2);
            }
            break;
          case 0:
            if (!this.meetNum) {
              this.$toast("请输入会议人数");
              return;
              this.meetStep -= 1;
            } else if (this.meetNum >= this.freeMeetingInfo.number) {
              this.$toast("抱歉，当前人数已经超过会议室可容纳人数!");
              return;
            } else {
              return (this.meetStep = 1);
            }
          default:
          // console.log("this is defalt");
          // alert("this is defalt");
        }
      },

      // 左右滑动
      swiperright() {
        //后退
        if (this.meetStep > 0) {
          switch (this.meetStep) {
            case 0:
              break;
            default:
              this.meetStep -= 1;
          }
        }
      },
      swiperleft() {
        //这个是向前进
        this.changeForm(this.meetStep);
      },

      // changeForm1() {
      //   console.log("meet",this.meetNum);

      //   console.log("智能", this.meetStep);

      //   if (!this.meetStep < 0) {
      //     if (this.meetStep == 0) {
      //       if (this.meet != "")
      //         if (!this.meetNum) {
      //           this.$toast("请输入会议人数");
      //           return;
      //         } else if (!(this.meetNum < this.freeMeetingInfo.number)) {
      //           this.$toast("抱歉，当前人数已经超过会议室可容纳人数!");
      //           return;
      //         } else if (this.meetStep > 0) {
      //           return (this.meetStep = 1);
      //         }
      //     }

      //     if (this.meetStep == 1) {
      //       if (!this.startTime || !this.endTime) {
      //         this.$toast("请选择会议时间");
      //         return;
      //       } else {
      //         return (this.meetStep = 2);
      //       }
      //     }

      //     if (this.meetStep == 2) {
      //       if (!this.meetFloor) {
      //         this.$toast("请选择会议楼号");
      //         return;
      //       } else {
      //         return (this.meetStep = 3);
      //       }
      //     }

      //     if (this.meetStep == 3) {
      //       console.log(3);
      //       meetingListApi
      //         .create({
      //           number: this.meetNum,
      //           date: this.meetingDate,
      //           startTime: this.startTime,
      //           endTime: this.endTime,
      //           addressId: this.meetFloor
      //         })
      //         .then(res => {
      //           console.log("智能会议", res.data);
      //           if (res.data.length > 0) {
      //             this.meetList1 = res.data;
      //           } else {
      //             MessageBox.alert("暂无可用会议室", "提示");
      //             this.$router.go(0);
      //           }
      //         })
      //         .catch(err => {
      //           console.log("报错信息", err);
      //         });
      //     }
      //   }
      // },

      handleConfirm(val) {
        console.log("时间", val);
        this.meetTime = this.startTime + "-" + this.endTime;
      },
      handleConfirmStart(val) {
        if (this.startTime) {
          this.startHour = this.startTime.split(":")[0] * 1;
          if (this.endTime) {
            this.meetTime = this.startTime + "-" + this.endTime;
          }
        }
      },
      handleConfirmEnd() {
        if (this.endTime) {
          this.endHour = this.endTime.split(":")[0] * 1;
          if (this.startTime) {
            this.meetTime = this.startTime + "-" + this.endTime;
          }
        }
      },

      /**
       * 活动详情
       */
      //活动中心-楼栋
      getPlaceBuildList() {
        getPlaceBuildListApi
          .create({})
          .then(res => {
            console.log("楼栋", res);
            if (res.code == 0) {
              this.buildList = res.data;
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },
      //活动中心-楼层
      getPlaceFloorList(id) {
        getPlaceFloorListApi
          .create({
            buildingId: id
          })
          .then(res => {
            console.log("楼层", res);
            if (res.code == 0) {
              this.floorList = res.data;
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },
      //活动中心-空闲列表
      getFreePlaceList() {
        getFreePlaceListApi
          .create({
            date: this.meetingDate,
            placeType: this.placeSelect
          })
          .then(res => {
            console.log("活动空闲", res);
            if (res.code == 0) {
              this.imgList = res.data;
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },
      //活动中心-列表
      getMyPlaceList(type) {
        getMyPlaceListApi
          .create({
            userId: this.userId,
            type: type,
            applyStatus: this.selectStatus
          })
          .then(res => {
            console.log("活动中心", res);
            if (res.code == 0) {
              if (type == 1) {
                this.cardList1 = res.data;
              }
              if (type == 2) {
                this.cardList2 = res.data;
              }
              if (type == 3) {
                this.cardList3 = res.data;
              }
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      },

      //tab切换
      changeIcon(tab) {
        console.log("tab", tab);
        if (tab === "tab1") {
          this.tab = 1;
        }
        if (tab === "tab2") {
          this.tab = 2;
        }
        if (tab === "tab3") {
          this.tab = 3;
        }
      },
      // 选择类型
      changeType(type) {
        this.type = type;
        console.log(type);
        if (this.chooseType == "shift") {
          if (type == "type1") {
            this.getMyRoomApplyList(1);
          }
          if (type == "type2") {
            this.getMyRoomApplyList(2);
          }
          if (type == "type3") {
            this.getMyRoomApplyList(3);
          }
        }
        if (this.chooseType == "meeting") {
          if (type == "type1") {
            this.getMyMeetingList(1);
          }
          if (type == "type2") {
            this.getMyMeetingList(2);
          }
          if (type == "type3") {
            this.getMyMeetingList(3);
          }
        }
        if (this.chooseType == "active") {
          if (type == "type1") {
            this.getMyPlaceList(1);
          }
          if (type == "type2") {
            this.getMyPlaceList(2);
          }
          if (type == "type3") {
            this.getMyPlaceList(3);
          }
        }
      },

      //跳转到申请
      goToBuildApply(item, chooseType) {
        console.log("申请所需详情", item, chooseType);
        if (item.status === 1) {
          if (chooseType == "shift") {
            this.$router.push({
              path: "/homePage/buildApply",
              query: {
                shiftInfo: JSON.stringify({
                  ...item,
                  meetingDate: this.meetingDate,
                  profile: this.userInfo
                }),
                chooseType: chooseType
              }
            });
          }
          if (chooseType == "meeting") {
            // this.freeMeetingInfo = item;
            // if(this.freeMeetingInfo.meetingDevices.length>0){
            //   this.freeMeetingInfo.meetingDevices.forEach(el=>{
            //     this.meetingDevices.push({label:el.deviceName,value:el.deviceId})
            //   })
            // }
            // this.meetFloor = this.freeMeetingInfo.addressName;
            // this.selected = 'tab2'
            // this.changeIcon(this.selected)
            console.log("个人信息", this.userInfo);
            this.$router.push({
              path: "/homePage/buildApply",
              query: {
                applyInfo: JSON.stringify({
                  ...item,
                  meetingDate: this.meetingDate,
                  profile: this.userInfo
                }),
                chooseType: this.chooseType
              }
            });
          }

          if (chooseType == "active") {
            this.$router.push({
              path: "/homePage/buildApply",
              query: {
                shiftInfo: JSON.stringify({
                  ...item,
                  meetingDate: this.meetingDate,
                  profile: this.userInfo
                }),
                chooseType: chooseType
              }
            });
          }
        } else {
          this.$toast("已预约");
        }
      },
      //跳转到详情
      goToMineDetail(type, chooseType, card) {
        this.$router.push({
          path: "/myPage/mineDetail",
          query: {
            detailType: type,
            chooseType: chooseType,
            applyItem: JSON.stringify(card)
          }
        });
      },
      fileDownload(filePath) {
        fileDownloadApi
          .createA(
            {
              responseType: "blob"
            },
            filePath
          )
          .then(res => {
            console.log("下载", res.data);
            if (res.code == 0) {
            }
          })
          .catch(err => {
            console.log("报错信息", err);
          });
      }
    }
  };
</script>

<style lang="less">
  .homePage-home {
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

    .home {
      padding: 50px 0 66px 0;

      .mint-tab-container {
        height: 100vh;
      }

      .tab-tit-cell {
        overflow-x: auto;
        background-color: #ff2c2c;
        display: flex;

        .tab-tit-item {
          min-width: 20%;
          box-sizing: border-box;
          padding: 10px;
          margin-bottom: 1px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.75);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .isTit {
          color: rgba(255, 255, 255, 1);
          border-bottom: 2px #fff solid;
        }
      }

      .tab-select-cell {
        background-color: #fff;
        display: flex;
        -moz-box-shadow: 0px 5px 5px #bebebe;
        box-shadow: 0px 5px 5px #bebebe;
        font-size: 14px;
        position: relative;

        .tab-select-item {
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          padding: 10px;
          color: #ff2c2c;
          display: flex;
          align-items: center;
          justify-content: center;

          select {
            height: 100%;
            text-align: center;
            text-align-last: center;
            color: #ff2c2c;
            background: none;
            border: none;
            outline: none;
          }

          .floor-select-name {
            width: 80px;
            margin-right: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .tab-img-cell {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0 0 10px;

        .tab-img-item {
          width: 50%;
          box-sizing: border-box;
          padding: 0 10px 10px 0;

          .tab-img-position {
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;

            img {
              width: 100%;
              min-height: 172px;
              max-height: 172px;
              object-fit: cover;
            }

            .tab-img-tip {
              position: absolute;
              width: 100%;
              box-sizing: border-box;
              bottom: 0;
              padding: 10px;
              display: flex;
              justify-content: space-between;
              color: #fff;
              font-size: 12px;
              background-image: linear-gradient(rgba(105, 105, 105, 0.3),
              rgba(105, 105, 105, 1),
              rgba(105, 105, 105, 0.3));
            }

            .tab-img-active {
              display: flex;
              flex-direction: column;

              .active-tip {
                display: flex;
                justify-content: space-between;
                margin-top: 5px;
              }
            }
          }
        }
      }
    }

    .floor-box {
      width: 100%;
      background-color: #fff;
      position: absolute;
      top: 50px;
      border-top: 1px #eee solid;
      -moz-box-shadow: 0px 5px 5px #bebebe;
      box-shadow: 0px 5px 5px #bebebe;
      overflow: hidden;
      display: flex;

      .floor-left {
        width: 33.3%;
        display: flex;
        flex-direction: column;

        span {
          width: 100%;
          box-sizing: border-box;
          display: inline-block;
          height: 50px;
          line-height: 50px;
          text-align: center;
          padding: 0 10px;
          background-color: #eee;
        }
      }

      .floor-right {
        flex: 1;
        flex-shrink: 0;
        box-sizing: border-box;
        padding: 10px 20px 10px 0;
        display: flex;
        flex-wrap: wrap;

        /*justify-content: space-between;*/

        span {
          /*width: 60px;*/
          text-align: center;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border: 1px #bebebe solid;
          margin: 0 0 10px 20px;
        }

        .active {
          border: 1px #ff2c2c solid;
          color: #ff2c2c;
        }

        .time-line-box {
          width: 100%;
          box-sizing: border-box;
          padding-left: 20px;
          position: relative;
        }

        .time-line-pick {
          height: 10px;
          background-color: #eee;
          position: relative;
        }

        .time-line-pick1 {
          width: 100%;
          height: 10px;
          background-color: #ff2c2c;
          position: absolute;
          top: 0;
          z-index: 10;
        }

        .time-line-num {
          width: 100%;
          box-sizing: border-box;
          padding-left: 20px;
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
        }

        .time1,
        .time2 {
          width: 8px;
          height: 16px;
          background-color: #ff2c2c;
        }

        .time1 {
          position: absolute;
          top: -2px;
          right: 50%;
        }

        .time2 {
          position: absolute;
          top: -2px;
          right: 0;
          right: 50%;
        }
      }
    }

    .mine {
      margin: 50px 0 66px 0;
      background-color: #eee;

      .tab-type-cell {
        display: flex;
        -moz-box-shadow: 0px 5px 5px #e3e3e3;
        box-shadow: 0px 5px 5px #e3e3e3;
        background-color: #fff;
        font-size: 14px;
        color: #999;

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

      .type-card-cell {
        overflow: hidden;

        .type-card-item {
          -moz-box-shadow: 5px 5px 5px #e3e3e3;
          box-shadow: 5px 5px 5px #e3e3e3;
          border-radius: 3px;
          background-color: #fff;
          margin: 10px;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-left {
          padding-right: 10px;

          .card-left-tit {
            font-size: 14px;
            font-weight: 500;
          }

          .card-left-con {
            font-size: 12px;
            margin-top: 15px;
            display: flex;
            align-items: center;
          }

          .tip {
            color: #999;
          }

          .tty {
            width: 12px;
            height: 12px;
            margin-left: 5px;
            color: #00cd00;
          }
        }

        .card-right {
          color: #ff2c2c;
        }
      }
    }

    .footer {
      width: 100%;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      overflow: hidden;
      z-index: 999;

      .mint-tabbar > .mint-tab-item.is-selected {
        background: none;
      }

      .mint-tabbar {
        position: relative;
      }
    }

    .tabbar {
      box-sizing: border-box;
      padding: 10px;
      border-top: 1px solid #eee;
      display: flex;
      justify-content: space-around;

      .mint-tab-item {
        width: 50%;
        text-align: center;
        font-size: 12px;
      }

      img {
        width: 24px;
        height: 24px;
        object-fit: cover;
      }
    }

    .tab-meet-cell {
      .tab-meet-item {
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        margin-top: 10px;
        padding: 10px;
        display: flex;
        align-items: center;
        font-size: 12px;

        img {
          width: 42%;
          height: 100px;
          border-radius: 2px;
          object-fit: cover;
        }

        .tab-meet-content {
          box-sizing: border-box;
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-left: 10px;

          .content-tit {
            font-size: 14px;
            font-weight: 500;
          }

          .content-tip {
            margin-top: 10px;

            span {
              line-height: 16px;
            }

            span:first-child {
              padding-right: 5px;
              margin-right: 5px;
              border-right: 1px solid #bebebe;
            }
          }

          .tabs {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;

            span {
              line-height: 12px;
              padding: 2px 8px;
              margin: 0 5px 5px 0;
              border: 1px #ff2c2c solid;
              border-radius: 10px;
              color: #ff2c2c;
            }
          }
        }
      }
    }

    .tab-meet-form {
      height: calc(~"100vh - 116px");
      background-color: #fff;
      text-align: center;
      position: relative;

      .form {
        padding: 20px;

        h3 {
          font-size: 18px;
          text-align: left;
        }

        input,
        .form-floor-choose {
          width: 100%;
          border-bottom: 1px solid #eee;
          text-align: center;
          margin-top: 50px;
          padding: 20px 0;
        }
      }

      .change-form {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        margin-top: 10px;
        right: 10px;
      }

      .form-floor {
        display: flex;
        padding: 20px 0;
        position: relative;

        .floor-postion {
          position: absolute;
          top: 0px;
          border: none;
        }

        .form-floor-tit {
          flex-shrink: 0;
          padding-left: 10px;
        }

        .mint-radiolist {
          display: flex;
          flex-wrap: wrap;
        }

        .mint-radiolist-title {
          margin: 0;
        }

        .mint-cell-wrapper {
          background-image: none;
        }

        .mint-radiolist .mint-cell {
          border: 1px #eee solid;
          margin: 0 0 10px 10px;
        }
      }

      .form-time {
        margin-top: 50px;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        text-align: left;
      }

      .form-device {
        padding: 30px;

        .device {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .mint-cell-wrapper {
            background-image: none;
          }

          .mint-checklist-title {
            display: none;
          }

          .mint-cell {
            width: 120px;
            height: 40px;
            line-height: 40px;
            margin-bottom: 20px;
            border: 1px solid #eee;
            border-radius: 10px;
          }
        }
      }
    }
  }

  .tab-select-cell {
    background-color: #fff;
    display: flex;
    -moz-box-shadow: 0px 5px 5px #bebebe;
    box-shadow: 0px 5px 5px #bebebe;
    font-size: 14px;
    position: relative;

    .tab-select-item {
      width: 30%;
      height: 50px;
      box-sizing: border-box;
      padding: 10px;
      color: #ff2c2c;
      display: flex;
      align-items: center;
      justify-content: center;

      select {
        height: 100%;
        text-align: center;
        text-align-last: center;
        color: #ff2c2c;
        background: none;
        border: none;
        outline: none;
      }

      .floor-select-name {
        width: 60px;
        margin-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  //底部

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
