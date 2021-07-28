<template>
  <Map />
</template>

<script>
import Map from "./components/Map.vue";
// Todo:
// 1. 讓搜尋list更美觀
//  a. 找出方法讓 list-item-name::after 顯示可以超過父層
// 問題出在 .list 的overflow-y: scroll; 會連帶影響到x軸
// 2. 可以透過價格 遠近等 進行排序
// 3. 鎖定現在位置 -- 先把center改成computed性質再實作這個功能
// 4. 按一個鈕可以規劃路徑
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
