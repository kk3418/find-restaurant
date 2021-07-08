<template>
  <Map />
</template>

<script>
import Map from "./components/Map.vue";
// Todo:
// 1. 讓搜尋list更美觀
//  a. 預留顯示餐廳位子跟中心位置的距離空間
//  b. 在手機尺寸能夠縮小 以及顯示漢堡排按鈕
// 2. 標示地圖中心的Marker 顏色跟文字顏色要能客製化
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
  height: 100vh;
  width: 100vw;
}
</style>
