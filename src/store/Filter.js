export default {
  state: {
    filter: null,
    filterOrigin: null
  },
  getters: {
    FILTER_GET: (state) => {
      return state.filter
    },
    FILTER_ORIGIN_GET: (state) => {
      return state.filterOrigin
    },
    FILTER_COMPARE_STATE: (state) => {
      const localState = JSON.stringify(state.filter)
      const originState = JSON.stringify(state.filterOrigin)
      return localState === originState
    }
  },
  mutations: {
    FILTER_UPDATE (state, response) {
      state.filter = { ...response }
      state.filterOrigin = { ...response }
    },
    FILTER_UPDATE_ON_CHANGE (state, response) {
      for (const fieldItem in response) {
        state.filter[fieldItem] = response[fieldItem]
      }
    }
  },
  actions: {
    async FILTER_STATE_UPDATE_FIELD (context, payload) {
      if (payload) {
        context.commit('FILTER_UPDATE_ON_CHANGE', payload)
      }
    },
    async FILTER_STATE_INIT (context, payload) {
      context.commit('FILTER_UPDATE', payload)
    }
  }
}
