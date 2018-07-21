<template>
  <a :href="largeFileLink">
      <img :src="smallFileLink" :alt="altText">
      <div class="hidden">Click for high-resolution image</div>
  </a>
</template>

<script>
export default {
  name: 'BlogImg',
  props: {
    fileLinks: Object,
    altText: String,
    postId: String,
  },
  computed: {
    largeFileLink() {
      if (this.fileLinks.large) {
        // this is a preprocessed, signed link to a private file. Pass it through.
        return this.fileLinks.large;
      }
      // this is a not-yet-complete path to a public file
      return `/api/public/${this.postId}/${this.fileLinks.public}`;
    },
    smallFileLink() {
      if (this.fileLinks.small) {
        // this is a preprocessed, signed link to a private file. Pass it through.
        return this.fileLinks.small;
      }
      // this is a not-yet-complete path to a public file
      return `/api/public/${this.postId}/${this.fileLinks.public.replace(/(\.jpg)/, '.small$1')}`;
    },
  },
};
</script>
