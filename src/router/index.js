import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import register from '@/components/login/register'
import home from '@/components/home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/home',
      name: '首页',
      mate: {
        requireAuth: true
      },
      component: home,
      children: [
        {
          path: '/homePage',
          name: '首页',
          component: resolve => require(['@/components/main/home/homePage'], resolve)
        },
        {
          path: '/homePageHospital',
          name: '首页',
          component: resolve => require(['@/components/main/home/homePageHospital'], resolve)
        },
        //管理
        {
          path: '/manage',
          name: '设备管理',
          component: resolve => require(['@/components/main/equipment/manage'], resolve)
        },
        {
          path: '/manage/manageDetail',
          name:'设备管理详情',
          component: resolve => require(['@/components/main/equipment/manageDetail'],resolve)
        },
        {
          path: '/distribute',
          name: '分配记录',
          component: resolve => require(['@/components/main/equipment/distributeRecode'],resolve)
        },
        //统计
        {
          path: '/device',
          name: '设备概括',
          component: resolve => require(['@/components/main/statistics/deviceStatus'],resolve)
        },
        {
          path: '/device/detail',
          name: '设备概括详情',
          component: resolve => require(['@/components/main/statistics/deviceDetail'],resolve)
        },
        {
          path: '/surgeData',
          name: '血糖数据',
          component: resolve => require(['@/components/main/statistics/surgeData'],resolve)
        },
        {
          path: '/surgeData/detail',
          name: '血糖数据详情',
          component: resolve => require(['@/components/main/statistics/surgeDetail'],resolve)
        },
      //  机构设置
        {
          path: '/orgSetting',
          name: '机构设置',
          component: resolve => require(['@/components/main/setting/orgSetting'],resolve)
        },
        {
          path: '/orgSetting/addOrg',
          name: '新增机构',
          component: resolve => require(['@/components/main/setting/addOrg'],resolve)
        },
      //  开发
        {
          path: '/basic',
          name: '基本配置',
          component: resolve => require(['@/components/main/develop/basic'],resolve)
        },
        {
          path: '/tools',
          name: '开发者工具',
          component: resolve => require(['@/components/main/develop/developTools'],resolve)
        },
        // 医院统计
        {
          path: '/hospitalStatistics',
          name: 'hospitalStatistics',
          component: resolve => require(['@/components/main/statistics/hospitalStatistics'],resolve)
        },
        // 医院详情
        {
          path: '/hospitalDetail',
          name: 'hospitalDetail',
          component: resolve => require(['@/components/main/statistics/hospitalDetail'],resolve)
        },
        // 发货订单
        {
          path: '/pendingDeliveryOrder',
          name: 'pendingDeliveryOrder',
          component: resolve => require(['@/components/main/orderManage/pendingDeliveryOrder'],resolve)
        },
        // 签收列表
        {
          path: '/signList',
          name: 'signList',
          component: resolve => require(['@/components/main/orderManage/signList'],resolve)
        },
        // 订单列表
        {
          path: '/orderList',
          name: 'orderList',
          component: resolve => require(['@/components/main/orderManage/orderList'],resolve)
        },
        // 角色管理
        {
          path: '/roleManage',
          name: 'roleManage',
          component: resolve => require(['@/components/main/setting/roleManage'],resolve)
        },
        // 用户管理
        {
          path: '/userManage',
          name: 'userManage',
          component: resolve => require(['@/components/main/setting/userManage'],resolve)
        },
        // 机构管理
        {
          path: '/resourceManage',
          name: 'resourceManage',
          component: resolve => require(['@/components/main/setting/resourceManage'], resolve)
        },
        // 企业详情
        {
          path: '/companyDetail',
          name: 'companyDetail',
          component: resolve => require(['@/components/main/setting/companyDetail'], resolve)
        },
        // 菜品分类
        {
          path: '/foodCategoryManage',
          name: 'foodCategoryManage',
          component: resolve => require(['@/components/main/food/foodCategoryManage'], resolve)
        },
        // 单菜管理
        {
          path: '/singleFoodManage',
          name: 'singleFoodManage',
          component: resolve => require(['@/components/main/food/singleFoodManage'], resolve)
        },
        // 星厨菜管理
        {
          path: '/starFoodManage',
          name: 'starFoodManage',
          component: resolve => require(['@/components/main/food/starFoodManage'], resolve)
        },
        // banner管理
        {
          path: '/bannerManage',
          name: 'bannerManage',
          component: resolve => require(['@/components/main/banner/bannerManage'], resolve)
        },
        // 星厨管理
        {
          path: '/starChef',
          name: 'starChef',
          component: resolve => require(['@/components/main/starChef/starChefManage'], resolve)
        },
        // 成就管理
        {
          path: '/achievement',
          name: 'starChef',
          component: resolve => require(['@/components/main/achievement/achievementManage'], resolve)
        },
        {
          path: '/orderManage',
          name: 'orderManage',
          component: resolve => require(['@/components/main/order/orderManage'], resolve)
        },
        {
          path: '/userManage',
          name: 'userManage',
          component: resolve => require(['@/components/main/user/userManage'], resolve)
        },
        {
          path: '/machineTemplateManage',
          name: 'machineTemplateManage',
          component: resolve => require(['@/components/main/machine/machineTemplateManage'], resolve)
        },
        {
          path: '/machineManage',
          name: 'machineManage',
          component: resolve => require(['@/components/main/machine/machineManage'], resolve)
        },
      ]
    }
  ]
})

export default router
