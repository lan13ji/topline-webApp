<template>
<div class="search">
  <!-- 搜索框 -->
  <van-search
    v-model="searchText"
    placeholder="请输入搜索关键词"
    show-icon
    shape="round"
    @search="onSearch" @input="onSearchInput">
    <div slot="action" @click="onSearch">搜索</div>
  </van-search>

  <!-- 联想建议 -->
  <van-cell-group>
    <van-cell
      v-for="(item,index) in searchSuggestions"
      :key="index"
      icon="search">
      <div v-html="item" slot="title"></div>
    </van-cell>
  </van-cell-group>
</div>
</template>

<script>
import { getSearchSugstions } from '@/api/search'
export default {
  name: 'searchIndex',
  data () {
    return {
      searchText: '',
      searchSuggestions: [] // 联想建议列表
    }
  },
  methods: {
    onSearch () {
      console.log('onSearch')
    },
    async onSearchInput () {
      const searchText = this.searchText.trim()
      if (!searchText) return
      const { data } = await getSearchSugstions({
        q: this.searchText
      })
      const searchSuggestions = data.data.options
      // 根据字符串常见正则表达式
      const reg = new RegExp(searchText, 'g')
      searchSuggestions.forEach((item, index) => {
        searchSuggestions[index] = item.replace(reg, `<span style="color: red">${searchText}</span>`)
      })
      this.searchSuggestions = data.data.options
    }
  }
}
</script>

<style>

</style>
