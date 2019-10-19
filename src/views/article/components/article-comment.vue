<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list>
      <van-cell>
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
export default {
  name: 'ArticleComment'
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
