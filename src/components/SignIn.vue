<template>
  <div id='signin-header'>
    <template v-if="hasAuthToken">
      <p>Hello signed-in user!</p>
      <a v-on:click="sign_out" href="/">Sign Out</a>
    </template>
    <a v-else href="https://signin.fischerthings.com/login?response_type=token&client_id=6a8t6a9st8fqkbt81n9mtb2aag&redirect_uri=https://fischerthings.com/login_success">
      Click Here to Sign In
    </a>
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
  },
  methods: {
    sign_out() {
      Cookie.remove('ft-auth-token');
      this.$forceUpdate();
    },
  },
};
</script>
