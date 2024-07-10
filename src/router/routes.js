const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'vision', component: () => import('pages/VisionPage.vue') },
      { path: 'recipes', component: () => import('pages/RecipePage.vue') },
      { path: 'recipes/:id', component: () => import('pages/RecipeDetails.vue') },
      { path: 'profile', component: () => import('pages/UserProfile.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
