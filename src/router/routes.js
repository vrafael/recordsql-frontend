const routes = [{
  path: '/',
  component: () => import('layouts/rMainLayout.vue'),
  children: [{
    path: '',
    name: 'home',
    component: () => import('pages/rHome.vue')
  },
  {
    path: '/types/:typeID(\\d+)?',
    name: 'types',
    component: () => import('pages/rTypes.vue'),
    props: (route) => ({
      typeID: parseInt(route.params.typeID)
    })
  },
  {
    path: '/record/:id(\\d+)',
    name: 'record',
    component: () => import('pages/rRecord.vue'),
    props: (route) => ({
      id: parseInt(route.params.id)
    })
  }
  ]
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/r404.vue')
  })
}

export default routes
