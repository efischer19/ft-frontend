<template>
  <div class="about">
    <BlogTitle msg="I made this"/>
    <BlogBodyGraph
      rawMsg="If you are anything like me, you really appreciate a good mac and cheese. I used to make it with a roux-based sauce, which was decent, but not great. It had decent texture, but the flavor was lacking and I always wanted to have something else to serve alongside it. Enter [[ab]]. This one's a game-changer, folks. It's so good, and so easy that I've enshrined the recipe on a post-it right in the middle of my kitchen cabinets, where it'll stay until I've commited it to memory thanks to rote repitition."
      v-bind:links="{
        ab: {
          title: 'Alton Brown',
          href: 'https://www.foodnetwork.com/recipes/alton-brown/stovetop-mac-n-cheese-recipe-1939465'
        }
      }"
    />
  </div>
</template>

<script>
import BlogTitle from '@/components/BlogTitle.vue';
import BlogBodyGraph from '@/components/BlogBodyGraph.vue';

export default {
  name: 'blog',
  components: {
    BlogTitle,
    BlogBodyGraph,
  },
};
</script>
