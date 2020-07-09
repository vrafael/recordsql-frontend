import fetchApiRPC from 'src/common/service.api.rpc'

export default {
  state: {
    record: null
  },
  getters: {
    RECORD_GET: (state) => {
      return state.record
    }
  },
  mutations: {
    RECORD_UPDATE (state, response) {
      state.record = response
    }
  },
  actions: {
    async RECORD_FETCH (context, params) {
      const response = await fetchApiRPC('Dev.RecordGet', params)
      if (response && response.length > 0) {
        const _record = response[0]
        context.commit('RECORD_UPDATE', _record)
      } else {
        context.commit('RECORD_UPDATE', null)
      }
    }
  }
}
