<template>
  <p v-html="formattedMsg"/>
</template>

<script>
export default {
  name: 'BlogP',
  props: {
    rawMsg: {
      type: String,
      default: '',
    },
    links: {
      type: Object,
      default: () => {},
    },
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
