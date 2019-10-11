<template>
  <div id="app">
<router-view></router-view>
  </div>
</template>

<script>
import request from '@/utils/request'

request({
  method: 'GET',
  url: '/app/v1_0/channels'
}).then(res => {
  // console.log(res.data)
})
export default {
  name: 'App'
}
</script>

<style>

</style>
