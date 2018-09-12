<template>
  <div class="video-with-link">
    <div class="div-around-video">
      <video
        width="auto"
        height="auto"
        controls>
        <source :src="smallFileLink">
      </video>
    </div>
    <a :href="largeFileLink">
      Click here for a higher-resolution version of this video
    </a>
  </div>
</template>

<script>
export default {
  name: 'BlogVideo',
  props: {
    fileLinks: {
      type: Object,
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
      return `/api/public/${this.postId}/${this.fileLinks.public.replace(/(\.mp4)/, extReplaceString)}`;
    },
  },
};
</script>

<style>
.video-with-link {
  text-align: center;
}

.div-around-video {
  width: 100%;
}
</style>
