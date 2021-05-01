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
    <List v-if="nearbySearchResult" :results="nearbySearchResult" />
  </div>
</template>
<script>
import { ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import List from "./List.vue";
import { nearbySearch } from "../fetchData";

export default {
  name: "Map",
  components: {
    List,
    GoogleMap,
    Marker,
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
  created() {
    setTimeout(() => {
      this.loadNearby();
    }, 2000);
  },
  data() {
    return {
      nearbySearchResult: null,
    };
  },
  methods: {
    loadNearby() {
      nearbySearch()
        .then(({ data }) => {
          this.nearbySearchResult = data.results;
          console.log(data.results);
        })
        .catch(err => console.error(err, "failed QQ"));
    },
  },
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
</style>
