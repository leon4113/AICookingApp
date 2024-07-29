const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/Landing' }, // Redirect to login by default
      { path: 'home', component: () => import('pages/HomePage.vue') },
      { path: 'loginpage', component: () => import('pages/LoginPage.vue') },
      { path: 'signup', component: () => import('pages/SignupPage.vue') },
      { path: 'vision', component: () => import('pages/VisionPage.vue') },
      { path: 'recipes', component: () => import('pages/RecipePage.vue') },
      { path: 'recipe/:id', component: () => import('pages/RecipeDetails.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
      { path: 'Landing', component: () => import('pages/LandingPage.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
