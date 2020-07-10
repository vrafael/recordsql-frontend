import fetchApiRPC from 'src/common/service.api.rpc'

export default {
  state: {
    typeMetadata: {}
  },
  getters: {
    TYPE_METADATA_GET: (state) => {
      return state.typeMetadata
    },
    TYPE_METADATA_INPUTS_GET: (state) => {
      return state.typeMetadata.Fields ? state.typeMetadata.Fields.filter(field => field.componentInput) : {}
    }
  },
  mutations: {
    TYPE_METADATA_UPDATE (state, response) {
      state.typeMetadata = response
    }
  },
  actions: {
    async TYPE_METADATA_FETCH (context, params) {
      const response = await fetchApiRPC('Dev.TypeMetadata', params)
      if (response && response.length > 0) {
        const metadata = response[0]
        metadata.Fields.map(field => {
          switch (field.Type.Tag) {
            case 'FieldLink':
            case 'FieldLinkToType':
              field.componentInput = 'r-input-link'
              break
            case 'FieldText':
              field.componentInput = 'r-input-text'
              break
            case 'FieldString':
              field.componentInput = 'r-input-string'
              break
            case 'FieldMoney':
              field.componentInput = 'r-input-money'
              break
            case 'FieldBigint':
              field.componentInput = 'r-input-bigint'
              break
            case 'FieldInt':
              field.componentInput = 'r-input-int'
              break
            case 'FieldFloat':
              field.componentInput = 'r-input-float'
              break
            case 'FieldIdentifier':
              field.componentInput = 'r-input-identifier'
              break
            case 'FieldTime':
              field.componentInput = 'r-input-time'
              break
            case 'FieldDatetime':
              field.componentInput = 'r-input-datetime'
              break
            case 'FieldDate':
              field.componentInput = 'r-input-date'
              break
            case 'FieldColor':
              field.componentInput = 'r-input-color'
              break
            case 'FieldBool':
              field.componentInput = 'r-input-bool'
              break
          }
        })
        context.commit('TYPE_METADATA_UPDATE', metadata)
      } else {
        context.commit('TYPE_METADATA_UPDATE', {})
      }
    }
  }
}
