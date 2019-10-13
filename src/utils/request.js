/*
 * axios 请求相关操作封装
 */
import axios from 'axios'

import jsonBig from 'json-bigint'

import store from '@/store'

// 之前的写法
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
// 之前为了方便，把 axios 挂载到 Vue 的原型对象上 $axios

/*
 * axios.create 方法返回一个请求对象，他的功能和axios功能是一样的
 * 也可以理解为复制了一个axios============为什么呢？
 * 因为有时候需要单独定制不同的请求(例如有的项目中有多个请求地址)
 * 之前的写法defaults只能使用一次
 * create可以重复使用！！！！强烈推荐使用！！！！
 */
const request = axios.create({
  // 请求的基础路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})

request.defaults.transformResponse = [function (data) {
  return data ? jsonBig.parse(data) : {}
}]

/*
 * 请求拦截器 请求到达后台之前拦截
 */
request.interceptors.request.use(function (config) {
  // 在发起请求时做一些业务处理
  // config  发送请求的配置信息
  const { user } = store.state // 获取用户信息
  if (user) {
    // Authorization 是后端要求的字段，不可以自定义
    // "Bearer token" 是后端要求的数据格式 ，不可以自定义, Bearer和token之间 空格 不能丢失
    config.headers['Authorization'] = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
/*
 * 响应拦截器
 */

//  导出请求对象，哪里需要发送请求，哪里就加载使用
export default request
