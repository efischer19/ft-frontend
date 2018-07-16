<script>
import Cookie from 'js-cookie';

export default {
  beforeRouteEnter(to, from, next) {
    const token = to.query.id_token;
    if (token) {
      Cookie.set('ft-auth-token', token);
    }
    next('/home');
  },
};
</script>

