import axios from 'axios'
import {API_BASE} from '../config'

import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  REG_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  ERROR,
  SUCCESS,
  SAVE_USER
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
  updateuser ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit(REG_REQUEST)
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${API_BASE}/user/`, data: user, method: 'PUT' })
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
          localStorage.setItem('jwt', token)
          commit(AUTH_SUCCESS, resp.data)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          localStorage.removeItem('jwt')
          reject(err)
        })
    })
  },
  getuser ({ commit }, userId) {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${API_BASE}/user/${userId}`, method: 'GET' })
        .then(resp => {
          commit(SAVE_USER, resp.data)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit(LOGOUT_REQUEST)
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({url: `${API_BASE}/auth/logout`, data: {}, method: 'POST'})
        .then(resp => {
          localStorage.clear()
          delete axios.defaults.headers.common['Authorization']
          commit(LOGOUT_SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          localStorage.clear()
          commit(LOGOUT_SUCCESS)
          reject(err)
        })
    })
  }
}
