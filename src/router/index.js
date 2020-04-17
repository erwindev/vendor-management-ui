import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home.vue'
import Register from '../components/home/Register.vue'
import Login from '../components/home/Login.vue'
import Dashboard from '../components/dashboard/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUlr: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin === 1) {
          next()
        } else {
          next({name: 'dashboard'})
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({name: 'dashboard'})
    }
  } else {
    next()
  }
})

export default router
