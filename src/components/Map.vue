<template>
  <div ref="map" id="map"></div>
  <div id="list" v-if="nearbyItems.length > 0">
    <List :nearbyItems="nearbyItems" />
  </div>
</template>
<script>
import List from "./List.vue";
import { nearbySearch, distanceMatrix } from "../fetchData";

export default {
  name: "Map",
  components: {
    List,
  },
  mounted() {
    this.initial();
  },
  data() {
    const firstCenter =
      window.localStorage.getItem("center") &&
      JSON.parse(window.localStorage.getItem("center"));
    return {
      nearbySearchResult: null,
      distances: null,
      script: null,
      center: firstCenter || {
        lat: 25.01,
        lng: 121.521,
      },
      map: null,
      markers: [],
    };
  },
  computed: {
    nearbyItems() {
      let result = [];
      if (this.nearbySearchResult && this.distances) {
        this.nearbySearchResult.forEach((item, index) => {
          result.push({
            ...item,
            distance: this.distances[index],
          });
        });
      }
      return result;
    },
  },
  methods: {
    initial() {
      this.script = document.createElement("script");
      this.script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_KEY}&callback=initMap`;
      this.script.async = true;
      window.initMap = this.initMap;
      document.head.appendChild(this.script);
    },
    setMarkerVisible(isVisible) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setVisible(isVisible);
      }
    },
    initMap() {
      const mapOptions = {
        center: this.center,
        zoom: 15,
        zoomControl: false,
        fullscreenMode: false,
        mapTypeControl: false,
      };
      const map = new window.google.maps.Map(this.$refs.map, mapOptions);
      this.map = map;
      const firstMarker = new window.google.maps.Marker({
        position: this.center,
        map: map,
      });
      this.markers.push(firstMarker);
      this.handleNearbyItems();
      map.addListener("bounds_changed", () => {
        this.center = { lat: map.center.lat(), lng: map.center.lng() };
        window.localStorage.setItem("center", JSON.stringify(this.center));
      });
      map.addListener("dragend", this.handleNearbyItems);
    },
    async handleNearbyItems() {
      this.setMarkerVisible(false);
      const marker = new window.google.maps.Marker({
        position: this.center,
        map: this.map,
      });
      this.markers.push(marker);
      try {
        this.nearbySearchResult = await nearbySearch(this.center);
        this.distances = await distanceMatrix({
          origins: [this.center],
          destinations: this.nearbySearchResult.map(v => v.geometry.location),
        });
      } catch (error) {
        console.error("handle error", error);
      }
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
  width: 25vw;
  height: 50vh;
  z-index: 2;
  background: red;
  opacity: 0.7;
  top: 15vh;
  right: 10vw;
  overflow-x: hidden;
  overflow-y: scroll;
  box-shadow: 1px 2px 2px 0 black;
  padding: 0.5vh 0;
}
@media (max-width: 800px) {
  #list {
    width: 55vw;
    height: 60vh;
    top: 4vh;
    right: 5vw;
  }
}
</style>
