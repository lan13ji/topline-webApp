<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item">
        <van-image slot="icon" round width="30" height="30" src="" />
        <span slot="title">hello</span>
        <div slot="label">
          <p>你好，我是Zenobia</p>
          <p>
            <span>3天前</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o"></van-icon>
      </van-cell>
    </van-list>
    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import { getComments } from '@/api/comments'

export default {
  name: 'ArticleComment',
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的loading
      finished: false, // 是否加载结束
      offset: null
    }
  },
  methods: {
    // 1.请求获取数据
    async onLoad () {
      /**
       * type: a或c // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
       * source: 源id // 文章id或评论id
       * offset: 评论id // 获取评论数据的偏移量，表示从此id的数据向后取，不传表示从第一页开始读取数据
       * limit: // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
       */
      const { data } = await getComments({
        type: 'a',
        source: this.$route.params.articleId,
        offset: this.offset
      })
      const { results } = data.data
      console.log(results)
    }
  }
}
</script>

<style lang="less" scoped>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%

}
.van-list {
  margin-bottom: 45px;
}
</style>
