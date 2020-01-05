import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/router/routes/index.js';
import App from '@/App';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
    },
  ].concat(routes),
});

router.beforeEach((to, from, next) => {
  // use here to set authenticated or public page private page middleware
  next();
});

export default router;
