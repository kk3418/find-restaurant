<template>
  <Map />
</template>

<script>
import Map from "./components/Map.vue";
// Todo:
// 1. 移動地圖，搜尋結果要能隨之變動
// 2. 標示地圖中心的Marker 顏色跟文字顏色要能客製化
export default {
  name: "App",
  components: {
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
