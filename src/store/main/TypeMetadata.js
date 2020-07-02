import { fetchApiRPC } from 'src/common/service.api.rpc'

export default {
  state: {
    typeMetaDataObj: [],
  },
  getters: {
    getMetaDataObj: (state) => {
      return state.typeMetaDataObj
    }
  },
  mutations: {
    updateTypeMetaDataObj(state, response) {
      state.typeMetaDataObj = response
    }
  },
  actions: {
    async fetchTypeMetaDataObj(context, TypeID = 0) {
      const response = await fetchApiRPC('Dev.TypeMetadata', { TypeID: TypeID })
      context.commit('updateTypeMetaDataObj', response)
    },
  }
}
