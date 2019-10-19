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
export const likeArticle = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

// 取消点赞
export const unLikeArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}

// 不喜欢
export function disLikeArticle (articleId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}

// 取消不喜欢
export function delDisLikeArticle (articleId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/dislikes/${articleId}`
  })
}
