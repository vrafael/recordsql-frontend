import fetchApiRPC from 'src/common/service.api.rpc'
import showNotify from 'src/common/service.notify'
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
    },
    RECORD_RESET_TO_ORIGIN (state) {
      state.record = { ...state.recordOrigin }
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
    },
    async RECORD_UPLOAD (context, params) {
      const obj = { Set: params }
      JSON.stringify(obj)
      const response = await fetchApiRPC('Dev.RecordSet', obj)
      if (response && Object.keys(response).length !== 0 && response.constructor === Object) {
        context.dispatch('RECORD_FETCH', { TypeTag: 'Test', ID: response.ID })
      } else {
        showNotify({
          errorMessage: 'Response object not exists or equals to zero or it is not object.',
          displayTimeMS: 5000
        })
      }
    },
    async RECORD_DELETE (context, params) {
      // console.log('on delete')
      // const obj = {  }
      // await fetchApiRPC('Dev.RecordDel', )
    },
    async RECORD_RESET_STATE_TO_ORIGIN (context) {
      context.commit('RECORD_RESET_TO_ORIGIN')
    }
  }
}
