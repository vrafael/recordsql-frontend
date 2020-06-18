
const routes = [
  {
    path: '/records', redirect: '/records/fields'
  },
  {
    path: '/',
    component: () => import('layouts/rLayout.vue'),
    children: [
      { path: '', component: () => import('pages/rHome.vue') },
      { path: '/types', component: () => import('pages/rTypes.vue') },
      { path: '/records', component: () => import('pages/rRecords.vue') },
    ]
  },
  {
    path: '/records',
    component: () => import('layouts/rLayout.vue'),
    children: [
      { path: 'fields', component: () => import('components/Records/Fields/rFields') },
      { path: 'relations', component: () => import('components/Records/Relations/rRelations') },
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
