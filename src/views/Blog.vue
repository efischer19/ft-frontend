<template>
  <div class="post">
    <template v-for="element in postContent">
      <BlogTitle
        v-if="element.type === 'title'"
        :msg="element.msg"
        :key="element.index"
      />
      <BlogP
        v-else-if="element.type === 'p'"
        :raw-msg="element.rawMsg"
        :links="element.links"
        :key="element.index"
      />
      <BlogImg
        v-else-if="element.type === 'img'"
        :file-links="element.signed || {'public': element.link}"
        :post-id="id"
        :alt-text="element.alt"
        :key="element.index"
      />
      <BlogVideo
        v-else-if="element.type === 'video'"
        :file-links="element.signed || {'public': element.link}"
        :post-id="id"
        :key="element.index"
      />
      <BlogHeader
        v-else-if="element.type === 'header'"
        :msg="element.msg"
        :key="element.index"
      />
      <BlogList
        v-else-if="element.type === 'list'"
        :items="element.items"
        :key="element.index"
      />
    </template>
  </div>
</template>

<script>
import axios from 'axios';

import { getCachedData, setCachedData } from '@/util/expiring-session-cache';
import BlogHeader from '@/components/BlogHeader.vue';
import BlogImg from '@/components/BlogImg.vue';
import BlogVideo from '@/components/BlogVideo.vue';
import BlogList from '@/components/BlogList.vue';
import BlogP from '@/components/BlogP.vue';
import BlogTitle from '@/components/BlogTitle.vue';


export default {
  name: 'Blog',
  components: {
    BlogTitle,
    BlogP,
    BlogImg,
    BlogVideo,
    BlogHeader,
    BlogList,
  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    const cacheData = getCachedData(this.$route.path);
    if (cacheData) { return JSON.parse(cacheData); }

    const isPrivatePost = (this.id.charAt(0) === '_');

    if (!this.postContent) {
      let url = `/api/public/${this.id}/post_data.json`;
      let headers = {};
      if (isPrivatePost) {
        // see note in Home.vue as to why I don't bother obscuring these values
        const authToken = getCachedData('ft-auth-token');
        this.id = this.id.substring(1);
        url = `https://nccu1znzcj.execute-api.us-east-2.amazonaws.com/Prod/post-data/${this.id}`;
        headers = {
          'X-Api-Key': 'oZE5pkcS5H4PlndobzKdH9wmoxO9uLqa2tY5wtaH',
          Authorization: authToken,
        };
      }

      axios.get(
        url,
        { headers: headers || {} },
      ).then(({ data }) => {
        setCachedData(this.$route.path, JSON.stringify({ postContent: data }));
        this.postContent = data;
      }).catch((error) => {
        /* istanbul ignore next line */
        console.log(error);
      });
    }

    return {
      postContent: [{ index: 0, type: 'p', rawMsg: 'Loading post...' }],
    };
  },
};
</script>
