import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储用户相关信息（ 包括 token ）
    user: null
  },
  mutations: {
    // 参数1： 默认参数 state
    // 参数2： 自定义参数
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {

  }
})
