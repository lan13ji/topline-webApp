<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="标题"></van-nav-bar>
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <van-cell-group>
      <van-field required clearable label="手机号" placeholder="请输入手机号" v-model="user.mobile"></van-field>
      <van-field required type="password" label="验证码" placeholder="请输入验证码" v-model="user.code"></van-field>
    </van-cell-group>
    <div class="login-btn">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13011111111', // 手机号
        code: '246810' // 验证码
      }
    }
  },
  methods: {
    async onLogin () {
      try {
        // 请求提交表单数据
        const { data } = await request({
          method: 'POST',
          url: '/app/v1_0/authorizations',
          data: this.user
        })
        console.log(data)
        this.$toast.success('登录成功')
      } catch (err) {
        // 所有大于等于 400 的状态码都会进入 catch
        if (err.response && err.response.status === 400) {
          this.$toast.fail('登陆失败，手机号或验证码错误')
        }
      }
    }
  }
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
