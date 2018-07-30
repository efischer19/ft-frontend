<template>
  <div id="nav">
    <SignIn/>
    <h1>Fischer Things</h1>
    <template v-for="(post_listings, visibility) in posts">
      <section
        v-for="(posts, topic) in post_listings"
        :key="topic">
        <h2 class="topic">{{ topic }}</h2>
        <ul>
          <li
            v-for="post in posts"
            :key="post.path">
            <router-link
              :to="`posts/${visibility === 'private' ? '_' : ''}${post.path}`"
            >
              <div class="postLink">
                <p class="postTitle">{{ post.title }}</p>
                <p class="postDate">{{ getDisplayDate(post.date) }}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<script>
import axios from 'axios';

import { getCachedData, setCachedData } from '@/util/expiring-session-cache';
import SignIn from '@/components/SignIn.vue';

export default {
  name: 'Home',
  components: {
    SignIn,
  },
  data() {
    /*
    a note on privacy:
    Normally, one would say "hey, this URL and API key should not be checked into github, WTF?"
    However, given the nature of my project (static, serverless site), I feel that these values
    *must* be exposed to unsecured js at some point, so why act like they're obscured at all?

    I'm using the AWS free tier, and have my API key rate-limited to quite a low value by normal
    web standards, given the limited audience I expect for the private portion of this site. You
    could use these values to DDOS my API Gateway setup if you wanted to, but please don't, okay?
    */
    this.posts = {};
    const urls = {
      public: '/api/public/posts.json',
      private: 'https://nccu1znzcj.execute-api.us-east-2.amazonaws.com/Prod/posts',
    };

    // auth and api key headers aren't needed for public posts, but they won't hurt anything either
    const authToken = getCachedData('ft-auth-token') || '';
    const apiKey = authToken ? 'oZE5pkcS5H4PlndobzKdH9wmoxO9uLqa2tY5wtaH' : '';
    const headers = {
      'X-Api-Key': apiKey,
      Authorization: authToken,
    };

    const visibilities = ['public'];
    if (authToken) { visibilities.push('private'); }

    // eslint-disable-next-line no-restricted-syntax
    for (const visibility of visibilities) {
      if (!this.posts[visibility]) {
        const cacheData = getCachedData(`${this.$route.path}_${visibility}`);
        if (cacheData) {
          this.posts[visibility] = JSON.parse(cacheData);
          this.$forceUpdate();
        } else {
          axios.get(
            urls[visibility],
            { headers },
          ).then(({ data }) => {
            setCachedData(`${this.$route.path}_${visibility}`, JSON.stringify(data));
            this.posts[visibility] = data;
          }).catch((error) => {
            console.log(error);
          });
        }
      }
    }
    return {
      posts: {
        public: this.posts.public || [],
        private: this.posts.private || [],
      },
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
/*
note that I use the #nav selector instead of vue's 'scoped' ability, for performance
https://vue-loader.vuejs.org/guide/scoped-css.html#also-keep-in-mind
*/

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

#nav .postLink {
  margin: 10px;
  overflow: hidden;
}

#nav .postTitle {
  float: left;
}

#nav .postDate {
  float: right;
  color: #404040;
}
</style>
