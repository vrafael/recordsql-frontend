import fetchApiRPC from 'src/common/service.api.rpc'
import fieldsMapping from './helpers/fieldsMapping'

export default {
  state: {
    typeMetadata: {},
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
    }
  },
  mutations: {
    TYPE_METADATA_UPDATE (state, response) {
      state.typeMetadata = response
      state.loading = false
    },
    TYPE_METADATA_LOADING_SET (state, value) {
      state.loading = value
    }
  },
  actions: {
    async TYPE_METADATA_FETCH (context, params) {
      context.commit('TYPE_METADATA_LOADING_SET', true)
      const response = await fetchApiRPC('Dev.TypeMetadata', params)
      if (response && response.length > 0) {
        const metadata = response[0]

        metadata.Fields.map(fieldsMapping)
        context.commit('TYPE_METADATA_UPDATE', metadata)
      } else {
        context.commit('TYPE_METADATA_UPDATE', {})
      }
    },
    async TYPE_METADATA_FETCH_WITH_RECORD_INIT (context, params) {
      const response = await fetchApiRPC('Dev.TypeMetadata', params)
      if (response && response.length > 0) {
        const metadata = response[0]
        metadata.Fields.map(fieldsMapping)
        const emptyRecord = {}
        metadata.Fields.forEach((field) => {
          emptyRecord[field.Tag] = null
        })
        context.dispatch('RECORD_STATE_INIT', emptyRecord, { root: true })
        context.commit('TYPE_METADATA_UPDATE', metadata)
      } else {
        context.dispatch('RECORD_STATE_INIT', null, { root: true })
        context.commit('TYPE_METADATA_UPDATE', {})
      }
    },
    async TYPE_METADATA_FETCH_WITH_FILTER_INIT (context, params) {
      const response = await fetchApiRPC('Dev.TypeMetadata', params)
      if (response && response.length > 0) {
        const metadata = response[0]
        metadata.Fields.map(fieldsMapping)

        const emptyFilters = {}
        metadata.Fields
          .filter(field => Object.prototype.hasOwnProperty.call(field, 'componentFilter') && Object.prototype.hasOwnProperty.call(field.componentFilter, 'empty'))
          .forEach(field => {
            emptyFilters[field.Tag] = field.componentFilter.empty
          })

        context.dispatch('FILTER_STATE_INIT', emptyFilters, { root: true })
        context.dispatch('FIND_FETCH', { TypeTag: params.TypeTag }, { root: true })
        context.commit('TYPE_METADATA_UPDATE', metadata)
      } else {
        context.dispatch('FILTER_STATE_INIT', null, { root: true })
        context.commit('TYPE_METADATA_UPDATE', {})
      }
    }
  }
}
