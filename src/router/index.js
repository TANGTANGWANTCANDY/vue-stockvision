import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  //新用户注册
  {
    path:'/register',
    name:'Register',
    component: ()=>import('@/views/login/Register'),
    hidden:true
  },
  {
    path:'/register-success',
    name:'register-success',
    component:()=>import('@/views/login/RegisterSuccess'),
    hidden:true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/UserCenter'),
      meta: { requireAuth: true, title: '首页', icon: 'guide' }
    }]
  },
  {
    path: '/market',
    component: Layout,
    children: [
      {
        path: 'market',
        name: 'Market',
        component: () => import('@/views/charts/keyboard'),
        meta: { requireAuth: true, title: '大盘监控', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/ind',
    component: Layout,
    children: [
      {
        path: 'contribution',
        name: 'indContribution',
        component: () => import('@/views/ind-contribution/ContributionTable'),
        meta: { requireAuth: true, title: '个股贡献度', icon: 'example' }
      }
    ]
  },
  {
    path: '/industry',
    component: Layout,
    children: [
      {
        path: 'industry',
        name: 'industry',
        component: () => import('@/views/industry/index'),
        meta: { requireAuth: true, title: '行业监控', icon: 'component' }
      }
    ]
  },
  {
    path: '/factorAnalysis',
    component: Layout,
    children: [
      {
        path: 'factorAnalysis',
        name: 'FactorAnalysis',
        component: () => import('@/views/factor-analysis/index'),
        meta: { requireAuth: true, title: '因子分析', icon: 'component' }
      }
    ]
  },
  /*
  {
    path: '/factorAnalysis',
    component: Layout,
    redirect: '/factorAnalysis/index',
    name: 'FactorAnalysis',
    meta: { requireAuth: true, title: '因子分析', icon: 'component' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/factor-analysis/index'),
        meta: { requireAuth: true, title: '首页', icon: 'table' }
      },
      {
        path: 'ic',
        name: 'IC',
        component: () => import('@/views/factor-analysis/ic'),
        meta: { requireAuth: true, title: 'IC序列分析', icon: 'table' }
      },
      {
        path: 'icdecay',
        name: 'ICDECAY',
        component: () => import('@/views/factor-analysis/icdecay'),
        meta: { requireAuth: true, title: 'IC衰减', icon: 'table' }
      },
      {
        path: 'ret',
        name: 'Ret',
        component: () => import('@/views/factor-analysis/ret'),
        meta: { requireAuth: true, title: '收益率分析', icon: 'table' }
      },
      {
        path: 'turnover',
        name: 'Turnover',
        component: () => import('@/views/factor-analysis/turnover'),
        meta: { requireAuth: true, title: '换手率分析', icon: 'table' }
      },
      {
        path: 'buydecay',
        name: 'Buydecay',
        component: () => import('@/views/factor-analysis/buydecay'),
        meta: { requireAuth: true, title: '买入信号衰减与反转', icon: 'table' }
      },
      {
        path: 'industryana',
        name: 'Industryana',
        component: () => import('@/views/factor-analysis/industry'),
        meta: { requireAuth: true, title: '版块分析', icon: 'table' }
      }
    ]
  },
  */
  {
    path: '/factorValidation',
    component: Layout,
    redirect: '/factor/index',
    name: 'Factor',
    meta: { requireAuth: true, title: '因子有效性验证', icon: 'dashboard' },
    children: [
      {
        path: 'singleFactorValidation',
        name: 'singleFactorValidation',
        component: () => import('@/views/charts/singleFactorValidation'),
        meta: { requireAuth: true, title: '单因子有效性验证', icon: 'table' }
      },
      {
        path: 'multiFactorValidation',
        name: 'multiFactorValidation',
        component: () => import('@/views/charts/multiFactorValidation'),
        meta: { requireAuth: true, title: '多因子有效性验证', icon: 'table' }
      }
    ]
  },
  {
    path: '/customFactor',
    component: Layout,
    children: [
      {
        path: 'customFactor',
        name: 'customFactor',
        component: () => import('@/views/custom-factor/FactorSelect'),
        meta: { requireAuth: true, title: '自定义因子组合', icon: 'search' }
      }
    ]
  },
  {
    path: '/tradingBoard',
    component: Layout,
    children: [
      {
        path: 'tradingBoard',
        name: 'tradingBoard',
        component: () => import('@/views/trading-board/index'),
        meta: { requireAuth: true, title: '涨停连板情况', icon: 'nested' }
      }
    ]
  },
  {
    path: '/volatility',
    component: Layout,
    children: [
      {
        path: 'volatility',
        name: 'volatility',
        component: () => import('@/views/volatility/index'),
        meta: { requireAuth: true, title: '波动率', icon: 'chart' }
      }
    ]
  },
  {
    path: '/abnormalPlate',
    component: Layout,
    children: [
      {
        path: 'abnormalPlate',
        name: 'abnormalPlate',
        component: () => import('@/views/abnormal-plate/index'),
        meta: { requireAuth: true, title: '异动板块', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/customIndex',
    component: Layout,
    children: [
      {
        path: 'customIndex',
        name: 'customIndex',
        component: () => import('@/views/custom-index/index'),
        meta: { requireAuth: true, title: '自定义指数', icon: 'edit' }
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    children: [
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/notice/index'),
        meta: { requireAuth: true, title: '公告内容监测', icon: 'message' }
      }
    ]
  },
  {
    path: '/fund',
    component: Layout,
    children: [
      {
        path: 'fund',
        name: 'fund',
        component: () => import('@/views/fund/index'),
        meta: { requireAuth: true, title: '资金监控', icon: 'money' }
      }
    ]
  },
  {
    path: '/autoTrading',
    component: Layout,
    children: [
      {
        path: 'autoTrading',
        name: 'autoTrading',
        component: () => import('@/views/auto-trading/index'),
        meta: { requireAuth: true, title: '自动交易', icon: 'shopping' }
      }
    ]
  },
  {
    path: '/profitLoss',
    component: Layout,
    children: [
      {
        path: 'profitLoss',
        name: 'profitLoss',
        component: () => import('@/views/profit-loss/index'),
        meta: { requireAuth: true, title: '盈亏统计', icon: 'table' }
      }
    ]
  },
  {
    path: '/testview',
    component: Layout,
    children: [
      {
        path: 'testview',
        name: 'Testview',
        component: () => import('@/views/test/index'),
        meta: { requireAuth: true, title: '测试数据传递', icon: 'drag' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
