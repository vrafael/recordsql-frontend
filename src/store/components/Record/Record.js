import { fetchApiRPC } from 'src/common/service.api.rpc'

export default {
  state: {
    RECORD: {}
  },
  getters: {
    RECORD_GET: (state) => {
      return state.RECORD
    }
  },
  mutations: {
    RECORD_UPDATE (state, response) {
      state.RECORD = response
    }
  },
  actions: {
    async RECORD_FETCH (context, params) {
      const response = await fetchApiRPC('Dev.RecordGet', params)
      context.commit('RECORD_UPDATE', response)
    }
  }
}
