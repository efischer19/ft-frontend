<template>
  <a :href="processedBaseLink">
      <img :src="smallFileLink" :alt="altText">
      <div class="hidden">Click for high-resolution image</div>
  </a>
</template>

<script>
export default {
  name: 'BlogImg',
  props: {
    baseFileLink: String,
    altText: String,
    postId: String,
  },
  computed: {
    processedBaseLink() {
      if (this.baseFileLink.startsWith('http')) {
        // this is a preprocessed, signed link to a private file. Pass it through.
        return this.baseFileLink;
      }
      // this is a not-yet-complete path to a public file
      return `/api/public/${this.postId}/${this.baseFileLink}`;
    },
    smallFileLink() {
      return this.processedBaseLink.replace(/(\.jpg)/, '.small$1');
    },
  },
};
</script>
