export default {
  state: {
    filter: null,
    filterOrigin: null,
    isValidationErrorActive: false
  },
  getters: {
    FILTER_GET: (state) => {
      return state.filter
    },
    FILTER_ORIGIN_GET: (state) => {
      return state.filterOrigin
    },
    GET_VALIDATION_ERRORS_FLAG: (state) => {
      return state.isValidationErrorActive
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
    },
    CHANGE_FILTERS_VALIDATION_ERROR_FLAG (state, response) {
      state.isValidationErrorActive = response
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
    },
    async FILTERS_VALIDATION_ERROR_FLAG_INIT (context, payload) {
      context.commit('CHANGE_FILTERS_VALIDATION_ERROR_FLAG', payload)
    }
  }
}
