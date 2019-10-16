<template>
<div class="search">
  <!-- 搜索框 -->
  <van-search
    v-model="searchText"
    placeholder="请输入搜索关键词"
    show-icon
    shape="round"
    @search="onSearch">
    <div slot="action" @click="onSearch">搜索</div>
  </van-search>

  <!-- 联想建议 -->
  <van-cell-group>
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
  </van-cell-group>
</div>
</template>

<script>
export default {
  name: 'searchIndex',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    onSearch () {
      console.log('onSearch')
    }
  }
}
</script>

<style>

</style>
