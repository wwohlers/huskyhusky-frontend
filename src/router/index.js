import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/archive',
    name: 'archive',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Archive.vue')
  },
  {
    path: '/article/:name',
    name: 'article',
    component: () => import('../views/Article.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/write/:id',
    name: 'write',
    component: () => import('../views/Write.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/signin',
    name: 'signIn',
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/signup',
    name: 'signUp'
  },
  {
    path: '/apply',
    name: 'apply',
    component: () => import('../views/Apply.vue')
  }, 
  {
    path: '/applications',
    name: 'applications',
    component: () => import('../views/Applications.vue')
  },
  {
    path: '/author/:id',
    name: 'author',
    component: () => import('../views/Author.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
