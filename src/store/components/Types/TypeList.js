import fetchApiRPC from 'src/common/service.api.rpc'

export default {
  state: {
    typeList: []
  },
  getters: {
    TYPE_LIST_GET: (state) => {
      return state.typeList
    }
  },
  mutations: {
    TYPE_LIST_UPDATE (state, response) {
      state.typeList = response
    }
  },
  actions: {
    async TYPE_LIST_FETCH ({
      commit
    }) {
      const response = await fetchApiRPC('Dev.TypeList')
      commit('TYPE_LIST_UPDATE', response)
    }
  }
}
