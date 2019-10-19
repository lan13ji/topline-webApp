/*
 * 1.接口重用
 * 2.接口维护
 *    实际开发过程中，接口经常容易变化，为了方便接口维护和更新
 *    需要把接口请求的代码单独封装起来，统一放到一起
 * 放到哪里？？
 *  约定：放到项目的api中，根据接口的种类进行归类管理
 *  例如：用户相关的接口放到 user.js 中
 *        文章相关的接口放到 article.js 中
 * 如何封装？？
 *     一个函数，接收参数，返回请求结果就可以了
 */

// 用户相关接口封装模块

import request from '@/utils/request'

// 登录
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 关注用户
export function followUser (userId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId // 用户Id
    }
  })
}

// 取消关注用户
export function unFollowUser (userId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
