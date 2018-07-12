<template>
  <div class="info">
    <BlogTitle msg="There's nothing here, go back"/>
    <BlogBodyGraph
      rawMsg="You've either entered a bad link, or you are missing required permissions"
    />
  </div>
</template>

<script>
import BlogTitle from '@/components/BlogTitle.vue';
import BlogBodyGraph from '@/components/BlogBodyGraph.vue';

export default {
  name: 'FourOhFour',
  components: {
    BlogTitle,
    BlogBodyGraph,
  },
};
</script>
