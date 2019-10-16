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
  }, {
    name: 'search',
    path: '/search',
    component: () => import('@/views/search')
  }, {
    name: 'search-result',
    path: '/search/:q',
    component: () => import('@/views/search-result')
  }]
})

export default router
