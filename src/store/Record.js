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
      // console.log('response at record update: ', response)
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
      // console.log('record fetch: ', response)
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
      console.log('response: ', response)
      // console.log('проверка: ', Object.keys(response).length === 0 && obj.constructor === Object)
      // проверяем, что объект больше нуля, преобразовывая его в массив
      // if (response && Object.keys(response).length === 0 && obj.constructor === Object) {
      //   console.log('я вызвался')
      // context.dispatch('RECORD_FETCH', { ID: response.ID })
      // }
    },
    async RECORD_DELETE (context, params) {
      // console.log('on delete')
      // const obj = {  }
      // await fetchApiRPC('Dev.RecordDel', )
    }
  }
}
