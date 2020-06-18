
const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/types', component: () => import('pages/Types.vue') },
      { path: '/records', component: () => import('pages/Records.vue') },
    ]
  },
  {
    path: '/records',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: 'fields', component: () => import('components/Records/Fields/Fields') },
      { path: 'relations', component: () => import('components/Records/Relations/Relations') },
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
