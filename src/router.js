import Vue from 'vue';
import Router from 'vue-router';
import Blog from './views/Blog.vue';

Vue.use(Router);

// just for local development
var localPostData = require('./mc_data.json');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'blog',
      component: Blog,
      props: {
        baseImgDir: "mc/",
        postContent: localPostData,
      },
    },
  ],
});
