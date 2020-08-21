import fetchApiRPC from 'src/common/service.api.rpc'
import showNotify from 'src/common/service.notify'

export default {
  state: {
    record: null,
    recordOrigin: null,
    loading: true,
    recordTransitions: null,
    recordTransitionsLoading: false
  },
  getters: {
    RECORD_GET: (state) => {
      return state.record
    },
    RECORD_ORIGIN_GET: (state) => {
      return state.recordOrigin
    },
    RECORD_LOADING_GET: (state) => {
      return state.loading
    },
    RECORD_TRANSITION_LIST_GET: (state) => {
      return state.recordTransitions
    },
    RECORD_TRANSITION_LOADING_GET: (state) => {
      return state.recordTransitionsLoading
    }
  },
  mutations: {
    RECORD_UPDATE (state, response) {
      state.record = { ...response }
      state.recordOrigin = { ...response }
      state.loading = false
    },
    RECORD_UPDATE_ON_CHANGE (state, response) {
      for (const fieldItem in response) {
        state.record[fieldItem] = response[fieldItem]
      }
    },
    RECORD_RESET_TO_ORIGIN (state) {
      state.record = { ...state.recordOrigin }
    },
    RECORD_LOADING_SET (state, value) {
      state.loading = value
    },
    RECORD_TRANSITION_LIST_SET (state, value) {
      state.recordTransitions = value
      state.recordTransitionsLoading = false
    },
    RECORD_TRANSITION_LOADING_SET (state, value) {
      state.recordTransitionsLoading = value
    }
  },
  actions: {
    async RECORD_FETCH (context, params) {
      context.commit('RECORD_LOADING_SET', true)
      const response = await fetchApiRPC('Dev.RecordGet', params)
      if (response) {
        context.commit('RECORD_UPDATE', response)
      } else {
        context.commit('RECORD_UPDATE', null)
        showNotify({
          message: 'Запись не найдена!'
        })
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
    async RECORD_UPLOAD (context) {
      const typeTag = context.rootGetters.TYPE_METADATA_TYPETAG_GET
      const identifier = context.rootGetters.TYPE_METADATA_IDENTIFIER_GET
      const params = { TypeTag: typeTag, Set: context.state.record }
      await fetchApiRPC('Dev.RecordSet', params)
        .then(response => {
          if (response && Object.keys(response).length !== 0 && response.constructor === Object) {
            context.dispatch('RECORD_FETCH', { TypeTag: typeTag, Identifier: response[identifier] })
          }
        })
    },
    async RECORD_DELETE (context) {
      const typeTag = context.rootGetters.TYPE_METADATA_TYPETAG_GET
      const identifier = context.rootGetters.TYPE_METADATA_IDENTIFIER_GET
      const params = { TypeTag: typeTag, Identifier: context.state.record[identifier] }
      await fetchApiRPC('Dev.RecordDel', params)
        .then(() => {
          showNotify({ message: 'Запись удалена!' })
          this.$router.push({ name: 'home' })
        })
    },
    async RECORD_RESET_STATE_TO_ORIGIN (context) {
      context.commit('RECORD_RESET_TO_ORIGIN')
    },
    async TRANSITION_LIST_FETCH (context, payload) {
      if (payload.ID) {
        context.commit('RECORD_TRANSITION_LOADING_SET', true)
        await fetchApiRPC('Dev.ObjectTransitionList', { ID: payload.ID })
          .then((response) => {
            context.commit('RECORD_TRANSITION_LIST_SET', response)
          })
      } else {
        showNotify({ message: 'Не найден идентификатор.' })
      }
    },
    async TRANSITION_PUSH (context, params) {
      await fetchApiRPC('Dev.ObjectTransitionPush', { ID: params.ID, TransitionID: params.TransitionID })
        .then(() => {
          context.dispatch('TRANSITION_LIST_FETCH', { ID: params.ID })
          context.dispatch('RECORD_FETCH', { TypeTag: params.TypeTag, Identifier: params.ID })
          showNotify({ message: `Переход "${params.TransitionName}" выполнен успешно.` })
        })
        .catch(error => {
          showNotify(error)
        })
    }
  }
}
