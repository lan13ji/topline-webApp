import request from '@/utils/request'

/* 评论接口相关请求模块 */

export function getComments (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
