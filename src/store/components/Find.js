import fetchApiRPC from 'src/common/service.api.rpc'

export default {
  state: {
    find: []
  },
  getters: {
    FIND_GET: (state) => {
      return state.find
    }
  },
  mutations: {
    FIND_UPDATE (state, response) {
      state.find = response
    }
  },
  actions: {
    async FIND_FETCH (context, params) {
      const response = await fetchApiRPC('Dev.RecordFind', params)
      if (response) {
        context.commit('FIND_UPDATE', response)
      } else {
        context.commit('FIND_UPDATE', [])
      }
    }
  }
}
