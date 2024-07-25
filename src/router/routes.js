const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/home' }, // Redirect to home
      { path: 'home', component: () => import('pages/HomePage.vue') },
      { path: 'vision', component: () => import('pages/VisionPage.vue') },
      { path: 'recipes', component: () => import('pages/RecipePage.vue') },
      { path: 'recipe/:id', component: () => import('pages/RecipeDetails.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') }
    ]
  },

  // Catch-all route for 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes;
