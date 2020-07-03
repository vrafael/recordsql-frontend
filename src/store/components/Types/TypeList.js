import { fetchApiRPC } from 'src/common/service.api.rpc'

export default {
  state: {
    TYPE_LIST: []
  },
  getters: {
    TYPE_LIST_GET: (state) => {
      return state.TYPE_LIST
    }
  },
  mutations: {
    TYPE_LIST_UPDATE (state, response) {
      state.TYPE_LIST = response
    }
  },
  actions: {
    async TYPE_LIST_FETCH ({ commit }) {
      const response = await fetchApiRPC('Dev.TypeList')
      commit('TYPE_LIST_UPDATE', response)
    }
  }
}
