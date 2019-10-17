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
      <template v-if="isDelShow">
        <span @click="delHistory('全部')">全部删除</span>
        <!-- &emsp;<span @click="isDelShow = false">完成</span> -->
      </template>
      <van-icon name="delete" class="icon-del" @click="isDelShow = !isDelShow"></van-icon>
    </van-cell>
    <van-cell
      v-for="( item, i ) in searchHistories"
      :title="item"
      :key="i"
      @click="onSearch(item)">
      <van-icon name="close" v-show="isDelShow" @click.stop="delHistory('该条',i)"></van-icon>
    </van-cell>
  </van-cell-group>
</div>
</template>

<script>
import { getSearchSugstions } from '@/api/search'
import { getItem, setItem } from '@/utils/storage'
import { Dialog } from 'vant'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      searchSuggestions: [], // 联想建议列表
      searchHistories: getItem('search-histories') || [], // 搜索历史记录
      isDelShow: false // 控制删除显示状态
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
    },
    // 历史记录删除
    delHistory (txt, i) {
      Dialog.confirm({
        message: `确认${txt}删除记录吗？`
      }).then(() => {
        i === undefined ? this.searchHistories = [] : this.searchHistories.splice(i, 1)
      }).catch(() => {})
    }
  },
  watch: {
    searchHistories (newVal) {
      setItem('search-histories', newVal)
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
