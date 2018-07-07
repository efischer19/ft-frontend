<template>
  <p v-html="formattedMsg"></p>
</template>

<script>
export default {
  name: 'BlogBodyGraph',
  props: {
    rawMsg: String,
    links: Object,
  },
  computed: {
    formattedMsg() {
      return this.rawMsg.replace(/\[\[(.*)\]\]/g, this.getFormatLink(this.links));
    },
  },
  methods: {
    getFormatLink: links => (_, p1) => {
      const link = links[p1];
      return `<a href="${link.href}">${link.title}</a>`;
    },
  },
};
</script>
