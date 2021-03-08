<template>
  <div>
    <span>{{ title }}</span>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    title: String
  }
};
</script>
<style scoped>
div {
  height: 5vh;
  position: relative;
  z-index: 2;
}
span {
  color: blue;
  font-size: 24px;
}
</style>
