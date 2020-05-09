import axios from 'axios'
import {USER_API_BASE} from '../../config'

import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  REG_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  ERROR,
  SUCCESS,
  SAVE_USER,
  CHANGEPASSWORD_REQUEST
} from '../mutation-types'

export const userActions = {
  register ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(REG_REQUEST)
      axios({ url: `${USER_API_BASE}/user`, data: payload, method: 'POST' })
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
  login ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      console.log(process.env.VUE_APP_API_URL)
      axios({ url: `${USER_API_BASE}/auth/login`, data: payload, method: 'POST' })
        .then(resp => {
          const token = resp.data.authdata.token
          localStorage.setItem('jwt', token)
          commit(AUTH_SUCCESS, resp.data.authdata)
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
      axios({ url: `${USER_API_BASE}/user/${userId}`, method: 'GET' })
        .then(resp => {
          commit(SAVE_USER, resp.data.user)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  },
  updateuser ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(REG_REQUEST)
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${USER_API_BASE}/user`, data: payload, method: 'PUT' })
        .then(resp => {
          commit(SAVE_USER, resp.data.user)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  },
  changepassword ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(CHANGEPASSWORD_REQUEST)
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${USER_API_BASE}/user/changepassword`, data: payload, method: 'POST' })
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
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit(LOGOUT_REQUEST)
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({url: `${USER_API_BASE}/auth/logout`, data: {}, method: 'POST'})
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
