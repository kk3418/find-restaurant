<template>
  <div class="list-item" v-for="item in results" :key="item.place_id">
    {{ item.name }}
  </div>
</template>
<script>
export default {
  name: "List",
  props: {
    results: Array,
  }
};
</script>
<style scoped>
.list-item {
  font-size: 0.9rem;
  color: #fff;
  line-height: 2rem;
}
</style>
