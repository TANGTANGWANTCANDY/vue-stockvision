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
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 新用户注册
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/Register'),
    hidden: true
  },
  {
    path: '/register-success',
    name: 'register-success',
    component: () => import('@/views/login/RegisterSuccess'),
    hidden: true
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'center',
        name: 'center',
        component:()=>import('@/views/dashboard/AdminCenter'),
        meta: { requireAuth: true, title: '管理中心', icon: 'dashboard' }
      },
      {
        path: 'add',
        name: 'addAdmin',
        component:()=>import('@/views/dashboard/addAdmin'),
      },
      {
        path:'factor/manage',
        name:'FactorManage',
        component:()=>import('@/views/dashboard/factor-admin/factorManage'),
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'center',
        name: 'userCenter',
        component: () => import('@/views/dashboard/UserCenter'),
        meta: { requireAuth: true, title: '首页', icon: 'guide' }
      },
      {
        path:'update-user',
        name:'update-user',
        component:()=>import('@/views/dashboard/ModifyUser'),
        hidden: true
      },
      {
        path:'modify-password',
        name:'modify-password',
        component:()=>import('@/views/dashboard/ModifyPassword'),
        hidden: true
      },
      {
        path:'update/success',
        name:'update-success',
        component:()=>import('@/views/dashboard/Success'),
        hidden: true
      }
    ]
  },
  {
    path: '/market',
    component: Layout,
    redirect: '/market/index',
    name: 'Market',
    meta: { requireAuth: true, title: '大盘监控', icon: 'dashboard' },
    children: [
      {
        path: 'keyboard',
        name: 'Keyboard',
        component: () => import('@/views/charts/keyboard'),
        meta: { requireAuth: true, title: '涨跌分布', icon: 'table' }
      },
      {
        path: 'limitUpDown',
        name: 'limitUpDown',
        component: () => import('@/views/charts/limitUpDown'),
        meta: { requireAuth: true, title: '涨跌停', icon: 'chart' }
      },
      {
        path: 'limitUpStockPool',
        name: 'limitUpStockPool',
        component: () => import('@/views/charts/limitUpStockPool'),
        meta: { requireAuth: true, title: '涨停股池', icon: 'tree' }
      },
      {
        path: 'limitDownStockPool',
        name: 'limitDownStockPool',
        component: () => import('@/views/charts/limitDownStockPool'),
        meta: { requireAuth: true, title: '跌停股池', icon: 'tree-table' }
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
  /*
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
  */
  {
    path: '/customFactor',
    component: Layout,
    children: [
      {
        path: 'customFactor',
        name: 'customFactor',
        component: () => import('@/views/custom-factor/FactorSelect'),
        meta: { requireAuth: true, title: '因子分析与有效性验证', icon: 'search' }
      },
      {
        path: 'model/sr',
        name: 'StackRegressor',
        component: () => import('@/views/custom-factor/StackRegressor'),
        hidden: true
      },
      {
        path:'model/gcf',
        name:'GCForest',
        component: () => import('@/views/custom-factor/strategy/GCForest'),
        hidden: true
      },
      {
        path:'model/am',
        name:'AvgMoment',
        component: () => import('@/views/custom-factor/strategy/AvgMoment'),
        hidden: true
      }
    ]
  },
  /*
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
  */
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
    path: '/indDetails',
    component: Layout,
    children: [
      {
        path: 'indDetails',
        name: 'indDetails',
        component: () => import('@/views/ind-details/index'),
        meta: { requireAuth: true, title: '个股详情', icon: 'example' }
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
  // {
  //   path: '/testview',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'testview',
  //       name: 'Testview',
  //       component: () => import('@/views/test/index'),
  //       meta: { requireAuth: true, title: '测试数据传递', icon: 'drag' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/*
export const adminRoutes = [
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
  // 新用户注册
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/Register'),
    hidden: true
  },
  {
    path: '/register-success',
    name: 'register-success',
    component: () => import('@/views/login/RegisterSuccess'),
    hidden: true
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'center',
        name: 'center',
        component:()=>import('@/views/dashboard/AdminCenter'),
        meta: { requireAuth: true, title: '管理中心', icon: 'dashboard' }
      },
      {
        path: 'add',
        name: 'addAdmin',
        component:()=>import('@/views/dashboard/addAdmin'),
      }
    ]
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
    path: '/customFactor',
    component: Layout,
    children: [
      {
        path: 'customFactor',
        name: 'customFactor',
        component: () => import('@/views/custom-factor/FactorSelect'),
        meta: { requireAuth: true, title: '因子分析与有效性验证', icon: 'search' }
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
    path: '/indDetails',
    component: Layout,
    children: [
      {
        path: 'indDetails',
        name: 'indDetails',
        component: () => import('@/views/ind-details/index'),
        meta: { requireAuth: true, title: '个股详情', icon: 'example' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
*/

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

/* 路由拦截器 路由跳转前的操作 */
router.beforeEach((to, from, next) => {
  // 获取缓存的 请求取消标识 数组，取消所有关联的请求
  const cancelArr = window.axiosCancel
  cancelArr.forEach((ele, index) => {
    console.log(ele)
    console.log(index)
    // 在失败函数中返回这里自定义的错误信息
    ele.cancel('interrupt')
    delete window.axiosCancel[index]
  })
  next()
})

export default router
