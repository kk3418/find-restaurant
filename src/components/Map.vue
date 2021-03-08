<template>
  <div id="map"></div>
</template>
<script>
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "AIzaSyCd6kNCPNNnVZnd45Es3WTY8xfzeYdhUQQ",
  version: "weekly"
});

export default {
  name: "Map",
  data() {
    return {
      map: null,
      lat: 25.04,
      lng: 121.512
    };
  },
  mounted() {
    this.initMap();
    this.setMarker();
  },
  methods: {
    initMap() {
      return loader
        .load()
        .then(() => {
          this.map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: this.lat, lng: this.lng },
            minZoom: 15,
            zoom: 15,
            maxZoom: 18,
            fullscreenControl: false,
            mapTypeControl: false
          });
        })
        .catch(err => console.log(err, "fail"));
    },
    setMarker() {
      return loader.load().then(() => {
        const marker = new google.maps.Marker({
          position: { lat: this.lat, lng: this.lng },
          map: this.map
        });
      });
    }
  }
};
</script>
<style scoped>
#map {
  position: relative;
  top: -5vh;
  height: 100%;
  width: 100%;
}
</style>
