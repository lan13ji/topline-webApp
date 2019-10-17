<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情">
    </van-nav-bar>

    <!-- 加载中 -->
    <van-loading class="article-loading" />

    <!-- 文章详情 -->
    <div class="detail">
      <h3 class="title">{{ article.title }}</h3>
      <div class="author">
        <van-image
          round
          width="2rem"
          height="2rem"
          fit="fill"
          :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{ article.aut_name }}</p>
          <p class="time">{{ article.pubdate }}</p>
        </div>
        <van-button round size="small" type="info">+ 关注</van-button>
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
          type="primary"
          icon="good-job-o">
          点赞
          </van-button>
          &emsp;
          <van-button
          round
          hairline
          plain
          size="small"
          type="danger"
          icon="delete">
          不喜欢
          </van-button>
      </div>
    </div>
    <!-- 加载失败的消息提示 -->
    <div class="error">
      <p>网络超时，点击 <a href="#">刷新</a>试一试</p>
    </div>
  </div>
</template>

<script>
import { getDetail } from '@/api/articles'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      article: {}
    }
  },
  methods: {
    async loadArticle () {
      const articleId = this.$route.params.articleId
      const { data } = await getDetail(articleId)
      /**
       * title: '' // 文章标题
       * contned: '' // 文章内容
       * aut_name: '' // 作者名
       * aut_photo: '' // 作者头像url 默认为null
       * pubdate: ' // 发布日期
       */
      this.article = data.data
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
}
.article-loading,
.error
{
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;

  .title {
    font-size: 16px;
  }

  .zan {
    text-align: center
  }

  .author {
    padding: 10px 0;
    display: flex;

    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;

      .name{
        font-size: 14px;
        margin: 0;
      }

      .time {
        margin: 0;
        font-size: 12px;
        color: #999
      }
    }
  }

  .content {
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9
    }
  }
}
</style>
