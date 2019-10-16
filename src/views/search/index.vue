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
      :title="item"
      :key="index"
      icon="search" />
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
      this.searchSuggestions = data.data.options
    }
  }
}
</script>

<style>

</style>
