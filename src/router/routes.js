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
      typeTag: route.params.typeTag
    })
  },
  {
    path: '/record/:typeTag([a-zA-Z0-9]+)/:identifier(\\d+)?',
    name: 'record',
    component: () => import('pages/rRecord.vue'),
    props: (route) => ({
      identifier: route.params.identifier ? parseInt(route.params.identifier) : null,
      typeTag: route.params.typeTag
    })
  }]
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/r404.vue')
  })
}

export default routes
