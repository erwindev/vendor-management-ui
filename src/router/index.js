import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../store/index.js'
import Home from '../components/home/Home.vue'
import Register from '../components/home/Register.vue'
import Login from '../components/home/Login.vue'
import Dashboard from '../components/dashboard/Dashboard.vue'
import EditUserProfile from '../components/home/EditUserProfile.vue'
import ChangePassword from '../components/home/ChangePassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: EditUserProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: ChangePassword,
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
    if (auth.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
