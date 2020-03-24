import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/chooseType'
      // redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login'),
    },
    {
      path: '/chooseType',
      name: 'choosetype',
      component: () => import('@/views/chooseType'),
    },
    {
      path: '/homePage/home',
      name: 'home',
      component: () => import('@/views/homePage/home'),
      children: [

      ]
    },
    {
      path: '/homePage/buildApply',
      name: 'buildapply',
      component: () => import('@/views/homePage/buildApply'),
    },
    {
      path: '/myPage/mineDetail',
      name: 'minedetail',
      component: () => import('@/views/myPage/mineDetail'),
      meta: {

      },
      children: [

      ]
    },
    {
      path: '/homePage/peopleList',
      name: 'peoplelist',
      component: () => import('@/views/homePage/peopleList'),
      children: [

      ]
    },
    {
      path: '/homePage/peopleApply',
      name: 'peopleApply',
      component: () => import('@/views/homePage/peopleApply'),
      children: [

      ]
    },
    {
      path: '/homePage/hotel',
      name: 'hotel',
      component: () => import('@/views/homePage/hotel'),
      children: [

      ]
    },
    {
      path: '/homePage/dining',
      name: 'dining',
      component: () => import('@/views/homePage/dining'),
      children: [

      ]
    },
    {
      path: '/bindFood/band',
      name: 'band',
      component: () => import('@/views/bindFood/band'),
      children: [

      ]
    },
    {
      path: '/bindFood/foodIndex',
      name: 'foodIndex',
      component: () => import('@/views/bindFood/foodIndex'),
      // meta:{
      //   keepAlive:false,
      // },
      children: [

      ]
    },
    {
      path: '/bindFood/searchFood',
      name: 'searchFood',
      component: () => import('@/views/bindFood/searchFood'),
      children: [

      ]
    },
    {
      path: '/bindFood/order',
      name: 'order',
      component: () => import('@/views/bindFood/order'),
      children: [

      ]
    },
    {
      path: '/bindFood/orderDetail',
      name: 'orderDetail',
      component: () => import('@/views/bindFood/orderDetail'),
      children: [

      ]
    },
    {
      path: '/bindFood/orderPay',
      name: 'orderPay',
      component: () => import('@/views/bindFood/orderPay'),
      children: [

      ]
    },
    {
      path: '/bindFood/bindCard',
      name: 'bindCard',
      component: () => import('@/views/bindFood/bindCard'),
      children: [

      ]
    },
    {
      path: '/bindFood/disBindCard',
      name: 'disBindCard',
      component: () => import('@/views/bindFood/disBindCard'),
      children: [

      ]
    },
    {
      path: '/bindFood/resetPass',
      name: 'resetPass',
      component: () => import('@/views/bindFood/resetPass'),
      children: [

      ]
    },
    {
      path: '/bindFood/mine',
      name: 'mine',
      component: () => import('@/views/bindFood/mine'),
      children: [

      ]
    },
    // {
    //   path: '/bindFood/test',
    //   name: 'test',
    //   component: () => import('@/views/bindFood/test'),
    //   children: [

    //   ]
    // },
    // {
    //   path: '/bindFood/test1',
    //   name: 'test1',
    //   component: () => import('@/views/bindFood/test1'),
    //   children: [

    //   ]
    // },
    // {
    //   path: '/bindFood/test2',
    //   name: 'test2',
    //   component: () => import('@/views/bindFood/test2'),
    //   children: [

    //   ]
    // },
  ]
})
