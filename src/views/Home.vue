<template>
  <div id="home">
    <nav>
      <SignIn/>
    </nav>
    <header>
      <h1>Fischer Things</h1>
    </header>
    <main>
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
    </main>
    <footer>
      <p>© Eric Fischer 2018</p>
      <a href="#/posts/faq">FAQ</a>
    </footer>
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
    if (authToken) { visibilities.unshift('private'); }

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
            /* istanbul ignore next line */
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
note that I use the #home selector instead of vue's 'scoped' ability, for performance
https://vue-loader.vuejs.org/guide/scoped-css.html#also-keep-in-mind
*/

#home {
  min-height: 100vh;
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 30px  
}

#home h1 {
  margin: auto;
  width: 100%;
  margin-top: 20px;
  font-size: 2.5em;
  text-align: center;
  color: #404040;
}

#home section {
  border: 5px solid #404040;
  border-radius: 20px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  border-bottom-width: 5px;
  margin-top: 20px;
  background-color: #404040;
}

#home h2 {
  color: #E6E6E6;
  margin: 10px;
}

#home ul {
  list-style-type: none;
  padding: 0;
  background-color: #E6E6E6;
  margin-bottom: 0;
  padding-bottom: 1px;
}

#home li {
  border-top: 2px solid darkgray;
}

#home .postLink {
  margin: 10px;
  overflow: hidden;
}

#home .postTitle {
  float: left;
}

#home .postDate {
  float: right;
  color: #404040;
}

footer {
  background-color: lightgray;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
}

footer > p {
  float: left;
  margin: 0;
}

footer > a {
  float: right;
}
</style>
