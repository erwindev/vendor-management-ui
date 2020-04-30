import axios from 'axios'
import {API_BASE} from '../../config'

import {
  ERROR,
  SUCCESS
} from '../mutation-types'

export const notesAction = {
  addNotes ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${API_BASE}/notes`, data: payload, method: 'POST' })
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
  getAllNotes ({ commit }, notesId, notesTypeId) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${API_BASE}/notes/${notesId}/${notesTypeId}`, method: 'GET' })
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
  getNote ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${API_BASE}/notes/${id}`, method: 'GET' })
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
  deleteNotes ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearrer ' + localStorage.getItem('jwt')
      axios({ url: `${API_BASE}/notes/${id}`, method: 'DELETE' })
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
