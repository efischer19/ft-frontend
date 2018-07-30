<template>
  <a :href="largeFileLink">
    <img
      :src="smallFileLink"
      :alt="altText">
    <div class="hidden">Click for high-resolution image</div>
  </a>
</template>

<script>
export default {
  name: 'BlogImg',
  props: {
    fileLinks: {
      type: Object,
    },
    altText: {
      type: String,
    },
    postId: {
      type: String,
    },
  },
  computed: {
    largeFileLink() {
      return this.getLink('large', '$1');
    },
    smallFileLink() {
      return this.getLink('small', '.small$1');
    },
  },
  methods: {
    getLink(size, extReplaceString) {
      if (this.fileLinks[size]) {
        // this is a preprocessed, signed link to a private file. Pass it through.
        return this.fileLinks[size];
      }

      // this is a not-yet-complete path to a public file
      return `/api/public/${this.postId}/${this.fileLinks.public.replace(/(\.jpg)/, extReplaceString)}`;
    },
  },
};
</script>

<style>
img {
  width:100%;
  height:auto;
}

.hidden {
  position:absolute;
  left:-10000px;
  top:auto;
}
</style>
