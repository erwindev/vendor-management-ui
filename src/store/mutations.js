import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  REG_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  ERROR,
  SUCCESS
} from './mutation-types'

export const userMutations = {
  [AUTH_REQUEST] (state) {
    state.status = 'authenticating'
  },
  [AUTH_SUCCESS] (state, payload) {
    state.status = 'success'
    state.token = payload.token
    state.user = payload
  },
  [REG_REQUEST] (state) {
    state.status = 'registering'
  },
  [LOGOUT_REQUEST] (state) {
    state.status = 'logging out'
  },
  [LOGOUT_SUCCESS] (state) {
    state.status = null
    state.token = null
    state.user = null
  },
  [SUCCESS] (state) {
    state.status = 'success'
  },
  [ERROR] (state) {
    state.status = 'error'
  }
}
