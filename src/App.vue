<template>
  <Map />
</template>

<script>
import Map from "./components/Map.vue";
export default {
  name: "App",
  components: {
    Map,
  },
};
</script>
<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
}
</style>
