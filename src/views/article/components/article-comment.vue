/* eslint-disable camelcase */
<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="comment in list" :key="comment.com_id.toString()">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          :src="comment.aut_photo"
          style="margin-right: 10px"
        />
        <span style="color: #466b9d" slot="title">{{ comment.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ comment.content }}</p>
          <p>
            <span style="margin-right: 10px;">{{ comment.pubdate | relativeTime }}</span>
            <van-button size="mini" type="default" @click="onReplyShow">回复 {{ comment.reply_count}}</van-button>
          </p>
        </div>
        <van-icon
          slot="right-icon"
          :name="comment.is_liking ? 'like' : 'like-o'"
          @click="onCommentLike(comment)"
        />
      </van-cell>
    </van-list>
    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容" v-model="commentText">
        <van-button slot="button" size="mini" type="info" @click="onAddComment">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" round position="bottom" :style="{height: '90%'}"></van-popup>
  </div>
</template>

<script>
import {
  getComments,
  addComments,
  addCommentLike,
  delCommentLike
} from '@/api/comments'

export default {
  name: 'ArticleComment',
  props: ['articleId'],
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的loading
      finished: false, // 是否加载结束
      offset: null, // 获取下一页数据的页码
      commentText: '', // 输入的评论内容
      isReplyShow: false // 控制回复评论弹窗显示
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
      /**
       * com_id: '' // 评论或回复id
       * aut_id: '' // 评论或回复的用户id
       * aut_name: '' // 用户名称
       * aut_photo: '' // 用户头像url
       * like_count: '' // 点赞数量
       * reply_count: '' // 回复数量
       * pubdate:'' // 创建时间
       * content:'' // 评论或回复内容
       * is_top:'' // 是否置顶，0-不置顶，1-置顶
       * is_liking: false //当前用户是否点赞
       */
      // 2.将数据添加到数组中
      this.list.push(...results)

      // 3.结束loading
      this.loading = false

      // 4.判断是否加载结束
      if (results.length) {
        // 如果还有数据，则更新获取下一页数据的页码(offset)
        this.offset = data.data.last_id
      } else {
        // 如果没有，finished = true
        this.finished = true
      }
    },
    /**
     * 发布评论
     */
    async onAddComment () {
      // 获取评论内容
      const commentText = this.commentText.trim()
      if (!commentText) return
      /**
       * target: '', // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
       * content: '', // 评论内容
       * art_id: '' // 文章id
       */
      // 提交发布请求
      const { data } = await addComments({
        target: this.$route.params.articleId,
        content: commentText
      })
      // 将新添加的评论数据展示在评论顶部
      this.list.unshift(data.data.new_obj)

      // 清空评论内容
      this.commentText = ''
    },
    /**
     * 评论点赞功能
     */
    async onCommentLike (comment) {
      const commentId = comment.com_id.toString()
      if (comment.is_liking) {
        await delCommentLike(commentId)
      } else {
        await addCommentLike(commentId)
      }
      comment.is_liking = !comment.is_liking
    },
    /**
     * 评论回复弹层
     */
    onReplyShow () {
      this.is_liking = true
    }
  }
}
</script>

<style lang="less" scoped>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.van-list {
  margin-bottom: 45px;
}
</style>
