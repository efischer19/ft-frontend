<template>
  <a :href="baseFileLink">
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
  },
  computed: {
    smallFileLink() {
      return this.baseFileLink.replace(/(\.jpg)/, '.small$1');
    },
  },
};
</script>
