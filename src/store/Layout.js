export default {
  namespaced: true,
  state: {
    links: [{
      label: 'Home',
      icon: 'mdi-home',
      link: '/',
      separator: true
    },
    {
      label: 'Types',
      icon: 'mdi-puzzle',
      link: '/type',
      separator: false
    },
    {
      label: 'Records',
      icon: 'mdi-database',
      link: '/record/Test',
      separator: false
    }
    ]
  },
  getters: {
    MENU_GET (state) {
      return state.links
    }
  }
}
