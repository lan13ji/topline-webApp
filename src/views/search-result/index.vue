<template>
  <div class="search-result">
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.params.q + '搜索结果'" left-arrow fixed @click-left="$router.back()"></van-nav-bar>
    <!-- 搜索结果列表 -->
    <van-list
      class="articles-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
        <van-cell v-for="(item, index) in list" :key="index" :title="item.title"></van-cell>
      </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 页数，不传默认为1
      // 每页数量，不传每页数量由后端决定
      params: {
        page: 1,
        perPage: 10,
        q: this.$route.params.q
      }
    }
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getSearchResult(this.params)

      // 2. 将数据添加到数组中
      this.list.push(...data.data.results)
      // 3. 结束 loading
      this.loading = false

      // 4. 判断是否还有数据
      data.data.page ? this.params.page++ : this.finished = true
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  .articles-list {
    margin-top: 46px;
  }
}
</style>
