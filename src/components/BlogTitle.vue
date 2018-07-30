<template>
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  name: 'BlogTitle',
  props: {
    msg: {
      type: String,
    },
  },
};
</script>
