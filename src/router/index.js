import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  // 配置路由表
  routes: [{
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
    // component: Login
  }, {
    path: '/',
    component: () => import('@/views/tabbar'),
    children: [{
      name: 'home',
      path: '', // 默认子路由
      component: () => import('@/views/home')
    }]
  }]
})

export default router
