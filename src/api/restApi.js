import * as api from './api.js'
import * as APIUPLOAD from './api.js'

/**
 * 图片地址
 */
export let imagePath = 'https://www.ifnxs.com/manager/file/download/'

/**
 * 会议室API
 */

//会议室-图片验证码
export let getImageCodeApi = api.create('/manager/user/getImageCode')

//会议室-登录
export let loginApi = api.create('/manager/user/login')

//会议室-会议地址
export let meetingAddressApi = api.create('/manager/meeting/getMeetingAddressList')

//会议室-空闲时间段
export let meetingFreeApi = api.create('/manager/meeting/getMeetingFree')

//会议室-空闲会议室列表
// export let meetingListApi = api.create('/manager/admin/meeting/getMeetingList');
export let meetingListApi = api.create('/manager/meeting/getFreeMeetingList')

//会议室-申请
export let meetingApplyApi = api.create('/manager/meeting/meetingApply')

//会议室-审核操作
export let meetingApplyStatusApi = api.create('/manager/admin/meeting/setMeetingApprovalStatus')

//会议室-我的会议室列表
export let getMyMeetingListApi = api.create('/manager/meeting/getMyMeetingList')

//会议室-会议详情
export let getMeetingInfoApi = api.create('/manager/meeting/getMeetingInfo')

//会议室-获取园区
export let getZoneListApi = api.create('/manager/meeting/getZoneList')


//会议室-上传文件
export let fileUploadApi = APIUPLOAD.create('/manager/file/upload')

export let fileBadingApi = APIUPLOAD.create('/manager/meeting/addMeetingRecord')


//会议室-下载文件
export let fileDownloadApi = api.create('/manager/file/download')


/**
 * 活动API
 */

//活动中心-楼栋列表
export let getPlaceBuildListApi = api.create('/manager/place/getBuildingList')

//活动中心-楼层列表
export let getPlaceFloorListApi = api.create('/manager/place/getFloorList')

//活动中心-空闲活动中心列表
export let getFreePlaceListApi = api.create('/manager/place/getFreePlaceList')

//活动中心-申请
export let placeApplyApi = api.create('/manager/place/placeApply')

//活动中心-场地有效时间
export let placeTimeApi = api.create('/manager/place/getPlaceTime')

//活动中心-同意申请操作
export let placeApplyActionApi = api.create('/manager/place/placeApplyAction')

//活动中心-列表
export let getMyPlaceListApi = api.create('/manager/place/getMyPlaceList')

/**
 * 倒班楼
 */

//倒班楼-楼栋
export let getRoomListApi = api.create('/manager/room/getBuildingList')

//倒班楼-楼层
export let getRoomFloorListApi = api.create('/manager/room/getFloorList')

//倒班楼-空闲房间
export let getFreeRoomListApi = api.create('/manager/room/getFreeRoomList')

//倒班楼-申请
export let roomApplyApi = api.create('/manager/room/roomApply')

//倒班楼-审核
export let roomApplyActionApi = api.create('/manager/room/roomApplyAction')

//倒班楼-申请列表
export let getMyRoomApplyListApi = api.create('/manager/room/getMyRoomApplyList')

/**
 * 食堂
 */

//食堂列表
export let getDiningListApi = api.create('/manager/mess/getMenuDailyList')

//人流统计
export let getCurrentTrafficApi = api.create('/manager/mess/getCurrentTraffic')

//点赞
export let addLikeApi = api.create('/manager/mess/addLike')


//获取个人信息
export let getUserInfoApi = api.create('/manager/user/getUserInfo')


//部门
export let getCompanyListApi = api.create('/manager/user/getSubCompanyList')

export let getDepartmentListApi = api.create('/manager/user/getDepartmentList')

//部门人员-列表
export let getDepartmentUserListApi = api.create('/manager/user/getUserInfoByDepId')

// 查询人员
export let getSearchUserIdApi = api.create('/user/getUserInfo')

// 订餐系统:

// 获取餐厅列表
export let getDealerList = api.create('/manager/restaurant/dealer/list')

// 查询菜品
export let getProductList = api.create('/manager/restaurant/product/list')

// 添加商品到购物车
export let getShopCartAdd = api.create('/manager/restaurant/shopCart/add')

// 修改购物车商品数量
export let getShopCartEdit = api.create('/manager/restaurant/shopCart/edit')

// 删除购物车某个商品
export let getShopCartRemove = api.create('/manager/restaurant/shopCart/remove')

//  我的购物车列表
export let getShopCartList = api.create('/manager/restaurant/shopCart/list')

// 获取用户信息
export let getCompanyUserInfo = api.create('/manager/restaurant/companyUser/getUserInfo')

// 绑定一卡通
export let getCompanyUserBind = api.create('/manager/restaurant/companyUser/bind')

// 下订单
export let getCreateOrder = api.create('/manager/restaurant/order/createOrder')

// 我的订单
export let getMyOrder = api.create('/manager/restaurant/order/getMyOrder')

// 取消订单
export let getEditOrder = api.create('/manager/restaurant/order/edit')

// 支付
export let getDoPay = api.create('/manager/restaurant/order/doPay')

//发送短信验证码
export let getPhone = api.create('/manager/restaurant/companyUser/sendSmsCode')

//解除一卡通绑定
export let getDisBindCard = api.create('/manager/restaurant/companyUser/unbind')

//重置密码
export let getResetPass = api.create('/manager/restaurant/companyUser/resetPwd')

// 一卡通余额查询
export let getCardMoney = api.create('/manager/restaurant/companyUser/getAccDBMoney')

// 搜索菜品按钮
export let getSearchFood = api.create('/manager/restaurant/product/list')











