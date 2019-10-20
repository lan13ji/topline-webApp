<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="标题"></van-nav-bar>
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <ValidationObserver tag="form" ref="loginForm">
      <van-cell-group>
        <!--
          name 提示文本
          rules 验证规则
          v-slot="{ errors }" 获取校验结果数据
          errors[0] 读取校验结果的失败信息
          tag 指定渲染元素，默认是span
         -->
        <ValidationProvider name="手机号" rules="required|max:11|phone" v-slot="{ errors}">
          <van-field required clearable label="手机号" placeholder="请输入手机号" v-model="user.mobile" :error-message="errors[0]"></van-field>
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required|max:6" v-slot="{ errors }">
          <van-field required type="password" label="验证码" placeholder="请输入验证码" v-model="user.code" :error-message="errors[0]"></van-field>
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
// import request from '@/utils/request'
import { login } from '@/api/user'
import { setItem } from '@/utils/storage'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '246810' // 验证码 246810
      }
    }
  },
  methods: {
    async onLogin () {
      try {
        // 表单验证
        const isValid = await this.$refs.loginForm.validate()
        if (!isValid) return // 如果验证失败，阻止表单提交

        // 验证通过，loading，请求
        const toast = this.$toast.loading({
          duration: 0, // 持续展示toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '登录中'
        })
        // 请求提交表单数据
        const { data } = await login(this.user)
        /* const { data } = await request({
          method: 'POST',
          url: '/app/v1_0/authorizations',
          data: this.user
        }) */

        // 先清除 loading
        // 如果之后有 success、fail 之类的提示，就不需要手动关闭 loading 了
        toast.clear()

        const that = this
        this.$toast.success({
          duration: 500,
          message: '登录成功',
          onClose () {
            that.$router.push({ name: 'home' })
          }
        })

        // 登录成功，将token存储到vuex
        this.$store.commit('setUser', data.data)

        // 为了防止刷新token丢失，将token存储到本地存储
        setItem('user', data.data)
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
