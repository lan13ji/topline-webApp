/*
 * 专门处理时间的工具模块
*/
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'

dayjs.extend(rTime)
dayjs.locale('zh-cn')

// value: 时间戳、日期时间、日期对象都可以
// 计算并返回指定时间到现在最新时间的相对时间
/* export function relattiveTime (value) {
  // 将处理时间的代码都封装成一个个的小函数，需要的时候按需调用
  return dayjs().from(dayjs(value))
} */

/*
 * 过滤器的本质作用：就是为模板提供一个函数进行调用
 * 过滤器是函数，使用过滤器就是在调用函数
 * | 前面的会作为参数传递给过滤器函数
 * 过滤器函数的返回值将渲染到这里
 */
// 为了方便的在模板中能够使用到该函数，将封装好的 relativeTime 注册为过滤器
Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value))
})
