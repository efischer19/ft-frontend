<template>
  <div id="nav">
    <SignIn/>
    <h1>Fischer Things</h1>
    <section v-for="(posts, topic) in privatePosts" :key="topic">
      <h2 class="privateTopic">{{ topic }}</h2>
      <ul>
        <li v-for="post in posts" :key="post.path">
          <router-link
            :to="`posts/_${post.path}`"
          >
            <div class="postLink">
              <p class="postTitle">{{ post.title }}</p>
              <p class="postDate">{{ getDisplayDate(post.date) }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
    <section v-for="(posts, topic) in publicPosts" :key="topic">
      <h2 class="publicTopic">{{ topic }}</h2>
      <ul>
        <li v-for="post in posts" :key="post.path">
          <router-link
            :to="`posts/${post.path}`"
          >
            <div class="postLink">
              <p class="postTitle">{{ post.title }}</p>
              <p class="postDate">{{ getDisplayDate(post.date) }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

import SignIn from '@/components/SignIn.vue';

import { getData, setData } from '@/util/expiringSessionCache';

export default {
  name: 'home',
  components: {
    SignIn,
  },
  props: {
    postPaths: {
      default: () => {},
      type: Array,
    },
  },
  data() {
    if (!this.publicPosts) {
      const cacheData = getData(`${this.$route.path}_public`);
      if (cacheData) { this.publicPosts = JSON.parse(cacheData); }
      axios.get('/api/public/posts.json').then(({ data }) => {
        setData(`${this.$route.path}_public`, JSON.stringify(data));
        this.publicPosts = data;
      });
    }

    if (!this.privatePosts) {
      const cacheData = getData(`${this.$route.path}_private`);
      if (cacheData) { this.privatePosts = JSON.parseData(cacheData); }
      const authToken = getData('ft-auth-token');
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
          setData(`${this.$route.path}_private`, JSON.stringify(data));
          this.privatePosts = data;
        });
      }
    }
    return {
      publicPosts: this.postPaths,
      privatePosts: this.postPaths,
    };
  },
  methods: {
    getDisplayDate: (date) => {
      const options = { day: 'numeric', month: 'short' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
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
  color: #404040;
}

#nav section {
  border: 5px solid #404040;
  border-radius: 20px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  border-bottom-width: 5px;
  margin-top: 20px;
  background-color: #404040;
}

#nav h2 {
  color: #E6E6E6;
  margin: 10px;
}

#nav ul {
  list-style-type: none;
  padding: 0;
  background-color: #E6E6E6;
  margin-bottom: 0;
  padding-bottom: 1px;
}

#nav li {
  border-top: 2px solid darkgray;
}

.postLink {
  margin: 10px;
  overflow: hidden;
}

.postLink .postTitle {
  float: left;
}

.postLink .postDate {
  float: right;
  color: #404040;
}
</style>
