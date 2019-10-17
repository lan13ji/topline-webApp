<template>
<div class="search">
  <!-- 搜索框 -->
  <van-search
    v-model="searchText"
    placeholder="请输入搜索关键词"
    show-action
    shape="round"
    @search="onSearch(searchText)"
    @input="onSearchInput">
    <div slot="action" @click="onSearch(searchText)">搜索</div>
  </van-search>

  <!-- 联想建议 -->
  <van-cell-group>
    <van-cell
      v-for="(item,index) in searchSuggestions"
      :key="index"
      @click="onSearch(item)">
      <!--
        这里不能使用过滤器
        因为过滤器只能用于 {{}} 、v-bind
       -->
      <div v-html="highlight(item)" slot="title"></div>
    </van-cell>
  </van-cell-group>
  <!-- 搜索历史记录 -->
  <van-cell-group>
    <van-cell title="历史记录">
      <span>全部删除</span>&emsp;<span>完成</span>
      <van-icon name="delete" class="icon-del"></van-icon>
    </van-cell>
    <van-cell title="单元格">
      <van-icon name="close"></van-icon>
    </van-cell>
  </van-cell-group>
</div>
</template>

<script>
import { getSearchSugstions } from '@/api/search'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      searchSuggestions: [], // 联想建议列表
      searchHistories: [] // 搜索历史记录
    }
  },
  methods: {
    onSearch (item) {
      // 存储搜索历史记录
      const index = this.searchHistories.indexOf(item)
      // 如果搜索历史记录已经存在，将其移除，重新存储在数组的顶部
      index !== -1 && this.searchHistories.splice(index, 1)
      this.searchHistories.unshift(item)
      // 将历史记录存入本地存储
      setItem('search-histories', this.searchHistories)
      // 跳转到搜索结果页面
      this.$router.push('/search/' + item)
    },
    async onSearchInput () {
      // trim() 去掉首尾空格
      const searchText = this.searchText.trim()
      if (!searchText) return
      const { data } = await getSearchSugstions({
        q: this.searchText
      })
      this.searchSuggestions = data.data.options
    },
    // 搜索关键词 高亮
    highlight (item) {
      // 根据 关键词 创建 正则表达式
      const reg = new RegExp(this.searchText, 'g')
      return item.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>
.icon-del{
  margin-left: 10px;
  vertical-align: middle
}
</style>
