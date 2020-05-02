import axios from 'axios'
import {ATTACHMENT_API_BASE} from '../../config'

import {
  ERROR,
  SUCCESS
} from '../mutation-types'

export const attachmentActions = {
  addAttachment ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${ATTACHMENT_API_BASE}/attachment`, data: payload, method: 'POST' })
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
  getAllAttachment ({ commit }, attachmentId, attachmentTypeId) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${ATTACHMENT_API_BASE}/attachment/${attachmentId}/${attachmentTypeId}`, method: 'GET' })
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
  getAttachment ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${ATTACHMENT_API_BASE}/attachment/${id}`, method: 'GET' })
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
  updateAttachment ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${ATTACHMENT_API_BASE}/attachment/${payload.id}`, data: payload, method: 'PUT' })
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
  deleteAttachment ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${ATTACHMENT_API_BASE}/attachment/${id}`, method: 'DELETE' })
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
