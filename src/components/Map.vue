<template>
  <div id="map"></div>
  <div id="list">
    <List v-if="nearbySearchResult" :results="nearbySearchResult" />
  </div>
</template>
<script>
import { ref } from "vue";
import { GoogleMap } from "@googlemaps/map-loader";
import List from "./List.vue";
import { nearbySearch } from "../fetchData";

export default {
  name: "Map",
  components: {
    List,
  },
  mounted() {
    const mapOptions = {
      center: {
        lat: 25.01,
        lng: 121.521,
      },
      zoom: 15,
    };
    const apiOptions = {
      version: 'weekly',
      libraries: ['places'],
    };
    const mapLoaderOptions = {
      apiKey: process.env.VUE_APP_GOOGLE_KEY,
      divId: 'map',
      mapOptions: mapOptions,
      apiOptions: apiOptions,
    };
    const mapLoader = new GoogleMap();
    mapLoader.initMap(mapLoaderOptions)
      .then(googleMap => {
        // returns instance of google.maps.Map
        nearbySearch(mapOptions.center)
          .then(({ data }) => {
            setTimeout(() => {
              this.nearbySearchResult = data.results;
            }, 500);
          })
          .catch(err => console.error(err, "failed QQ"));
      });
  },
  data() {
    return {
      nearbySearchResult: null,
    };
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
  min-width: 15vw;
  min-height: 30vh;
  z-index: 2;
  background: red;
  opacity: 0.7;
  top: 15vh;
  right: 10vw;
}
</style>
