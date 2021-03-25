<template>
  <div id="map"></div>
  <div id="list">
    <List :count="count" />
    <button @click="onClick()">search</button>
  </div>
</template>
<script>
import { Loader } from "@googlemaps/js-api-loader";
import { Client } from "@googlemaps/google-maps-services-js";
import List from "./List.vue";

const loader = new Loader({
  apiKey: "AIzaSyArwUk0co_Ur3wviOtN0UI9_am-dN03hEA",
  version: "weekly"
});

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
  created() {
    this.initMap();
  },
  mounted() {
    this.setMarker();
  },
  methods: {
    onClick() {
      this.count += 1;
      console.log(this.count);
    },
    initMap() {
      return loader.load().then(() => {
        this.map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: this.lat, lng: this.lng },
          minZoom: 15,
          zoom: 15,
          maxZoom: 17,
          fullscreenControl: false,
          mapTypeControl: false
        });
      }).catch(err => console.log(err, "fail"));
    },
    setMarker() {
      return loader.load().then(() => {
        const marker = new google.maps.Marker({
          position: { lat: this.lat, lng: this.lng },
          map: this.map
        });
      }).catch(err => console.log(err, "marker fail"));
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
