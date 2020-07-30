const routes = [{
  path: '/',
  component: () => import('layouts/rMainLayout.vue'),
  children: [{
    path: '',
    name: 'home',
    component: () => import('pages/rHome.vue')
  },
  {
    path: '/type/:typeTag([a-zA-Z0-9]+)?',
    name: 'type',
    component: () => import('pages/rType.vue'),
    props: (route) => ({
      typeID: parseInt(route.params.typeID),
      typeTag: route.params.typeTag
    })
  },
  {
    path: '/record/:typeTag([a-zA-Z0-9]+)/:id(\\d+)?',
    name: 'record',
    component: () => import('pages/rRecord.vue'),
    props: (route) => ({
      id: parseInt(route.params.id),
      typeTag: route.params.typeTag
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
