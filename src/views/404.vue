<template>
  <div class="info">
    <BlogTitle msg="There's nothing here, go back"/>
    <BlogP
      raw-msg="You've either entered a bad link, or you are missing required permissions"
    />
  </div>
</template>

<script>
import BlogP from '@/components/BlogP.vue';
import BlogTitle from '@/components/BlogTitle.vue';

export default {
  name: 'FourOhFour',
  components: {
    BlogTitle,
    BlogP,
  },
};
</script>
