import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import {userMutations} from './mutations'
import {userActions} from './actions'
import {userInfoGetters} from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    status: '',
    token: localStorage.getItem('jwt') || '',
    user: {},
    dashboadScreen: ''
  },
  plugins: [createPersistedState()],
  mutations: Object.assign({}, userMutations),
  actions: Object.assign({}, userActions),
  getters: Object.assign({}, userInfoGetters)
})
