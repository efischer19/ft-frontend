import Vue from 'vue';
import Router from 'vue-router';
import Blog from './views/Blog.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'blog',
      component: Blog,
      props: {
        baseImgDir: 'mc/',
        postContent: postData || '[{"index": 0,"type": "title","msg": "No Post Data Found"}]',
      },
    },
  ],
});
