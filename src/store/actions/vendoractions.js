import axios from 'axios'
import {VENDOR_API_BASE} from '../../config'

import {
  ERROR,
  SUCCESS
} from '../mutation-types'

export const vendorActions = {
  addVendor ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${VENDOR_API_BASE}/vendor`, data: payload, method: 'POST' })
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
  getVendor ({ commit }, vendorId) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${VENDOR_API_BASE}/vendor/${vendorId}`, method: 'GET' })
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
  updateVendor ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${VENDOR_API_BASE}/vendor`, data: payload, method: 'PUT' })
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
  getAllVendor ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${VENDOR_API_BASE}/vendor`, method: 'GET' })
        .then(resp => {
          commit(SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  }
}
