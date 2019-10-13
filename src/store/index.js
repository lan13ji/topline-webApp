import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储用户相关信息（ 包括 token ）
    user: getItem('user')
    // user: null
  },
  mutations: {
    // 参数1： 默认参数 state
    // 参数2： 自定义参数
    setUser (state, user) {
      state.user = user

      // 存储数据的同时将数据存储到本地存储中
      setItem('user', state.user)
    }
  },
  actions: {

  }
})
