<template>
  <div id='signin-header'>
    <template v-if="hasAuthToken">
      <p>Hello {{ userName }}!</p>
      <a v-on:click="sign_out" href="/">Sign Out</a>
    </template>
    <template v-else>
      <p>You are not signed in</p>
      <a href="https://signin.fischerthings.com/login?response_type=token&client_id=6a8t6a9st8fqkbt81n9mtb2aag&redirect_uri=https://fischerthings.com/login_success.html">Click Here to Sign In</a>
    </template>
  </div>
</template>

<script>
import Cookie from 'js-cookie';

export default {
  name: 'SignInHeader',
  computed: {
    hasAuthToken() {
      return Boolean(Cookie.get('ft-auth-token'));
    },
    userName() {
      if (!this.hasAuthToken) {
        return 'Anonymous User';
      }
      try {
        return JSON.parse(atob(Cookie.get('ft-auth-token').split('.')[1]))['cognito:username'];
      } catch (error) {
        return 'Signed-In User';
      }
    },
  },
  methods: {
    sign_out() {
      Cookie.remove('ft-auth-token');
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
}

#signin-header > p {
  display: inline-block;
}

#signin-header > a {
  float: right;
  margin: 20px auto;
}
</style>
