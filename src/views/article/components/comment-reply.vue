<template>
  <div class="article-comments">
    <!-- 导航栏 -->
    <van-nav-bar :title="comment.reply_count+'条回复'">
      <van-icon slot="left" name="cross"></van-icon>
    </van-nav-bar>

    <!-- 当前评论 -->
    <van-cell title="当前评论">
      <van-image slot="icon" round width="30" height="30" style="margin-right:10px" :src="comment.aut_photo" />
      <span style="color: #466b9d" slot="title">{{ comment.aut_name  }}</span>
      <div slot="label">
        <p style="color: #363636;">{{comment.content}}</p>
        <p>
          <span style="margin-right: 10px">{{ comment.pubdate | relativeTime }}</span>
          <!-- <van-button size="mini" type="default">回复 {{ comment.reply_count }}</van-button> -->
        </p>
      </div>
      <van-icon slot="right-icon" />
    </van-cell>
    <van-cell title="全部回复"></van-cell>

    <!-- 回复评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(reply,index) in list" :key="index">
        <van-image slot="icon" round width="30" height="30" style="margin-right: 10px" :src="comment.aut_photo" />
        <span style="color: #466b9d" slot="title">{{ reply.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636;">{{ reply.content }}</p>
          <p>
            <span style="margin-right: 10px">{{reply.pubdate | relativeTime}}</span>
            <!-- <van-button size="mini" type="default">回复 {{ reply.reply_count }}</van-button> -->
          </p>
        </div>
        <van-icon slot="right-icon" :name="reply.is_liking ? 'like' : 'like-o'" @click="onCommentLike(reply)"></van-icon>
      </van-cell>
    </van-list>

    <!-- 发布回复 -->
    <van-cell-group class="publish-wrap">
      <van-field v-model="commentText" clearable placeholder="请输入回复内容">
        <van-button slot="button" size="mini" type="info" @click="onAddComment">回复</van-button>
      </van-field>
    </van-cell-group>
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
  name: 'CommentReply',
  props: ['comment'],
  data () {
    return {
      list: [],
      finished: false,
      loading: false,
      commentText: '',
      offset: null
    }
  },
  created () {
    // console.log('回复评论', this.comment)
    // console.log(this.$route.params.articleId)
  },
  methods: {
    async onLoad () {
      const { data } = await getComments({
        // 1. 请求获取数据
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset
      })
      // 2.将数据添加到评论回复数组中
      const { results } = data.data
      this.list.push(...results)
      // 3.结束 loading
      this.loading = false
      // 4.判断是否加载结束
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    },
    /**
     * 发布回复
     */
    async onAddComment () {
      // 获取回复内容
      const commentText = this.commentText.trim()
      if (!commentText) return
      // 发送回复评论请求
      const { data } = await addComments({
        target: this.comment.com_id.toString(), // 评论id,对评论进行回复则为评论id
        content: commentText,
        art_id: this.$route.params.articleId // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。
      })
      // 将最新回复放到回复列表的最顶端
      this.list.unshift(data.data.new_obj)
      // 清空文本框
      this.commentText = ''

      // 更新当前评论的回复数量
      this.comment.reply_count++
    },
    /**
     *评论点赞功能
     */
    async onCommentLike (reply) {
      const commentId = reply.com_id.toString()
      console.log(reply.is_liking)
      if (reply.is_liking) {
        await delCommentLike(commentId)
      } else {
        await addCommentLike(commentId)
      }
      reply.is_liking = !reply.is_liking
    }
  }
}
</script>

<style scoped lang="less">
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
