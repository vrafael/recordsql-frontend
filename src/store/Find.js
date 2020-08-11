import fetchApiRPC from 'src/common/service.api.rpc'
import showNotify from 'src/common/service.notify'

export default {
  state: {
    find: [],
    loading: false,
    pageSize: 50,
    pageNumber: 1,
    isEOF: false // достигнут конец списка
  },
  getters: {
    FIND_GET: (state) => {
      return state.find
    },
    FIND_LOADING_STATE_GET: (state) => {
      return state.loading
    },
    FIND_LENGTH_GET: (state) => {
      return state.find.length
    },
    FIND_EOF_GET: (state) => {
      return state.isEOF
    }
  },
  mutations: {
    FIND_UPDATE (state, response) {
      state.find = response
      state.loading = false
      state.isEOF = response.length < state.pageSize
    },
    FIND_APPEND (state, array) {
      state.find = state.find.concat(array)
      state.loading = false
      state.isEOF = array.length < state.pageSize
    },
    FIND_LOADING_SET (state, value) {
      state.loading = value
    },
    FIND_PAGENUMBER_RESET (state, value) {
      state.pageNumber = 1
    },
    FIND_PAGENUMBER_NEXT (state) {
      state.pageNumber++
    }
  },
  actions: {
    async FIND_FETCH (context, params) {
      context.commit('FIND_PAGENUMBER_RESET')

      const paramsWithPaging = {
        ...params,
        PageSize: context.state.pageSize,
        PageNumber: 1
      }

      await fetchApiRPC('Dev.RecordFind', paramsWithPaging)
        .then(response => {
          context.commit('FIND_UPDATE', response)
        }).catch(error => {
          context.commit('FIND_UPDATE', [])
          showNotify(error)
        })
    },
    async FIND_FETCH_NEXT (context, params) {
      if (!context.state.isEOF) {
        const pageNumber = context.state.pageNumber + 1
        context.commit('FIND_LOADING_SET', true)
        context.commit('FIND_PAGENUMBER_NEXT')

        const paramsWithPaging = {
          ...params,
          PageSize: context.state.pageSize,
          PageNumber: pageNumber
        }

        await fetchApiRPC('Dev.RecordFind', paramsWithPaging)
          .then(response => {
            context.commit('FIND_APPEND', response)
          })
      }
    }
  }
}
