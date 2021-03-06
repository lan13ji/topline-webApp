<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="文章详情" />

    <!-- 加载中 -->
    <van-loading class="article-loading" v-if="loading" />

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{ article.title }}</h3>
      <div class="author">
        <van-image round width="2rem" height="2rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{ article.aut_name }}</p>
          <p class="time">{{ article.pubdate }}</p>
        </div>
        <van-button
          round
          size="small"
          type="info"
          @click="onFollow"
        >{{ article.is_followed ? '取消关注 ': '+ 关注' }}</van-button>
      </div>
      <div class="content" v-html="article.content"></div>
      <div class="zan">
        <!--
          round: 圆形按钮
          hairline: 0.5px细边框
          plain: 朴素按钮-文字为按钮颜色
        -->
        <van-button
          round
          hairline
          plain
          size="small"
          :type="this.article.attitude===1 ? 'primary' : 'default'"
          :icon="this.article.attitude===1 ? 'good-job' : 'good-job-o'"
          @click="onLike"
        >{{this.article.attitude===1 ? '取消点赞' : '点赞'}}</van-button>&emsp;

        <van-button
          round
          hairline
          plain
          size="small"
          :type="this.article.attitude===0 ? 'danger' : 'default'"
          icon="delete"
          @click="onDislike"
        >{{this.article.attitude===0 ? '取消不喜欢' : '不喜欢'}}</van-button>
      </div>
    </div>
    <!-- 加载失败的消息提示 -->
    <div class="error" v-else>
      <p>网络超时，点击<a href="#">刷新</a>试一试</p>
    </div>
    <!-- 文章评论 -->
    <article-comment :article-id="$route.params.articleId" />
  </div>
</template>

<script>
import {
  getDetail,
  unLikeArticle,
  likeArticle,
  disLikeArticle,
  delDisLikeArticle
} from '@/api/articles'
import { followUser, unFollowUser } from '@/api/user'
import ArticleComment from './components/article-comment'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      article: {}, // 文章详情
      loading: true // 控制加载中的 loading 状态
    }
  },
  components: {
    ArticleComment
  },
  methods: {
    async loadArticle () {
      // 开启 loading
      this.loading = true
      try {
        const articleId = this.$route.params.articleId
        const { data } = await getDetail(articleId)
        /**
         * art_id: '' //文章ID
         * title: '' // 文章标题
         * pubdate: ' // 发布日期
         * attitude: '' // 对文章的态度(-1 无态度，0 不喜欢，1 点赞)
         * is_collected: false // 是否收藏了文章
         * content: '' // 文章内容
         * aut_id: '' // 作者ID
         * aut_name: '' // 作者名
         * aut_photo: '' // 作者头像url 默认为null
         * is_fllowed: false // 是否关注了作者
         * recomments: [] // 相关文章推荐，无推荐为空数组
         */
        this.article = data.data
      } catch (err) {
        console.log(err)
      }
      // 无论加载成功还是失败，loading都要结束
      this.loading = false
    },

    // 关注功能
    async onFollow () {
      if (this.article.is_followed) {
        await unFollowUser(this.article.aut_id)
      } else {
        await followUser(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
    },

    // 点赞功能
    async onLike () {
      const articleId = this.article.art_id.toString()
      const { attitude } = this.article
      // (-1 无态度，1 点赞)
      if (attitude === 1) {
        await unLikeArticle(articleId)
        this.article.attitude = -1
      } else {
        await likeArticle(articleId)
        this.article.attitude = 1
      }
    },

    // 不喜欢功能
    async onDislike () {
      const articleId = this.article.art_id.toString()
      const { attitude } = this.article
      // (-1 无态度，0 不喜欢)
      if (attitude === 0) {
        await delDisLikeArticle(articleId)
        this.article.attitude = -1
      } else {
        await disLikeArticle(articleId)
        this.article.attitude = 0
      }
    }
  },
  created () {
    this.loadArticle()
  }
}
</script>

<style lang="less" scoped>
.article-container {
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;

  /*.van-icon {
     color: #fff
  }*/

  .article-loading,
  .error {
    padding-top: 100px;
    text-align: center;
  }

  .detail {
    padding: 50px 10px;

    .title {
      font-size: 16px;
    }

    .zan {
      text-align: center;
    }

    .author {
      padding: 10px 0;
      display: flex;

      .text {
        flex: 1;
        padding-left: 10px;
        line-height: 1.3;

        .name {
          font-size: 14px;
          margin: 0;
        }

        .time {
          margin: 0;
          font-size: 12px;
          color: #999;
        }
      }
    }

    .content {
      overflow: hidden;
      white-space: pre-wrap;
      word-break: break-all;
      /deep/ img {
        max-width: 100%;
        background: #f9f9f9;
      }
    }
  }
}
</style>
