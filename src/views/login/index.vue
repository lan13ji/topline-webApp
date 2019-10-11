<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="标题"></van-nav-bar>
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <van-cell-group>
      <van-field required clearable lable="手机号" placeholder="请输入手机号"></van-field>
      <van-field required type="password" lable="验证码" placeholder="请输入验证码"></van-field>
    </van-cell-group>
    <div class="login-btn">
      <van-button type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex'
}
</script>

<style lang="less" scoped>
.login {
 .login-btn {
   padding: 20px;

   .van-button {
      width: 100%;
    }
  }
}
</style>
