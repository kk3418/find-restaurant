<template>
  <div ref="myMap" id="map"></div>
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
    <List :nearbyItems="nearbyItems" @openModal="openModal" />
  </div>
  <InfoModal
    v-for="item in nearbyItems"
    :key="item.place_id"
    :nearbyItem="item"
    @closeModal="closeModal(item.place_id)"
    :isOpen="isModalOpen[item.place_id]"
  />
</template>
<script>
import { ref, computed, onMounted } from "vue";
import List from "./List.vue";
import InfoModal from "./InfoModal";
import { nearbySearch, distanceMatrix } from "../fetchData";

export default {
  components: { List, InfoModal },
  setup() {
    const nearbySearchResult = ref(null);
    const distances = ref(null);
    const script = ref(null);
    const center = ref(
      window.localStorage.getItem("center")
        ? JSON.parse(window.localStorage.getItem("center"))
        : { lat: 25.01, lng: 121.521 },
    );
    const mapInstance = ref(null);
    const myMap = ref(null);
    const markers = ref([]);
    const isModalOpen = ref({});
    const ascending = ref(true);
    const listExpanded = ref(true);

    const nearbyItems = computed(() => {
      let result = [];
      if (nearbySearchResult.value && distances.value) {
        nearbySearchResult.value.forEach((item, index) => {
          result.push({
            ...item,
            distance: distances.value[index],
          });
        });
      }
      if (!ascending.value) {
        return result.reverse();
      }
      return result;
    });

    const openModal = item => {
      isModalOpen.value[item.place_id] = true;
    };

    const closeModal = place_id => {
      isModalOpen.value[place_id] = false;
    };

    const initial = () => {
      script.value = document.createElement("script");
      script.value.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_KEY}&callback=initMap`;
      script.value.async = true;
      window.initMap = initMap;
      document.head.appendChild(script.value);
    };

    const setMarkerVisible = isVisible => {
      for (let i = 0; i < markers.value.length; i++) {
        markers.value[i].setVisible(isVisible);
      }
    };

    const initMap = () => {
      const mapOptions = {
        center: center.value,
        zoom: 15,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
      };
      const googleMaps = window.google.maps;
      const map = new googleMaps.Map(myMap.value, mapOptions);
      mapInstance.value = map;
      const firstMarker = new googleMaps.Marker({
        position: center.value,
        map: map,
      });
      markers.value.push(firstMarker);
      handleNearbyItems();
      map.addListener("bounds_changed", () => {
        center.value = { lat: map.center.lat(), lng: map.center.lng() };
        window.localStorage.setItem("center", JSON.stringify(center.value));
      });
      map.addListener("dragend", handleNearbyItems);
    };

    const handleNearbyItems = async () => {
      setMarkerVisible(false);
      const googleMaps = window.google.maps;
      const marker = new googleMaps.Marker({
        position: center.value,
        map: mapInstance.value,
      });
      markers.value.push(marker);
      try {
        nearbySearchResult.value = await nearbySearch(center.value);
        distances.value = await distanceMatrix({
          origins: [center.value],
          destinations: nearbySearchResult.value.map(v => v.geometry.location),
        });
      } catch (error) {
        console.error("handle error", error);
      }
    };

    const handleSort = () => {
      ascending.value = !ascending.value;
    };

    const handleToggle = () => {
      listExpanded.value = !listExpanded.value;
      const list = document.querySelector(".list").classList;
      if (listExpanded.value) {
        list.remove("expand");
      } else {
        list.add("expand");
      }
    };

    onMounted(() => {
      initial();
    });

    return {
      isModalOpen,
      nearbyItems,
      ascending,
      listExpanded,
      openModal,
      closeModal,
      initial,
      handleSort,
      handleToggle,
      handleNearbyItems,
      myMap,
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
