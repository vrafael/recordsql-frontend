import fetchApiRPC from 'src/common/service.api.rpc'

export default {
  state: {
    record: {}
  },
  getters: {
    RECORD_GET: (state) => {
      return state.record
    }
  },
  mutations: {
    RECORD_UPDATE(state, response) {
      state.record = response
    }
  },
  actions: {
    async RECORD_FETCH(context, params) {
      const response = await fetchApiRPC('Dev.RecordGet', params)
      context.commit('RECORD_UPDATE', response)
    }
  }
}
