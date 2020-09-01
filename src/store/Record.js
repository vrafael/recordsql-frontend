import fetchApiRPC from 'src/common/service.api.rpc'
import { Notify } from 'quasar'

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
      return state.record._transitions
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
    }
  },
  actions: {
    async RECORD_FETCH (context, params) {
      context.commit('RECORD_LOADING_SET', true)
      await fetchApiRPC('Dev.RecordGet', params)
        .then(response => {
          if (response && response.length > 0) {
            context.commit('RECORD_UPDATE', response[0])
          } else {
            context.commit('RECORD_UPDATE', null)
            Notify.create({ type: 'negative', message: 'Запись не найдена!' })
            this.$router.push('/404')
          }
        }).catch(error => Notify.create(error))
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

      const inputs = context.rootGetters.TYPE_METADATA_INPUTS_GET,
        set = {}

      inputs.forEach(input => {
        if (input.componentInput) {
          if (input.componentInput.format) {
            set[input.Tag] = input.componentInput.format(context.state.record[input.Tag])
          } else {
            set[input.Tag] = context.state.record[input.Tag]
          }
        }
      })

      const params = { TypeTag: typeTag, Set: set }

      context.commit('RECORD_LOADING_SET', true)
      await fetchApiRPC('Dev.RecordSet', params)
        .then(response => {
          if (response && response.length > 0) {
            const record = response[0]
            if (context.state.recordOrigin && !context.state.recordOrigin[identifier]) {
              this.$router.replace({ name: 'record', params: { typeTag: record._record.TypeTag, identifier: record._record.Identifier } })
            }
            context.commit('RECORD_UPDATE', record)
          } else {
            context.commit('RECORD_LOADING_SET', false)
            Notify.create({ type: 'negative', message: 'Не удалось сохранить запись!' })
          }
        }).catch(error => {
          context.commit('RECORD_LOADING_SET', false)
          console.log(error.message)
          Notify.create(error)
        })
    },
    async RECORD_DELETE (context) {
      const typeTag = context.rootGetters.TYPE_METADATA_TYPETAG_GET
      const identifier = context.rootGetters.TYPE_METADATA_IDENTIFIER_GET
      const params = { TypeTag: typeTag, Identifier: context.state.record[identifier] }
      await fetchApiRPC('Dev.RecordDel', params)
        .then(() => {
          Notify.create({ type: 'positive', message: 'Запись удалена!' })
          this.$router.push({ name: 'home' })
        })
    },
    async RECORD_RESET_STATE_TO_ORIGIN (context) {
      context.commit('RECORD_RESET_TO_ORIGIN')
    },
    async TRANSITION_PUSH (context, params) {
      await fetchApiRPC('Dev.ObjectTransitionPush', { ID: params.ID, TransitionID: params.TransitionID })
        .then(() => {
          context.dispatch('RECORD_FETCH', { TypeTag: params.TypeTag, Identifier: params.ID })
          Notify.create({ type: 'positive', message: `Переход "${params.TransitionName}" выполнен успешно.` })
        })
        .catch(error => {
          Notify.create(error)
        })
    }
  }
}
