import { ref } from "vue";

export default function useGeolocation() {
  const location = ref(null);
  const error = ref(null);

  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          location.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve({ location, error });
        },
        err => {
          error.value = err.message;
          reject(error.value);
        },
      );
    } else {
      error.value = "你的瀏覽器不支援地理位置";
      reject(error.value);
    }
  });
}
