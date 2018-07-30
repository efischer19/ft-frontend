<template>
  <div id="signin-header">
    <template v-if="hasAuthToken">
      <p>Hello {{ userName }}!</p>
      <a
        href="/"
        @click="sign_out">Sign Out</a>
    </template>
    <template v-else>
      <p>You are not signed in</p>
      <a href="https://signin.fischerthings.com/login?response_type=token&client_id=6a8t6a9st8fqkbt81n9mtb2aag&redirect_uri=https://fischerthings.com/login_success.html">Sign In</a>
    </template>
  </div>
</template>

<script>

import { getCachedData } from '@/util/expiring-session-cache';

export default {
  name: 'SignInHeader',
  computed: {
    hasAuthToken() {
      return Boolean(getCachedData('ft-auth-token'));
    },
    userName() {
      try {
        return JSON.parse(atob(getCachedData('ft-auth-token').split('.')[1]))['cognito:username'];
      } catch (error) {
        return 'Signed-In User';
      }
    },
  },
  methods: {
    sign_out() {
      sessionStorage.clear();
      this.$forceUpdate();
    },
  },
};
</script>

<style>
#signin-header {
  border-bottom: 6px solid darkgreen;
  background-color: lightgray;
  padding: 10px;
  overflow: hidden;
}

#signin-header > p {
  float: left;
  margin: 0;
}

#signin-header > a {
  float: right;
}
</style>
