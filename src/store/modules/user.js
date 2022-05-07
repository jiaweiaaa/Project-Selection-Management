import { getToken, getAdmin } from '@/utils/auth'
import cookies from 'js-cookie'

const state = {
    token: getToken(),
    admin: getAdmin(),
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ADMIN: (state, admin) => {
        state.admin = admin
    }

}

const actions = {
    login({ commit }, {token, currentAdmin}) {
        commit('SET_TOKEN', token)
        commit('SET_ADMIN', currentAdmin)
    },
    logout({ commit }) {
        commit('SET_TOKEN', '')
        commit('SET_ADMIN', {})
    }
}
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }