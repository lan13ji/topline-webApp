/*
 * axios 请求相关操作封装
 */
import axios from 'axios'

import jsonBig from 'json-bigint'

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
 * 请求拦截器
 */

/*
 * 响应拦截器
 */

//  导出请求对象，哪里需要发送请求，哪里就加载使用
export default request
