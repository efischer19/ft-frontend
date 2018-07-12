<template>
  <div class="post">
    <template v-for="element in postContent">
      <BlogTitle
        v-if="element.type === 'title'"
        v-bind:msg="element.msg"
        :key="element.index"
      />
      <BlogBodyGraph
        v-else-if="element.type === 'p'"
        v-bind:rawMsg="element.rawMsg"
        v-bind:links="element.links"
        :key="element.index"
      />
      <BlogImg
        v-else-if="element.type === 'img'"
        v-bind:baseFileLink="`/${id}/${element.link}`"
        v-bind:altText="element.alt"
        :key="element.index"
      />
      <BlogHeader
        v-else-if="element.type === 'header'"
        v-bind:msg="element.msg"
        :key="element.index"
      />
      <BlogList
        v-else-if="element.type === 'list'"
        v-bind:items="element.items"
        :key="element.index"
      />
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import BlogTitle from '@/components/BlogTitle.vue';
import BlogBodyGraph from '@/components/BlogBodyGraph.vue';
import BlogImg from '@/components/BlogImg.vue';
import BlogHeader from '@/components/BlogHeader.vue';
import BlogList from '@/components/BlogList.vue';

export default {
  name: 'blog',
  props: ['id'],
  data() {
    if (!this.ajaxData) {
      this.ajaxData = [{ index: 0, type: 'title', msg: 'Error Loading Post Data' }];
      axios.get(`/${this.id}/post_data.json`).then(({ data }) => {
        this.postContent = data;
      });
    }
    return {
      postContent: this.ajaxData,
    };
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
