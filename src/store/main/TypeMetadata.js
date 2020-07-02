import { fetchApiRPC } from 'src/common/service.api.rpc'

export default {
  state: {
    typeMetaDataArr: [],
  },
  getters: {
    getMetaDataArr: (state) => {
      return state.typeMetaDataArr
    }
  },
  mutations: {
    updateTypeMetaDataArr(state, response) {
      state.typeMetaDataArr = response
    }
  },
  actions: {
    async fetchTypeMetaDataArr(context, {TypeID = '1'}) {
      const response = await fetchApiRPC('Dev.TypeMetadata', {TypeID: typeID})
      context.commit('updateTypeListArr', response)
    },
  }
}
