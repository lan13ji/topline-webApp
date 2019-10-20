<template>
  <div class="article-comments">
    <!-- 导航栏 -->
    <van-nav-bar title="1条回复">
      <van-icon slot="left" name="cross"></van-icon>
    </van-nav-bar>

    <!-- 当前评论 -->
    <van-cell title="当前评论">
      <van-image slot="icon" round width="30" height="30" style="margin-right:10px" src />
      <span style="color: #466b9d" slot="title">hello</span>
      <div slot="label">
        <p style="color: #363636;">评论内容</p>
        <p>
          <span style="margin-right: 10px">几天前</span>
          <van-button size="mini" type="default">回复 10</van-button>
        </p>
      </div>
      <van-icon slot="right-icon" />
    </van-cell>
    <van-cell title="全部评论"></van-cell>

    <!-- 回复评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in 10" :key="item" :title="item">
        <van-image slot="icon" round width="30" height="30" style="margin-right: 10px" src="" />
        <span style="color: #466b9d" slot="title">hello</span>
        <div slot="label">
          <p style="color: #363636;">评论内容</p>
          <p>
            <span style="margin-right: 10px">几天前</span>
            <van-button size="mini" type="default">回复 10</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" @click="onCommentLike()"></van-icon>
      </van-cell>
    </van-list>

    <!-- 发布回复 -->
    <van-cell-group class="publish-wrap">
      <van-field v-model="commentText" clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info" @click="onAddComment">发布</van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      finished: false,
      loading: true,
      commentText: ''
    }
  },
  methods: {
    onLoad () {

    },
    /**
     * 发布评论
     */
    onAddComment () {

    },
    /**
     *评论点赞功能
     */
    onCommentLike () {}
  }
}
</script>

<style scoped lang="less">
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
