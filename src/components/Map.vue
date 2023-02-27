<template>
  <div ref="map" id="map"></div>
  <div class="sort" @click="handleSort"><span>sort</span></div>
  <div class="toggle" @click="handleToggle">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#FFFFFF"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z" />
    </svg>
  </div>
  <div class="list expand" v-if="nearbyItems.length > 0">
    <List :nearbyItems="nearbyItems" @updateModal="updateModal" />
  </div>
  <InfoModal
    :nearbyItems="nearbyItems"
    @updateModal="updateModal"
    :isOpen="isModalOpen"
  />
</template>
<script>
import List from "./List.vue";
import InfoModal from "./InfoModal";
import { nearbySearch, distanceMatrix } from "../fetchData";

export default {
  name: "Map",
  components: {
    List,
    InfoModal,
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
      isModalOpen: [],
      ascending: true,
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
      if (!this.ascending) {
        return result.reverse();
      }
      return result;
    },
  },
  methods: {
    updateModal(updateItem, index) {
      this.isModalOpen[index] = updateItem;
      for (let i = 0; i < this.isModalOpen.length; i++) {
        if (i === index) continue;
        this.isModalOpen[i] = false;
      }
    },
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
        fullscreenControl: false,
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
    handleSort() {
      this.ascending = !this.ascending;
    },
    handleToggle() {
      const list = document.querySelector(".list").classList;
      if (list.contains("expand")) {
        list.remove("expand");
      } else {
        list.add("expand");
      }
    },
  },
  watch: {
    ascending() {
      this.handleNearbyItems();
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
.list {
  position: absolute;
  width: 25vw;
  height: 50vh;
  z-index: 2;
  background: rgba(255, 0, 0, 0.8);
  top: 15vh;
  right: 10vw;
  overflow-y: scroll;
  box-shadow: 1px 2px 2px 0 black;
  padding: 0.5vh 0;
}
.sort {
  position: absolute;
  top: 12vh;
  right: 11vw;
  width: 10vw;
  height: 3vh;
  z-index: 3;
  background-color: rgba(255, 0, 0, 0.8);
  cursor: pointer;
  display: grid;
  place-content: center;
}
.toggle {
  display: none;
}
@media (max-width: 800px) {
  .sort {
    top: 1vh;
    right: 16vw;
  }
  .toggle {
    display: block;
    position: absolute;
    width: 10vw;
    height: 3vh;
    top: 1vh;
    right: 5vw;
    z-index: 3;
    background-color: rgba(255, 0, 0, 0.8);
  }
  div.expand {
    transform: scale(1);
  }
  .list {
    transform: scale(0);
    transform-origin: right top;
    transition: 200ms transform;
    width: 55vw;
    height: 60vh;
    top: 4vh;
    right: 5vw;
  }
}
</style>
