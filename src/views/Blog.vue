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
        v-bind:baseFileLink="`/${resolvedId}/${element.link}`"
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
import Cookie from 'js-cookie';

import BlogTitle from '@/components/BlogTitle.vue';
import BlogBodyGraph from '@/components/BlogBodyGraph.vue';
import BlogImg from '@/components/BlogImg.vue';
import BlogHeader from '@/components/BlogHeader.vue';
import BlogList from '@/components/BlogList.vue';

export default {
  name: 'blog',
  props: ['id'],
  data() {
    let newId = this.id;
    const isPrivatePost = (this.id.charAt(0) === '_');
    if (!this.ajaxData) {
      this.ajaxData = [{ index: 0, type: 'title', msg: 'Error Loading Post Data' }];
      if (isPrivatePost) {
        const authToken = Cookie.get('ft-auth-token');
        if (authToken) {
          // I could change the error message to something like "not signed in"
          // I'm just leaving the generic error for now though

          newId = this.id.substring(1);
          axios.get(
            `https://nccu1znzcj.execute-api.us-east-2.amazonaws.com/Prod/post-data/${newId}`,
            {
              headers: {
                'X-Api-Key': 'oZE5pkcS5H4PlndobzKdH9wmoxO9uLqa2tY5wtaH',
                Authorization: authToken,
              },
            },
          ).then(({ data }) => {
            this.postContent = data;
          });
        }
      } else {
        axios.get(`/api/public/${this.id}/post_data.json`).then(({ data }) => {
          this.postContent = data;
        });
      }
    }
    return {
      postContent: this.ajaxData,
      resolvedId: newId,
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
