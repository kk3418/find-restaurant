<template>
  <div id="map"></div>
  <div id="list">
    <List :count="count" />
    <button @click="onClick()">search</button>
  </div>
</template>
<script>
import List from "./List.vue";

export default {
  name: "Map",
  components: {
    List,
  },
  data() {
    return {
      map: null,
      lat: 25.04,
      lng: 121.512,
      count: 1,
    };
  },
  methods: {
    onClick() {
      this.count += 1;
      console.log(this.count);
    },
  }
};
</script>
<style scoped>
#map {
  top: -5vh;
  height: 100%;
  width: 100%;
}
#list {
  position: absolute;
  width: 20vw;
  height: 30vh;
  z-index: 2;
  background: red;
  opacity: 0.7;
  top: 15vh;
  right: 10vw;
}
</style>
