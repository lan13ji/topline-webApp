<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed></van-nav-bar>

    <!-- 频道列表 -->
    <!-- active 控制当前激活的标签 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id">
        <!-- 文章列表 -->
        <!--
          loading 控制上拉加载更多的 loading 效果
          finished 控制是否已加载在结束
          finished-text 加载结束的提示文本
          @load="onLoad" 上拉加载更多触发事件

          列表组件在初始化的时候自动触发 load 事件 调用 onLoad 方法
         -->
         <van-pull-refresh v-model="channel.isPullDownLoading" @refresh="onRefresh">
          <van-list
            v-model="channel.loading"
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad">
            <!-- 列表内容 -->
            <!--  -->
            <!--
              art_id超出js安全整数范围，被json-bigint转成对象了
              但key只能是数字或字符串，所以要要把它转字符串
            -->
            <van-cell
              v-for="article in channel.articles"
              :key="article.art_id.toString()"
              :title="article.title">
              <div slot="label">
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(img, index) in article.cover.images" :key="index">
                    <van-image lazy-load height="80" :src="img" />
                  </van-grid-item>
                </van-grid>
                <div class="article-info">
                  <div class="meta">
                    <span>{{ article.aut_name }}</span>
                    <span>{{ article.comm_count }}评论</span>
                    <span>{{ article.pubdate | relativeTime }}</span>
                  </div>
                </div>
              </div>
            </van-cell>
          </van-list>
         </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!--  -->

  </div>
</template>

<script>
import { getDefaultChannels } from '@/api/channels'
import { getArticles } from '@/api/articles'
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
        channel.timestamp = null // 频道下一页的时间戳
        channel.isPullDownLoading = false // 频道下拉刷新 loading 状态
      })
      this.channels = channels
    },
    // 异步更新数据
    async onLoad () {
      // 当前频道对象
      const activeChannel = this.channels[this.active * 1]

      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: activeChannel.id, // 频道id
        // 时间戳相当于当前频道下一页的页码
        timestamp: activeChannel.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })

      // 2. 将数据添加到当前频道 articles 中
      const { pre_timestamp: preTimestamp, results } = data.data
      // activeChannel.articles = activeChannel.articles.concat(data.data.resluts)
      activeChannel.articles.push(...results)// ...["a","b","c"]展开运算符——es6

      // 3.结束当前频道 loading
      activeChannel.loading = false

      // 4.判断是否已全部加载结束，设置finished值
      // 有时间戳，获取下一个数据的页码时间戳
      // 没有，就数据获取结束
      preTimestamp ? activeChannel.timestamp = preTimestamp : activeChannel.finished = true
      // 1. 请求获取数据
      /* setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          // 2. 将数据添加到当前频道 articles 中
          activeChannel.articles.push(activeChannel.name + (activeChannel.articles.length + 1))
        }
        // 3.结束本次 loading
        // *
        //  * 设置本次加载状态结束
        //  * 每次数据不满足一屏，它就继续onLoad
        //  * 本次不终止，它就不会继续
        //  *
        activeChannel.loading = false

        // 4.判断是否已全部加载结束，设置finished值
        if (activeChannel.articles.length >= 15) {
          activeChannel.finished = true
        }
      }, 2000) */
    },
    /* 下拉刷新 */
    async onRefresh () {
      // 获取当前的频道对象
      const activeChannel = this.channels[this.active * 1]

      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: activeChannel.id, // 频道id
        timestamp: Date.now(), // 下拉刷新永远都是获取最新的文章列表，所以传递当前最新的时间戳
        with_top: 1
      })

      // 2.将数据添加到文章列表顶部
      activeChannel.articles.unshift(...data.data.results)

      // 3, 关闭下拉刷新的 loading 状态
      activeChannel.isPullDownLoading = false

      // 4.提示
      this.$toast('刷新成功')
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<!--
  使用 scoped 后，父组件的样式将不会渗透到子组件中
  不过一个子组件的根节点同时受其父组件的 scoped CSS 和 子组件的 scoped CSS 的影响
  这样设计是为了让父组可以从布局的角度出发，调整其子组件根元素的样式
  在有作用域的样式中，依然可以影响子组件的根元素
-->

<!--
  没有作用域的时候，相当于全局样式
-->

<style lang="less" scoped>
.home {
  .van-tabs /deep/ .van-tabs__wrap--scrollable {
    position: fixed;
    top: 46px;
    left: 0;
    right: 16px;
    z-index: 2;
  }

  .van-tabs /deep/ .van-tabs__content {
    margin-top: 90px;
  }

  .article-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .meta span {
      margin-right: 10px;
    }
  }
}
</style>
