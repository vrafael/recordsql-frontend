import fetchApiRPC from 'src/common/service.api.rpc'
import fieldsMapping from './helpers/fieldsMapping'
import { Notify } from 'quasar'

export default {
  state: {
    typeMetadata: {},
    typeTag: null,
    loading: false
  },
  getters: {
    TYPE_METADATA_GET: (state) => {
      return state.typeMetadata
    },
    TYPE_METADATA_LOADING_STATE_GET: (state) => {
      return state.loading
    },
    TYPE_METADATA_INPUTS_GET: (state) => {
      return state.typeMetadata.Fields ? state.typeMetadata.Fields.filter(field => field.componentInput && field.componentInput.component) : null
    },
    TYPE_METADATA_IDENTIFIER_GET: (state) => {
      if (state.typeMetadata.Fields) {
        const _field = state.typeMetadata.Fields.find(field => field.Type.Tag === 'FieldIdentifier')
        if (_field) {
          return _field.Tag
        }
      }
      return null
    },
    TYPE_METADATA_TYPETAG_GET: (state) => {
      return state.typeTag
    },
    TYPE_METADATA_HAS_OBJECT_PROPERTY: (state) => {
      return Object.prototype.hasOwnProperty.call(state.typeMetadata, 'Object') && state.typeMetadata.Object === true
    }
  },
  mutations: {
    TYPE_METADATA_UPDATE (state, { typeTag, typeMetadata }) {
      state.typeTag = typeTag
      state.typeMetadata = typeMetadata
      state.loading = false
    },
    TYPE_METADATA_LOADING_SET (state, value) {
      state.loading = value
    },
    TYPE_METADATA_TYPETAG_SET (state, value) {
      state.typeTag = value
    }
  },
  actions: {
    async TYPE_METADATA_FETCH (context, params) {
      context.commit('TYPE_METADATA_LOADING_SET', true)
      await fetchApiRPC('Dev.TypeMetadata', { TypeTag: params.TypeTag })
        .then(response => {
          const typeMetadata = response[0]
          typeMetadata.Fields.map(fieldsMapping)
          context.commit('TYPE_METADATA_UPDATE', { typeMetadata, typeTag: params.TypeTag })
          context.commit('TYPE_METADATA_TYPETAG_SET', params.TypeTag)
        }).catch(error => {
          context.commit('TYPE_METADATA_UPDATE', { typeMetadata: {}, typeTag: null })
          Notify.create(error)
        })
    },
    async TYPE_METADATA_FETCH_WITH_RECORD_INIT (context, params) {
      context.commit('TYPE_METADATA_LOADING_SET', true)
      await fetchApiRPC('Dev.TypeMetadata', params)
        .then(response => {
          const typeMetadata = response[0]
          typeMetadata.Fields.map(fieldsMapping)
          const emptyRecord = {}
          typeMetadata.Fields.forEach((field) => {
            emptyRecord[field.Tag] = null
          })
          context.dispatch('RECORD_STATE_INIT', emptyRecord, { root: true })
          context.commit('TYPE_METADATA_UPDATE', { typeMetadata, typeTag: params.TypeTag })
        }).catch(error => {
          context.dispatch('RECORD_STATE_INIT', null, { root: true })
          context.commit('TYPE_METADATA_UPDATE', { typeMetadata: {}, typeTag: null })
          Notify.create(error)
        })
    }
  }
}
