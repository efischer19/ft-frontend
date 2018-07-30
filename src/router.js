import Router from 'vue-router';
import Vue from 'vue';

import Blog from './views/Blog.vue';
import FourOhFour from './views/404.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/posts/:id',
      component: Blog,
      props: true,
    },
    {
      path: '*',
      component: FourOhFour,
    },
  ],
});
