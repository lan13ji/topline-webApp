import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,
  NavBar,
  Field,
  Cell,
  CellGroup,
  Toast,
  Tabbar,
  TabbarItem
} from 'vant'
import './styles/index.less'

// 表单验证
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 加载验证插件的语言包
import * as rules from 'vee-validate/dist/rules'

// 配置使用中文语言
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhCN.messages[rule] // add its message
  })
}

// 注册为全局组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 扩展自定义校验规则
// extend('规则名称',配置对象)
extend('phone', {
  // 验证方法，value是需要校验的数据，返回 布尔值,表示成功或失败
  validate: function (value) {
    return /^[1]([3-9])\d{9}$/.test(value)
  },
  // 错误的消息
  message: '请输入有效的手机号码'
})

// 注册组件
Vue
  .use(Button)
  .use(NavBar)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
