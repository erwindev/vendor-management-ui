import axios from 'axios'
import {API_BASE} from '../config'

import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  REG_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SAVE_USER,
  ERROR,
  SUCCESS
} from './mutation-types'

export const userActions = {
  register ({ commit }, resgistration) {
    return new Promise((resolve, reject) => {
      commit(REG_REQUEST)
      axios({ url: `${API_BASE}/user/`, data: resgistration, method: 'POST' })
        .then(resp => {
          commit(SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  },
  login ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      axios({ url: `${API_BASE}/auth/login`, data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data
          localStorage.setItem('jwt', token)
          // Add the following line:
          axios.defaults.headers.common['Authorization'] = 'Bearrer ' + token
          commit(AUTH_SUCCESS, token)
          commit(SAVE_USER, user)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          localStorage.removeItem('jwt')
          reject(err)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit(LOGOUT_REQUEST)
      axios({url: `${API_BASE}/auth/logout`, data: {}, method: 'POST'})
        .then(resp => {
          localStorage.removeItem('jwt')
          delete axios.defaults.headers.common['Authorization']
          commit(LOGOUT_SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          localStorage.removeItem('jwt')
          commit(ERROR)
          reject(err)
        })
    })
  }
}
