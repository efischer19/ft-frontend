<template>
  <div id="nav">
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

export default {
  name: 'home',
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
