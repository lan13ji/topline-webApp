<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页"></van-nav-bar>

    <!-- 频道列表 -->
    <!-- active 控制当前激活的标签 -->
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 文章列表 -->
        <!--
          loading 控制上拉加载更多的 loading 效果
          finished 控制是否已加载在结束
          finished-text 加载结束的提示文本
          @load="onLoad" 上拉加载更多触发事件

          列表组件在初始化的时候自动触发 load 事件 调用 onLoad 方法
         -->
        <van-list v-model="channel.loading" :finished="channel.finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in channel.articles" :key="item" :title="item"></van-cell>
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
      channels: [] // 频道列表
    }
  },
  methods: {
    async loadChannels () {
      const { data } = await getDefaultChannels()
      // 不同频道的内容数据
      const channels = data.data.channels
      channels.forEach(channel => {
        channel.articles = [] // 频道的文章列表
        channel.loading = false // 频道的上拉加载更多的 loading 状态
        channel.finished = false // 频道的加载结束的状态
      })
      this.channels = channels
    },
    // 异步更新数据
    onLoad () {
      // 当前频道
      const activeChannel = this.channels[this.active * 1]
      // 1. 请求获取数据
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          // 2. 将数据添加到当前频道 articles 中
          activeChannel.articles.push(activeChannel.name + (activeChannel.articles.length + 1))
        }
        // 3.结束本次 loading
        /**
         * 设置本次加载状态结束
         * 每次数据不满足一屏，它就继续onLoad
         * 本次不终止，它就不会继续
         **/
        activeChannel.loading = false

        // 4.判断是否已全部加载结束，设置finished值
        if (activeChannel.articles.length >= 15) {
          activeChannel.finished = true
        }
      }, 2000)
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style lang="less" scoped>

</style>
