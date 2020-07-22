import fetchApiRPC from 'src/common/service.api.rpc'

async function TYPE_LIST_FETCH ({ commit }) {
  const response = await fetchApiRPC('Dev.TypeList')
  commit('TYPE_LIST_UPDATE', response)
}

export default {
  TYPE_LIST_FETCH
}
