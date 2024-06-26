import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      bio: '',
      photo: '',
      permission: ''
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        console.log({ data })
        const {
          id,
          name,
          email,
          bio,
          permission,
          photo,
          Idols,
          Fans
        } = data.user

        commit('setCurrentUser', {
          id,
          name,
          email,
          bio,
          photo,
          permission,
          Idols,
          Fans
        })
        return true
      } catch (error) {
        console.log(error.message)
        commit('revokeAuthentication')
        return false
      }
    }
  }
})
