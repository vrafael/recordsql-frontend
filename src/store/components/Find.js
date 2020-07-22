import fetchApiRPC from 'src/common/service.api.rpc'

export default {
  state: {
    find: [],
    loading: false,
    pageSize: 30,
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
      const _pageNumber = 1

      context.commit('FIND_PAGENUMBER_RESET')

      const _params = {
        ...params,
        PageSize: context.state.pageSize,
        PageNumber: _pageNumber
      }

      const _response = await fetchApiRPC('Dev.RecordFind', _params)

      if (_response) {
        context.commit('FIND_UPDATE', _response)
      } else {
        context.commit('FIND_UPDATE', [])
      }
    },
    async FIND_FETCH_NEXT (context, params) {
      if (!context.state.isEOF) {
        const _pageNumber = context.state.pageNumber + 1
        context.commit('FIND_LOADING_SET', true)
        context.commit('FIND_PAGENUMBER_NEXT')

        const _params = {
          ...params,
          PageSize: context.state.pageSize,
          PageNumber: _pageNumber
        }

        const _response = await fetchApiRPC('Dev.RecordFind', _params)

        if (_response) {
          context.commit('FIND_APPEND', _response)
        }
      }
    }
  }
}
