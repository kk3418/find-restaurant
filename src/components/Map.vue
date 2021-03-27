<template>
  <GoogleMap
    ref="mapRef"
    class="map"
    api-key="AIzaSyArwUk0co_Ur3wviOtN0UI9_am-dN03hEA"
    :libraries="[ 'places' ]"
    style="width: 100%; height: 100%; top:-5vh;"
    :maxZoom="17"
    :minZoom="12"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
  <div id="list">
    <List :count="count" />
    <button @click="onClick()">search</button>
  </div>
</template>
<script>
import { ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import List from "./List.vue";

export default {
  name: "Map",
  components: {
    List,
    GoogleMap,
    Marker,
  },
  data() {
    return {
      count: 1,
    };
  },
  setup() {
    // no need to use mounted outside setup, use onMount here instead
    const center = {
      lat: 25.04,
      lng: 121.512,
    };
    const mapRef = ref(null);
    return { center, mapRef };
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
.map::after {
  position: absolute;
  content: '';
  width: 5px;
  height: 100%;
  top: 0;
  left: 50%;
  background: green;
} /* the middle line */
</style>
