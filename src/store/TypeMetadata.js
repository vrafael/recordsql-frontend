import fetchApiRPC from 'src/common/service.api.rpc'
import fieldMapping from './helpers/FieldMapping'
import showNotify from 'src/common/service.notify'

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
      return state.typeMetadata.Fields ? state.typeMetadata.Fields.filter(field => field.componentInput) : null
    },
    TYPE_METADATA_FILTERS_GET: (state) => {
      return state.typeMetadata.Fields ? state.typeMetadata.Fields.filter(field => field.componentFilter) : null
    },
    TYPE_METADATA_COLUMNS_GET: (state) => {
      if (state.typeMetadata.Fields) {
        const _columns = state.typeMetadata.Fields.filter(field => field.componentColumn)
        if (_columns.length > 0) {
          return _columns.map(field => field.componentColumn)
        }
      }
      return []
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
    }
  },
  mutations: {
    TYPE_METADATA_UPDATE (state, response) {
      state.typeMetadata = response
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
      await fetchApiRPC('Dev.TypeMetadata', params)
        .then(response => {
          const metadata = response[0]
          metadata.Fields.map(fieldMapping)
          context.commit('TYPE_METADATA_UPDATE', metadata)
          context.commit('TYPE_METADATA_TYPETAG_SET', params.TypeTag)
        }).catch(error => {
          context.commit('TYPE_METADATA_UPDATE', {})
          context.commit('TYPE_METADATA_TYPETAG_SET', null)
          showNotify(error)
        })
    },
    async TYPE_METADATA_FETCH_WITH_RECORD_INIT (context, params) {
      context.commit('TYPE_METADATA_LOADING_SET', true)
      await fetchApiRPC('Dev.TypeMetadata', params)
        .then(response => {
          const metadata = response[0]
          metadata.Fields.map(fieldMapping)
          const emptyRecord = {}
          metadata.Fields.forEach((field) => {
            emptyRecord[field.Tag] = null
          })
          context.dispatch('RECORD_STATE_INIT', emptyRecord, { root: true })
          context.commit('TYPE_METADATA_UPDATE', metadata)
          context.commit('TYPE_METADATA_TYPETAG_SET', params.TypeTag)
        }).catch(error => {
          context.dispatch('RECORD_STATE_INIT', null, { root: true })
          context.commit('TYPE_METADATA_UPDATE', {})
          context.commit('TYPE_METADATA_TYPETAG_SET', null)
          showNotify(error)
        })
    }
  }
}
