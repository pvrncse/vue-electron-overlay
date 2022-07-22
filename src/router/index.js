import Vue from 'vue'
import VueRouter from 'vue-router'
import Footer from '../views/Footer.vue'
import Header from '../views/Header.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Bottom',
    component: Footer 
  },
  {
    path: '/top',
    name: 'Top',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Header.vue')
    component: Header 
  }
]

const router = new VueRouter({
  routes
})

export default router
