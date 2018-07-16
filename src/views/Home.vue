<template>
  <div id="nav">
    <SignIn/>
    <h2>Currently Available Posts</h2>
    <ul>
      <li v-for="post in publicPosts" :key="post.path">
        <router-link
          :to="`posts/${post.path}`"
        >
          {{ post.title }}
        </router-link>
      </li>
      <li v-for="post in privatePosts" :key="post.path">
        <router-link
          :to="`posts/_${post.path}`"
        >
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import Cookie from 'js-cookie';
import SignIn from '@/components/SignIn.vue';

export default {
  name: 'home',
  components: {
    SignIn,
  },
  props: {
    postPaths: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    if (!this.publicPosts) {
      axios.get('/api/posts.json')
        .then(({ data }) => {
          this.publicPosts = data;
        });
    }

    if (!this.privatePosts) {
      const authToken = Cookie.get('ft-auth-token');
      if (authToken) {
        console.log(authToken);
        axios.get('/api/posts2.json') // same as public get for now; will eventually hit API Gateway instead
          .then(({ data }) => {
            this.privatePosts = data;
          });
      }
    }
    return {
      publicPosts: this.postPaths,
      privatePosts: this.postPaths,
    };
  },
};
</script>
