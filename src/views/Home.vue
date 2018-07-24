<template>
  <div id="nav">
    <SignIn/>
    <h1>Fischer Things</h1>
    <ul>
      <li v-for="post in publicPosts" :key="post.path">
        <h2>
          <router-link
            :to="`posts/${post.path}`"
          >
            <div class="postLink">
              {{ post.title }}
            </div>
          </router-link>
        </h2>
      </li>
      <li v-for="post in privatePosts" :key="post.path">
        <h2>
          <router-link
            :to="`posts/_${post.path}`"
          >
            <div class="postLink">
              {{ post.title }}
            </div>
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
      axios.get('/api/public/posts.json').then(({ data }) => {
        this.publicPosts = data;
      });
    }

    if (!this.privatePosts) {
      const authToken = Cookie.get('ft-auth-token');
      if (authToken) {
        axios.get(
          'https://nccu1znzcj.execute-api.us-east-2.amazonaws.com/Prod/posts',
          {
            headers: {
              'X-Api-Key': 'oZE5pkcS5H4PlndobzKdH9wmoxO9uLqa2tY5wtaH',
              Authorization: authToken,
            },
          },
        ).then(({ data }) => {
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

<style>
#nav h1 {
  margin: auto;
  width: 100%;
  margin-top: 20px;
  font-size: 3em;
  text-align: center;
}

#nav ul {
  list-style-type: none;
  border: 2px solid darkgray;
  border-radius: 20px;
  padding: 0;
}

#nav li {
  border-top: 2px solid darkgray;
}

#nav li:first-child {
  border-top: none;
}

.postLink {
  margin: 10px;
}
</style>
