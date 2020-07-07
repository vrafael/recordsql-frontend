import fetchApiRPC from 'src/common/service.api.rpc'

export default {
  state: {
    typeMetadata: []
  },
  getters: {
    TYPE_METADATA_GET: (state) => {
      return state.typeMetadata
    }
  },
  mutations: {
    TYPE_METADATA_UPDATE (state, response) {
      state.typeMetadata = response
    }
  },
  actions: {
    async TYPE_METADATA_FETCH (context, TypeID = 0) {
      const response = await fetchApiRPC('Dev.TypeMetadata', {
        TypeID
      })
      context.commit('TYPE_METADATA_UPDATE', response)
    }
  }
}
