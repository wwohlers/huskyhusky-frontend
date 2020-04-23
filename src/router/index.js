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
    component: () => import(/* webpackChunkName: "about" */ '../views/Archive.vue')
  },
  {
    path: '/article/:name',
    name: 'article',
    component: () => import('../views/Article.vue'),
    props: true,
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        selector: to.hash
      };
    } else {
      return { x: 0, y: 0 };
    }
  }
})

export default router
