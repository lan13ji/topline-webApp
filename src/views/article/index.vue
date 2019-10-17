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
    <!-- <div class="detail">
      <h3 class="title"></h3>
      <div class="author">
        <van-image round width="2rem" height="2rem" fit="fill" src=""></van-image>
        <div class="text">
          <p class="name"></p>
          <p class="time"></p>
        </div>
        <van-button round size="small" type="info">+ 关注</van-button>
      </div>
      <div class="content"></div>
      <div class="zan"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ArticleIndex'
}
</script>

<style>

</style>
