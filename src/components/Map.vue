<template>
  <div ref="myMap" id="map"></div>
  <div class="sort" @click="handleSort">
    <span v-show="ascending" class="material-symbols-outlined">
      expand_more
    </span>
    <span v-show="!ascending" class="material-symbols-outlined">
      expand_less
    </span>
  </div>
  <div class="toggle" @click="handleToggle">
    <span class="material-symbols-outlined">menu</span>
  </div>
  <div ref="myList" class="list">
    <List :nearbyItems="nearbyItems" @openModal="openModal" />
  </div>
  <div class="current-btn" @click="getCurrentLatLng()">
    <span class="material-symbols-outlined">
      point_scan
    </span>
  </div>
  <v-dialog
    v-for="item in nearbyItems"
    :key="item.place_id"
    v-model="isModalOpen[item.place_id]"
  >
    <InfoModal
      :nearbyItem="item"
      @closeModal="closeModal(item.place_id)"
      :isOpen="isModalOpen[item.place_id]"
    />
  </v-dialog>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import useGeolocation from "../hooks/useGeolocation";
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
    const myList = ref(null);
    const isListExpand = ref(false);
    const activeModal = ref(null);

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
      if (activeModal.value) {
        closeModal(activeModal.value?.place_id);
      }
      activeModal.value = item;
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
      if (!isVisible) {
        for (let i = 0; i < markers.value.length; i++) {
          markers.value[i].setVisible(isVisible);
          markers.value[i].setMap(null);
        }
        markers.value = [];
      }
    };

    const initMap = async () => {
      try {
        const { location } = await useGeolocation();
        center.value = location.value;
      } catch (e) {
        console.error(e);
      }
      const mapOptions = {
        center: center.value,
        zoom: 15,
        minZoom: 13,
        maxZoom: 17,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
      };
      const googleMaps = window.google.maps;
      const map = new googleMaps.Map(myMap.value, mapOptions);
      mapInstance.value = map;
      handleNearbyItems();
      map.addListener("bounds_changed", () => {
        center.value = { lat: map.center.lat(), lng: map.center.lng() };
        window.localStorage.setItem("center", JSON.stringify(center.value));
      });
      map.addListener("dragend", handleNearbyItems);
    };

    const handleNearbyItems = async () => {
      setMarkerVisible(false);
      try {
        nearbySearchResult.value = await nearbySearch(center.value);
        distances.value = await distanceMatrix({
          origins: [center.value],
          destinations: nearbySearchResult.value.map(v => v.geometry.location),
        });
        const googleMaps = window.google.maps;
        nearbySearchResult.value.forEach(item => {
          const marker = new googleMaps.Marker({
            position: item.geometry.location,
            map: mapInstance.value,
          });
          marker.addListener("click", () => {
            openModal(item);
          });
          markers.value.push(marker);
        });
      } catch (error) {
        console.error("handle error", error);
      }
    };

    const getCurrentLatLng = async () => {
      try {
        const { location } = await useGeolocation();
        center.value = location.value;
        handleNearbyItems();
        mapInstance.value.setCenter(location.value);
      } catch (e) {
        console.error(e);
      }
    };

    const handleSort = () => {
      ascending.value = !ascending.value;
    };

    const handleToggle = () => {
      const list = myList.value.classList;
      if (isListExpand.value) {
        list.remove("expand");
      } else {
        list.add("expand");
      }
      isListExpand.value = !isListExpand.value;
    };

    onMounted(() => {
      initial();
    });

    return {
      isModalOpen,
      nearbyItems,
      ascending,
      openModal,
      closeModal,
      initial,
      getCurrentLatLng,
      handleSort,
      handleToggle,
      handleNearbyItems,
      myMap,
      myList,
    };
  },
};
</script>
<style scoped>
#map {
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
}
.list {
  position: absolute;
  width: 25vw;
  height: 50vh;
  z-index: 2;
  background: rgba(255, 0, 0, 0.8);
  top: 16vh;
  right: 10vw;
  overflow-y: scroll;
  box-shadow: 1px 1px 1px 0 black;
  border-radius: 3%;
  padding: 0.5vh 0;
}
.sort {
  position: absolute;
  top: 12vh;
  right: 11vw;
  width: 5vw;
  height: 3vh;
  z-index: 3;
  background-color: rgba(255, 0, 0, 0.8);
  cursor: pointer;
  display: grid;
  place-content: center;
  border-radius: 12px;
}
.toggle {
  display: none;
  position: absolute;
  width: 10vw;
  height: 5vh;
  top: 1vh;
  right: 5vw;
  z-index: 3;
  background-color: rgba(255, 0, 0, 0.8);
  place-content: center;
  border-radius: 6px;
}
.current-btn {
  position: absolute;
  width: 5vmin;
  height: 5vmin;
  right: 7vw;
  bottom: 5vh;
  z-index: 3;
  cursor: pointer;
  background-color: gray;
  color: #fae2e2;
  display: grid;
  place-content: center;
  border-radius: 50%;
}
@media (max-width: 800px) {
  .sort {
    width: 10vw;
    height: 5vh;
    top: 1vh;
    right: 20vw;
    border-radius: 6px;
  }
  .toggle {
    display: grid;
  }
  div.expand {
    transform: scale(1);
  }
  .current-btn {
    width: 12vmin;
    height: 12vmin;
  }
  .list {
    transform: scale(0);
    transform-origin: right top;
    transition: 200ms transform;
    width: 55vw;
    top: 6vh;
    right: 5vw;
  }
}
</style>
