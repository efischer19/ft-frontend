<template>
  <div class="post">
    <template v-for="element in postContent.sort((a,b) => { return a.index-b.index; })">
      <BlogTitle
        v-if="element.type === 'title'"
        v-bind:msg="element.msg"
      />
      <BlogBodyGraph
        v-else-if="element.type === 'p'"
        v-bind:rawMsg="element.rawMsg"
        v-bind:links="element.links"
      />
      <BlogImg
        v-else-if="element.type === 'img'"
        v-bind:baseFileLink="`${baseImgDir}${element.link}`"
        v-bind:altText="element.alt"
      />
      <BlogHeader
        v-else-if="element.type === 'header'"
        v-bind:msg="element.msg"
      />
      <BlogList
        v-else-if="element.type === 'list'"
        v-bind:items="element.items"
      />
    </template>
  </div>
</template>

<script>
import BlogTitle from '@/components/BlogTitle.vue';
import BlogBodyGraph from '@/components/BlogBodyGraph.vue';
import BlogImg from '@/components/BlogImg.vue';
import BlogHeader from '@/components/BlogHeader.vue';
import BlogList from '@/components/BlogList.vue';

export default {
  name: 'blog',
  props: {
    postContent: Array,
    baseImgDir: String,
  },
  components: {
    BlogTitle,
    BlogBodyGraph,
    BlogImg,
    BlogHeader,
    BlogList,
  },
};
</script>
