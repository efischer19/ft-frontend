import Vue from 'vue';
import Router from 'vue-router';
import Blog from './views/Blog.vue';
import Home from './views/Home.vue';
import FourOhFour from './views/404.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
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
