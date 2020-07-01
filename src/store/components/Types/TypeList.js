import { fetchApiRPC } from 'src/common/service.api.rpc'

export default {
  state: {
    typeListArr: [],
  },
  getters: {
    getTypeListArr: (state) => {
      return state.typeListArr
    }
  },
  mutations: {
    updateTypeListArr(state, response) {
      state.typeListArr = response
    }
  },
  actions: {
    async fetchTypeListArr({commit}) {
      const response = await fetchApiRPC('Dev.TypeList')
      commit('updateTypeListArr', response)
    },
  }
}
