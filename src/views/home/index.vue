<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页"></van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 文章列表 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item"></van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
    <!--  -->

  </div>
</template>

<script>
import { getDefaultChannels } from '@/api/channels'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0, // 当前激活的tab标签
      channels: [], // 频道列表
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async loadChannels () {
      const { data } = await getDefaultChannels()
      this.channels = data.data.channels
    },
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
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style lang="less" scoped>

</style>
