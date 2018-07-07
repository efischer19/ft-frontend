<template>
  <ul>
    <li v-for="item in items">{{ item }}</li>
  </ul>
</template>

<script>
export default {
  name: 'BlogList',
  props: {
    items: Array,
  },
};
</script>
