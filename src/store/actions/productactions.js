import axios from 'axios'
import {PRODUCT_API_BASE} from '../../config'

import {
  ERROR,
  SUCCESS
} from '../mutation-types'

export const productActions = {
  addProduct ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${PRODUCT_API_BASE}/product`, data: payload, method: 'POST' })
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
  getAllProduct ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${PRODUCT_API_BASE}/product`, method: 'GET' })
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
  getProduct ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${PRODUCT_API_BASE}/product/${id}`, method: 'GET' })
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
  updateProduct ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${PRODUCT_API_BASE}/product`, data: payload, method: 'PUT' })
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
