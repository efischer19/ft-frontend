<template>
  <div id='signin-header'>
    <template v-if="hasAuthToken">
      <p>Hello signed-in user!</p>
      <a v-on:click="sign_out" href="/">Sign Out</a>
    </template>
    <a v-else href="/login_success?id_token=12345">
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
