<template>
  <div class="people-list">
    <mt-header v-if="chooseType==='shift'" class="title" title="倒班楼预定"></mt-header>
    <mt-header v-if="chooseType==='meeting'" class="title" title="会议室预定"></mt-header>
    <mt-header v-if="chooseType==='active'" class="title" title="活动中心预定"></mt-header>

    <div class="people" v-if="isDepartment">
      <!-- input搜索 -->
      <div class="header-box" v-show="show">
        <div class="search-box">
          <div class="search">
            <input @blur="getSearchUserId" v-model="pid" type="text" placeholder="请输入id号" />
          </div>
          <div class="switching" @click="show=!show">
            <span>切换</span>
          </div>
        </div>
        <!-- 搜出展示 -->
        <div class="header-con" v-show="searchUserList!=''">
          <div class="checklist-flex">
            <div class="author-cell">
              <span class="author">{{searchUserList.userName}}</span>
            </div>
            <div class="username">
              <div>
                <span>{{searchUserList.userName}}</span>
              </div>
              <button @click="add()">添加</button>
            </div>
          </div>
        </div>
        <div class="userlist" v-show="departmentUserIdsInner!=''">
          <div class="userList-title">
            <span>已添加人员:</span>
          </div>
          <div class="add-box">
            <div
              class="checklist-flex"
              style="background:#fff;"
              v-for="(item,index) in departmentUserIdsInner"
              :key="index"
            >
              <div class="author-cell">
                <span class="author">{{item.userName}}</span>
              </div>
              <div class="username">
                <div>
                  <span>{{item.userName}}</span>
                </div>
                <button @click="del(item.userId)">删除</button>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="btn1">
            <span @click="addUser">确认添加</span>
          </div>
        </div>
      </div>

      <!-- 具体搜索 -->
      <div v-show="!show">
        <div class="people-tit">
          选择部门
          <div class="switching1" @click.stop="show=!show">
            <span>切换</span>
          </div>
        </div>

        <mt-navbar
          class="tab-type-cell"
          v-model="departmentype"
          @click.native="changeType(departmentype)"
        >
          <mt-tab-item :class="departmentype==='1'?'tab-type-item isType':'tab-type-item'" id="1">
            <span>本部门</span>
          </mt-tab-item>
          <mt-tab-item :class="departmentype==='2'?'tab-type-item isType':'tab-type-item'" id="2">
            <span>组织</span>
          </mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="departmentype">
          <mt-tab-container-item id="1">
            <div class="checklist-flex">
              <div class="author-cell">
                <span
                  v-for="(item,index) in departmentUserList"
                  :key="index"
                  class="author"
                >{{item.userName}}</span>
              </div>
              <mt-checklist
                title
                v-model="departmentUser"
                align="right"
                :options="departmentUserOption"
                @change.native="getDepartmentUser"
              ></mt-checklist>
            </div>
            <div class="people-btn">
              <div class="people-btn-box">
              <mt-button class="btn" type="danger" @click="suerDepartmentUser">确定</mt-button>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div class="people" style="padding-top: 0px;">
              <!--<div class="people-tit">选择人员</div>-->
              <!--<mt-radio-->
              <!--title=""-->
              <!--v-model="department"-->
              <!--align="right"-->
              <!--:options="departmentOption"-->
              <!--@change.native="getDepartment"-->
              <!--&gt;-->
              <!--</mt-radio>-->

              <div class="choose-department-cell">
                <div
                  v-for="(company,index) in companyList"
                  :key="index"
                  class="choose-department-item"
                >
                  <div class="choose-department-item-tit" @click="getCompany(company.subCompanyId)">
                    <span>+</span>
                    <span>{{company.subCompanyName}}</span>
                  </div>
                    <div v-if="isCompany==company.subCompanyId" class="show">

                  <div
                    v-for="(item,index) in departmentList"
                    :key="index"
                    class="choose-department-item"
                  >
                    <!-- <div v-if="isCompany==company.subCompanyId" class="show"> -->
                      <div
                        class="choose-department-item-tit"
                        @click="getDepartment(item.departmentId)"
                      >
                        <span>+</span>
                        <span>{{item.departmentName}}</span>
                      </div>

                      <div class="checklist-flex" v-if="isDepart==item.departmentId">
                        <div class="author-cell">
                          <span
                            v-for="(item,index) in departmentUserList"
                            :key="index"
                            class="author"
                          >{{item.userName}}</span>
                        </div>
                        <mt-checklist
                          title
                          v-model="departmentUser"
                          align="right"
                          :options="departmentUserOption"
                          @change.native="getDepartmentUser"
                        ></mt-checklist>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="people-btn">
                <div class="people-btn-box">
                <mt-button class="btn" type="danger" @click="suerDepartmentUser">确定</mt-button>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
//引入接口
import { Indicator } from "mint-ui";
import {
  getDepartmentListApi,
  getDepartmentUserListApi, //部门的人
  getUserInfoApi, //个人信息
  getCompanyListApi, //部门
  getSearchUserIdApi //搜索
} from "../../api/restApi.js";

export default {
  name: "peopleList",
  data() {
    return {
      value1: "",
      show: true,
      isCompany: "",
      userId: "",
      chooseType: "",
      isDepartment: true,
      department: "",
      companyList: [],
      departmentList: [],
      departmentOption: [],
      departmentUser: [],
      departmentUserList: [],
      departmentUserOption: [],
      departmentUserIdsSide: [], //集团外
      departmentUserIdsInner: [], //集团内
      shiftInfo: {},
      applyInfo: {},
      departmentype: "1",
      userInfo: {},
      isDepart: "",
      searchUserList: [],
      searchUser: "",
      searchUserOptions: [],
      searchUserItem: {},
      pid: ""
    };
  },
  created() {
    this.userId = localStorage.getItem("uuid");
    //当前申请类型
    if (this.$route.query.chooseType) {
      this.chooseType = this.$route.query.chooseType;
      console.log(this.chooseType);
    }
    if (this.$route.query.shiftInfo) {
      this.shiftInfo = JSON.parse(this.$route.query.shiftInfo);
      console.log("倒班楼详情", this.shiftInfo);
    }
    if (this.$route.query.applyInfo) {
      this.applyInfo = JSON.parse(this.$route.query.applyInfo);
      console.log("会议详情", this.applyInfo);
    }

    if (this.$route.query.departmentUserIdsSide) {
      this.departmentUserIdsSide = [];
      this.departmentUserIdsSide = JSON.parse(
        this.$route.query.departmentUserIdsSide
      );
    }

    if (this.$route.query.departmentUserIdsInner) {
      this.departmentUser = [];
      this.departmentUserIdsInner = [];
      var departmentUserIdsInner = JSON.parse(
        this.$route.query.departmentUserIdsInner
      );
      if (departmentUserIdsInner && departmentUserIdsInner.length > 0) {
        departmentUserIdsInner.forEach(el => {
          this.departmentUser.push(el.userId);
          this.departmentUserIdsInner.push({ ...el });
        });
      }
      console.log("选择人员", departmentUserIdsInner);
      // return departmentUserIdsInner;
    }
    this.getCompanyList();
    this.getUserInfo();
    Indicator.close();
  },
  methods: {
    // 搜索
    getSearchUserId() {
      if (this.pid != "") {
        console.log("pid", this.pid);
        this.searchUser = "";
        Indicator.open("加载中...");
        getUserInfoApi
          .create({
            userId: this.pid
          })
          .then(res => {
            Indicator.close();
            console.log("搜索", res);
            if (res.code == 0) {
              if (res.data) {
                console.log("user", res.data);
                this.searchUserList = res.data;
                this.searchUser = res.data.userName;
                this.searchUserItem = {
                  userId: res.data.userId,
                  isGroupUser: 1,
                  userName: res.data.userName
                };

                console.log("arr", this.departmentUserIdsInner);
              }
            }
            this.pid = "";
            return this.searchUserItem;
          })
          .catch(err => {
            Indicator.close();
            console.log("报错信息搜索", err);
            this.$toast("人员不存在,请重搜");
            this.pid = "";
          });
      }
    },

    // 添加
    add() {
      let departmentUserIdsInner = this.departmentUserIdsInner;
      let searchUserItem = this.searchUserItem;
      if (JSON.stringify(departmentUserIdsInner).indexOf(JSON.stringify(searchUserItem)) == -1) {
        departmentUserIdsInner.push(searchUserItem); // 进行动态的操作
      }else{
        this.$toast("已添加");
      }

      return departmentUserIdsInner;
    },
    // 删除
    del(id) {
      this.departmentUserIdsInner.forEach((el, index) => {
        if (el.userId == id) {
          this.departmentUserIdsInner.splice(index, 1);
        }
      });
    },

    // 确认添加
    addUser() {
      console.log("确认");
      console.log(this.searchUser);
      if (this.departmentUserIdsInner.length > 0) {
        if (this.chooseType == "shift" || this.chooseType == "active") {
          this.$router.push({
            path: "/homePage/buildApply",
            query: {
              chooseType: this.chooseType,
              departmentUserIdsInner: JSON.stringify(
                this.departmentUserIdsInner
              ),
              departmentUserIdsSide: JSON.stringify(this.departmentUserIdsSide),
              shiftInfo: JSON.stringify(this.shiftInfo)
            }
          });
          // this.searchUserOptions = [];
        }
      }
    },
    //获取个人信息
    getUserInfo() {
      getUserInfoApi
        .create({
          userId: this.userId
        })
        .then(res => {
          console.log("个人信息", res);
          if (res.code == 0) {
            this.userInfo = res.data;
            if (this.userInfo.departmentId) {
              this.getDepartmentUserList(this.userInfo.departmentId);
            }
          }
        })
        .catch(err => {
          console.log("报错信息4", err);
        });
    },
    changeType(type) {
      if (type == "1") {
        this.getDepartmentUserList(this.userInfo.departmentId);
      } else {
        this.getCompanyList();
      }
    },
    getCompanyList() {
      getCompanyListApi
        .create({})
        .then(res => {
          console.log("公司", res);
          if (res.code == 0) {
            this.companyList = res.data;

            console.log("companyList", this.companyList);
            // this.companyOption = []
            // if (res.data.length > 0) {
            //     res.data.forEach(el => {
            //         this.companyOption.push({
            //             label: el.subCompanyName,
            //             value: el.subCompanyId
            //         })
            //     })
            // }
          }
        })
        .catch(err => {
          console.log("报错信息1", err);
        });
    },
    getDepartmentList(conpanyId) {
      getDepartmentListApi
        .create({
          subCompanyId: conpanyId
        })
        .then(res => {
          console.log("部门", res);
          if (res.code == 0) {
            this.departmentList = res.data;
            this.departmentOption = [];
            if (res.data.length > 0) {
              res.data.forEach(el => {
                this.departmentOption.push({
                  label: el.departmentName,
                  value: el.departmentId
                });
              });
            }
          }
        })
        .catch(err => {
          console.log("报错信息2", err);
        });
    },
    getDepartmentUserList(id) {
      getDepartmentUserListApi
        .create({
          departmentId: id
        })
        .then(res => {
          console.log("人员", res);
          if (res.code == 0) {
            this.departmentUserList = res.data;
            this.departmentUserOption = [];
            if (res.data.length > 0) {
              res.data.forEach(el => {
                console.log("el", el);
                this.departmentUserOption.push({
                  label: el.userName,
                  value: el.userId
                });
              });
            }
          }
        })
        .catch(err => {
          console.log("报错信息3", err);
        });
    },
    //选择部分
    getCompany(conpanyId) {
      if (conpanyId) {
        if (this.isCompany == conpanyId) {
          this.isCompany = "";
        } else {
          this.isCompany = conpanyId;
          this.getDepartmentList(conpanyId);
        }
      }
    },
    getDepartment(departmentId) {
      // var id = val.target.value
      if (departmentId) {
        if (this.isDepart == departmentId) {
          this.isDepart = "";
        } else {
          this.departmentUserList = [];
          this.isDepart = departmentId;
          this.getDepartmentUserList(departmentId);
        }
      }
    },
    //选择人员
    getDepartmentUser(val) {
      var that = this;
      var id = val.target.value;
      console.log("当前选中人员", this.departmentUser);
      that.departmentUserIdsInner = [];
      if (this.departmentUser.length > 0) {
        this.departmentUser.forEach(ee => {
          this.departmentUserList.forEach(el => {
            if (ee == el.userId) {
              that.departmentUserIdsInner.push({
                userId: el.userId,
                isGroupUser: 1,
                userName: el.userName
                // company: el.company,
                // post: el.post,
                // phone: el.phone
              });
            }
          });
        });
      }

      console.log("已经选中", this.departmentUserIdsInner);
    },

    suerDepartmentUser() {
      if (
        !this.departmentUserIdsInner ||
        this.departmentUserIdsInner.length == 0
      ) {
        this.$toast("请先选择人员");
        return;
      }
      if (this.departmentUser.length > 0) {
        if (this.chooseType == "shift" || this.chooseType == "active") {
          this.$router.push({
            path: "/homePage/buildApply",
            query: {
              chooseType: this.chooseType,
              departmentUserIdsInner: JSON.stringify(
                this.departmentUserIdsInner
              ),
              departmentUserIdsSide: JSON.stringify(this.departmentUserIdsSide),
              shiftInfo: JSON.stringify(this.shiftInfo)
            }
          });
        }
        if (this.chooseType == "meeting") {
          this.$router.push({
            path: "/homePage/buildApply",
            query: {
              chooseType: this.chooseType,
              departmentUserIdsInner: JSON.stringify(
                this.departmentUserIdsInner
              ),
              departmentUserIdsSide: JSON.stringify(this.departmentUserIdsSide),
              applyInfo: JSON.stringify(this.applyInfo)
            }
          });
        }
      }
    }
  }
};
</script>

<style lang="less">
.search-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  background: #fff;


}
.search {
  width: 80%;
  background: #fff;
  padding: .3rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  // border: 1px solid red;
}
.search input {
  padding:.3rem 0 .3rem 1rem;
  
}
.switching {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  background: #fff;
}
.header-con {
  background: #fff;
}
.header-title {
  border: 1px solid #222;
  display: flex;
  background: #fff;
  padding-left: 1vw;
}
.header-title span {
  display: block;
  text-align: center;
}
.header-item {
  display: flex;
  padding-left: 1vw;
  background: #fff;
}
.header-item span {
  display: block;
  text-align: center;
}

.people-list {
  min-height: 100vh;
  overflow: hidden;
  background-color: #eee;

  .choose-department-cell {
    background-color: #fff;
    overflow: hidden;

    .choose-department-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
  }
  .checklist-flex {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .author-cell {
      width: 52px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
    }

    .author {
      display: inline-block;
      width: 42px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      border-radius: 50%;
      background-color: #ff2c2c;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 10px;
      font-size: 12px;
    }

    .mint-checklist-title {
      margin: 0;
    }

    .mint-checklist {
      width: 100%;
      flex: 1;
      flex-shrink: 0;
    }

    .mint-cell {
      min-height: 62px;
    }
  }
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

  .people {
    padding: 50px 0 66px 0;

    .mint-radiolist-title {
      display: none;
    }

    /*.mint-checkbox{*/
    /*float: right;*/
    /*}*/
    .mint-checkbox-input:checked + .mint-checkbox-core {
      background-color: #ff2c2c;
      border: 1px solid #ff2c2c;
    }
    .username {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      padding: 10px 0;
      background: #fff;
    }
    .username > div {
      font-size: 0.8em;
      color: #2c3e50;
      padding-left: 1em;
    }
    .username > button {
      margin-right: 0.5em;
      font-size: 0.7em;
      padding: 0.2em 0.5em;
      border-radius: 1em;
      color: #fff;
      background: #ff5309;
    }
    .footer {
      position: fixed;
      z-index: 999;
      bottom: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
    }
    .btn1 {
      // border: 1px solid red;
      height: 6vh;
      width: 60%;
      text-align: center;
      line-height: 6vh;
      background: #ff5309;
      color: #fff;
      border-radius: 40px;
    }
    .userList-title {
      padding:.5rem 1rem;
      background: #f8f8f8;
    }
    .add-box {
      // border: 1px solid red;
      height: 50vh;
      padding:0 0 1rem 0;
      overflow-y: scroll;
    }
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
  }
    .people-btn-box{
      width: 100vw;
      display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0;  
    background: #fff;  
    }

  

  
}
.switching1 {
    position: absolute;
    top: 0;
    right: 0;
    border: 1px solid #ddd;
    width: 3em;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #aaa;
    background: #fff;
    z-index: 99;
  }
.people-btn {
    position: fixed;
    bottom:0;
    width: 100vw;
  
    .btn {
      margin: 0 auto;
      padding: 0 80px;
    }
  }
  .people-tit {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    padding: 0 10px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    position: relative;
    // border: 1px solid red;
  }
</style>
