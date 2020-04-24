import Vue from 'vue'

// import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import echarts from 'echarts'
import 'echarts/theme/customed.js'
import 'echarts/theme/chalk.js'

// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import { VTable, VPagination } from 'vue-easytable'

Vue.prototype.$echarts = echarts

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
axios.defaults.withCredentials = true // 支持在不同请求路径下保存session状态
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
// Vue.prototype.$axios = axios
Vue.config.productionTip = false

// 将table和分页组件注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !

import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
*/
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

window.axiosCancel = []

// 请求前拦截
axios.interceptors.request.use(config => {
  // 添加取消标记
  config.cancelToken = new axios.CancelToken(cancel => {
    window.axiosCancel.push({ cancel })
  })
  return config
}, function(error) {
  return Promise.reject(error)
})

// 请求后返回数据拦截
axios.interceptors.response.use(res => {
  return res
}, function axiosRetryInterceptor(res) {
  return Promise.reject(res)
})

Vue.prototype.$axios = axios
// 将cancel,挂载到vue原型上
Vue.prototype.cancel = function() {
  // 获取缓存的 请求取消标识 数组，取消所有关联的请求
  const cancelArr = window.axiosCancel
  cancelArr.forEach((ele, index) => {
    console.log(ele)
    console.log(index)
    // 在失败函数中返回这里自定义的错误信息
    ele.cancel('interrupt')
    delete window.axiosCancel[index]
  })
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
