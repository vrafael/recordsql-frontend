export default {
  namespaced: true,
  state: {
    links: [{
      label: 'Home',
      icon: 'home',
      link: '/',
      separator: true
    },
    {
      label: 'Types',
      icon: 'border_all',
      link: '/type',
      separator: false
    },
    {
      label: 'Records',
      icon: 'public',
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
