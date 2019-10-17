/**
 * 搜索接口相关请求模块
 */
import request from '@/utils/request'

export function getSearchSugstions (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params
  })
}

export function getSearchResult (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
