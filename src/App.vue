<template>
  <Header title="Header" />
  <Map />
</template>

<script>
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";

export default {
  name: "App",
  components: {
    Header,
    Map
  }
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
  height: 100vh;
  width: 100vw;
}
</style>
