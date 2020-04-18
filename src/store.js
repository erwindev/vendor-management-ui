import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('jwt') || '',
    user: {}
  },
  mutations: {
    auth_request (state) {
      state.status = 'authenticating'
    },
    logout_request (state) {
      state.status = 'logging out'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:5000/api/v1/auth/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data
            localStorage.setItem('jwt', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = 'Bearrer ' + token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('error')
            localStorage.removeItem('jwt')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout_request')
        axios({url: 'http://localhost:5000/api/v1/auth/logout', data: {}, method: 'POST'})
          .then(resp => {
            localStorage.removeItem('jwt')
            delete axios.defaults.headers.common['Authorization']
            commit('logout')
            resolve(resp)
          })
          .catch(err => {
            commit('error')
            reject(err)
          })
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
