<template>
  <div ref="map" id="map"></div>
  <div id="list" v-if="nearbySearchResult">
    <List :results="nearbySearchResult" />
  </div>
</template>
<script>
import List from "./List.vue";
import { nearbySearch } from "../fetchData";

export default {
  name: "Map",
  components: {
    List,
  },
  mounted() {
    this.initial();
  },
  data() {
    return {
      nearbySearchResult: null,
      script: null,
      center: {
        lat: 25.01,
        lng: 121.521,
      },
    };
  },
  methods: {
    initial() {
      this.script = document.createElement("script");
      this.script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_KEY}&callback=initMap`;
      this.script.async = true;
      window.initMap = this.initMap;
      document.head.appendChild(this.script);
    },
    initMap() {
      const mapOptions = {
        center: this.center,
        zoom: 15,
      };
      const map = new window.google.maps.Map(this.$refs.map, mapOptions);
      new window.google.maps.Marker({
        position: this.center,
        map: map,
        title: "center"
      });
      nearbySearch(this.center).then(({ data }) => {
        this.nearbySearchResult = data.results;
      });
      map.addListener("bounds_changed", () => {
        this.center = { lat: map.center.lat(), lng: map.center.lng() };
      });
      map.addListener("dragend", () => {
        nearbySearch(this.center).then(({ data }) => {
          new window.google.maps.Marker({
            position: this.center,
            map: map,
            title: "center",
          });
          if (data.results.length === 0) {
            this.nearbySearchResult = null;
          } else {
            this.nearbySearchResult = data.results;
          }
        });
      });
    },
  },
};
</script>
<style scoped>
#map {
  position: relative;
  width: 100%;
  height: 100%;
}
#list {
  position: absolute;
  width: 20vw;
  height: 50vh;
  z-index: 2;
  background: red;
  opacity: 0.7;
  top: 15vh;
  right: 10vw;
  overflow-x: hide;
  overflow-y: scroll;
}
</style>
