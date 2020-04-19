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

export const userMutations = {
  [AUTH_REQUEST] (state) {
    state.status = 'authenticating'
  },
  [AUTH_SUCCESS] (state, token) {
    state.status = 'success'
    state.token = token
  },
  [REG_REQUEST] (state) {
    state.status = 'registering'
  },
  [LOGOUT_REQUEST] (state) {
    state.status = 'logging out'
  },
  [LOGOUT_SUCCESS] (state) {
    state.status = 'success'
    state.token = ''
    state.user = {}
  },
  [SAVE_USER] (state, user) {
    state.user = user
  },
  [SUCCESS] (state) {
    state.status = 'success'
  },
  [ERROR] (state) {
    state.status = 'error'
  }
}
