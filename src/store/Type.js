import fetchApiRPC from 'src/common/service.api.rpc'

export default {
  state: {
    typeList: []
  },
  getters: {
    TYPE_LIST_GET (state) {
      return state.typeList
    },
    TYPE_LIST_NESTED_GET (state) {
      const typeList = state.typeList
      const filteredArr = typeList.map((item) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!item.hasOwnProperty('OwnerID')) {
          // eslint-disable-next-line no-return-assign
          return {
            ...item,
            OwnerID: null
          }
        } else {
          return {
            ...item
          }
        }
      })
      const typesParser = (ownerID) => {
        return filteredArr
          .filter(type => type.OwnerID === ownerID)
          .map(type => {
            return ({
              ...type,
              children: typesParser(type.ID)
            })
          })
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
          commit('TYPE_LIST_UPDATE', response)
        })
    }
  }
}
