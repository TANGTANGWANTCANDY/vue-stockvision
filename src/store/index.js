import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'

/*
import user from './modules/user'
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})
export default store
*/
export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    }
  },
  mutations: {
    login(state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    }
  },
  modules: {
    app,
    settings
  },
  getters
})

