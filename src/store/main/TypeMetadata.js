import { fetchApiRPC } from 'src/common/service.api.rpc'

export default {
  state: {
    TYPE_METADATA: []
  },
  getters: {
    TYPE_METADATA_GET: (state) => {
      return state.TYPE_METADATA
    }
  },
  mutations: {
    TYPE_METADATA_UPDATE (state, response) {
      state.TYPE_METADATA = response
    }
  },
  actions: {
    async TYPE_METADATA_FETCH (context, TypeID = 0) {
      const response = await fetchApiRPC('Dev.TypeMetadata', { TypeID: TypeID })
      context.commit('TYPE_METADATA_UPDATE', response)
    }
  }
}
