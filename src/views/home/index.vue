<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页"></van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab title="标签1">
        <!-- 文章列表 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item"></van-cell>
        </van-list>
      </van-tab>
      <van-tab title="标签2">内容2</van-tab>
      <van-tab title="标签3">内容3</van-tab>
    </van-tabs>
    <!--  -->

  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
