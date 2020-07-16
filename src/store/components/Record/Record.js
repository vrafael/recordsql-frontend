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
    },
    RECORD_UPDATE_ON_CHANGE (state, response) {
      const [editedValue, field] = response
      state.record[field.Tag] = editedValue
    }
  },
  actions: {
    async RECORD_FETCH (context, params) {
      const response = await fetchApiRPC('Dev.RecordGet', params)
      if (response) {
        context.commit('RECORD_UPDATE', response)
      } else {
        context.commit('RECORD_UPDATE', null)
      }
    },
    async RECORD_STATE_UPDATE_INIT (context, payload) {
      const response = payload
      return response ? context.commit('RECORD_UPDATE_ON_CHANGE', response) : null
    }
  }
}
