const routes = [{
  path: '/record/:id(\\d+)',
  redirect: '/record/:id/fields'
}, {
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
    }),
    children: [{
      path: 'fields',
      name: 'recordfields',
      component: () => import('components/Record/rFields'),
      props: true
    },
    {
      path: 'relations',
      name: 'recordrelations',
      component: () => import('components/Record/rRelations'),
      props: true
    }
    ]
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
