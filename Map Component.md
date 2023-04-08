# Map Component

This Vue component renders a Google Map with nearby places displayed as markers on the map. It also features a list of the nearby places that can be expanded and sorted.

```vue
<script>
// import required functions from fetchdata.js
import { nearbySearch, distanceMatrix } from "../fetchData";
// import child components
import List from "./List.vue";
import InfoModal from "./InfoModal";
// import vue functions
import { ref, computed, onMounted } from "vue";

export default {
  components: { List, InfoModal },
  setup() {
    // declare reactive data
    const nearbySearchResult = ref(null);
    const distances = ref(null);
    const script = ref(null);
    const center = ref(
      window.localStorage.getItem("center")
        ? JSON.parse(window.localStorage.getItem("center"))
        : { lat: 25.01, lng: 121.521 },
    );
    const map = ref(null);
    const myMap = ref(null);
    const markers = ref([]);
    const isModalOpen = ref([]);
    const ascending = ref(true);
    const listExpanded = ref(true);

    // compute nearby items with distance property
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

    // update modal open/close
    const updateModal = (updateItem, index) => {
      isModalOpen.value[index] = updateItem;
      for (let i = 0; i < isModalOpen.value.length; i++) {
        if (i === index) continue; // skip current item
        isModalOpen.value[i] = false;
      }
    };

    // function to initialize map
    const initial = () => {
      script.value = document.createElement("script");
      script.value.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_KEY}&callback=initMap`;
      script.value.async = true;
      window.initMap = initMap;
      document.head.appendChild(script.value);
    };

    // function to toggle visibility of all markers
    const setMarkerVisible = isVisible => {
      for (let i = 0; i < markers.value.length; i++) {
        markers.value[i].setVisible(isVisible);
      }
    };

    // function to initialize map
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
      map.value = map;
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

    // function to handle nearby places
    const handleNearbyItems = async () => {
      setMarkerVisible(false);
      const googleMaps = window.google.maps;
      const marker = new googleMaps.Marker({
        position: center.value,
        map: map.value,
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

    // function to handle list sorting
    const handleSort = () => {
      ascending.value = !ascending.value;
    };

    // function to toggle list expand/collapse
    const handleToggle = () => {
      listExpanded.value = !listExpanded.value;
      const list = document.querySelector(".list").classList;
      if (listExpanded.value) {
        list.remove("expand");
      } else {
        list.add("expand");
      }
    };

    // run initial function when mounted
    onMounted(() => {
      initial();
    });

    // return all data and functions to use in component
    return {
      nearbyItems,
      isModalOpen,
      ascending,
      listExpanded,
      updateModal,
      initial,
      handleSort,
      handleToggle,
      handleNearbyItems,
      myMap,
    };
  },
};
</script>
```