import fetchApiRPC from 'src/common/service.api.rpc'

export default {
  state: {
    record: null,
    recordOrigin: null
  },
  getters: {
    RECORD_GET: (state) => {
      return state.record
    },
    RECORD_ORIGIN_GET: (state) => {
      return state.recordOrigin
    },
    RECORD_COMPARE_STATE: (state) => {
      const localState = JSON.stringify(state.record)
      const originState = JSON.stringify(state.recordOrigin)
      return localState === originState
    }
  },
  mutations: {
    RECORD_UPDATE (state, response) {
      state.record = { ...response }
      state.recordOrigin = { ...response }
    },
    RECORD_UPDATE_ON_CHANGE (state, response) {
      for (const fieldItem in response) {
        state.record[fieldItem] = response[fieldItem]
      }
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
    async RECORD_STATE_UPDATE_FIELD (context, payload) {
      if (payload) {
        context.commit('RECORD_UPDATE_ON_CHANGE', payload)
      }
    },
    async RECORD_STATE_INIT (context, payload) {
      context.commit('RECORD_UPDATE', payload)
    }
  }
}
