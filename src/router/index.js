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
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { requireAuth: true, title: '首页', icon: 'guide' }
    }]
  },
  {
    path: '/search',
    component: Layout,
    children: [
      {
        path: 'search',
        name: 'Search',
        component: () => import('@/views/search'),
        meta: { requireAuth: true, title: '增删改查', icon: 'component' }
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
        path: 'index',
        name: 'Index',
        component: () => import('@/views/market/index'),
        meta: { requireAuth: true, title: '介绍', icon: 'dashboard' }
      },
      {
        path: 'line',
        name: 'Line',
        component: () => import('@/views/charts/line'),
        meta: { requireAuth: true, title: '折线图', icon: 'table' }
      },
      {
        path: 'keyboard',
        name: 'Keyboard',
        component: () => import('@/views/charts/keyboard'),
        meta: { requireAuth: true, title: '柱状图', icon: 'table' }
      },
      {
        path: 'mix',
        name: 'Mix',
        component: () => import('@/views/charts/mix-chart'),
        meta: { requireAuth: true, title: '混合图', icon: 'table' }
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
    path: '/indContribution',
    component: Layout,
    children: [
      {
        path: 'indContribution',
        name: 'indContribution',
        component: () => import('@/views/ind-contribution/index'),
        meta: { requireAuth: true, title: '个股贡献度', icon: 'example' }
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
    path: '/customFactor',
    component: Layout,
    children: [
      {
        path: 'customFactor',
        name: 'customFactor',
        component: () => import('@/views/custom-factor/index'),
        meta: { requireAuth: true, title: '自定义因子组合', icon: 'search' }
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
  /**
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '行业监控', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '个股贡献度', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '涨停连板情况',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
*/

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
