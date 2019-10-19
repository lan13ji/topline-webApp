/**
 * 文章接口相关请求模块
 **/
import request from '@/utils/request'

// 获取文章列表
export function getArticles (params) {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// 获取文章详情
export function getDetail (articleId) {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 点赞
export function addLike (articleID) {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleID
    }
  })
}
// 取消点赞
export function unLike (articleID) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleID}`
  })
}
