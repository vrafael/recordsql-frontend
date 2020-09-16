import fetchApiRPC from 'src/common/service.api.rpc'
import { Notify } from 'quasar'

export default {
  state: {
    typeList: []
  },
  getters: {
    TYPE_LIST_GET (state) {
      return state.typeList
    },
    TYPE_LIST_NESTED_GET (state) {
      const typesParser = (ownerID) => {
        return state.typeList
          .filter(type => type.OwnerID === ownerID)
          .map(type => ({
            ...type,
            children: typesParser(type.ID)
          }))
      }
      return [typesParser(null)]
    }
  },
  mutations: {
    TYPE_LIST_UPDATE (state, response) {
      state.typeList = response
    }
  },
  actions: {
    async TYPE_LIST_FETCH ({ commit }) {
      await fetchApiRPC('Dev.TypeList')
        .then(response => {
          response.map(item => {
            item.OwnerID = Object.prototype.hasOwnProperty.call(item, 'OwnerID') ? item.OwnerID : null
          })
          commit('TYPE_LIST_UPDATE', response)
        }).catch(err => Notify.create({ type: err.type, message: err.message, timeout: err.timeout }))
    }
  }
}
