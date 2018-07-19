<template>
  <div id="nav">
    <SignIn/>
    <h1>Currently Available Posts</h1>
    <ul>
      <li v-for="post in publicPosts" :key="post.path">
        <h2>
          <router-link
            :to="`posts/${post.path}`"
          >
            {{ post.title }}
          </router-link>
        </h2>
      </li>
      <li v-for="post in privatePosts" :key="post.path">
        <h2>
          <router-link
            :to="`posts/_${post.path}`"
          >
            {{ post.title }}
          </router-link>
        </h2>
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
      axios.get('/api/posts2.json').then(({ data }) => {
        this.publicPosts = data;
      });
    }

    if (!this.privatePosts) {
      const authToken = Cookie.get('ft-auth-token');
      if (authToken) {
        axios.get({
          url: 'https://nccu1znzcj.execute-api.us-east-2.amazonaws.com/Prod/posts',
          headers: {
            'x-api-key': 'rWxZBY8KEo5dAsvwlJl1E4H3vmy0a3H37yEj4LPE',
            Authorization: authToken,
          },
        }).then(({ data }) => {
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
