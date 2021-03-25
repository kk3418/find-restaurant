<template>
  <span>{{ count }}</span>
</template>
<script>
export default {
  name: 'List',
  props: {
    count: Number,
  },
};
</script>