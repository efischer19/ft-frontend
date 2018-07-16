<template>
  <div id="nav">
    <SignIn/>
    <h2>Currently Available Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.path">
        <router-link
          :to="`posts/${post.path}`"
        >
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import SignIn from '@/components/SignIn.vue';

export default {
  name: 'home',
  components: {
    SignIn,
  },
  props: {
    postPaths: {
      default: () => [{}],
      type: Array,
    },
  },
  data() {
    if (!this.posts) {
      axios.get('/api/posts.json')
        .then(({ data }) => {
          this.posts = data;
        })
        .catch(() => {
          this.posts = [{}];
        });
    }
    return {
      posts: this.postPaths,
    };
  },
};
</script>
