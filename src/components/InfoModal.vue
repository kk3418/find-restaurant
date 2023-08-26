<template>
  <div class="modal">
    <div class="close-btn" @click="handleClick()">
      <span class="material-symbols-outlined">cancel</span>
    </div>
    <div class="title">{{ nearbyItem?.name }}</div>
    <v-carousel v-if="photosSrc?.length > 0" show-arrows="hover" height="200">
      <template v-slot:prev="{ props }">
        <span
          class="material-symbols-outlined custom-arrow"
          @click="props.onClick"
        >
          chevron_left
        </span>
      </template>
      <template v-slot:next="{ props }">
        <span
          class="material-symbols-outlined custom-arrow"
          @click="props.onClick"
        >
          chevron_right
        </span>
      </template>
      <v-carousel-item v-for="photoSrc in photosSrc" :key="photoSrc">
        <div class="modal-item" style="height: 100%;">
          <img :src="photoSrc" alt="photo" />
        </div>
      </v-carousel-item>
    </v-carousel>
    <div v-else class="modal-item">
      <span class="material-symbols-outlined custom-loading">
        progress_activity
      </span>
    </div>
    <div class="icons">
      <span
        class="material-symbols-outlined"
        v-for="type in iconType"
        :key="type"
      >
        {{ restaurantType[type]?.icon }}
      </span>
    </div>
    <div class="modal-item">
      <div>
        <span class="rate">{{ nearbyItem?.rating }}</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="nowrap">評價數 - </span>
        <span>{{ nearbyItem?.user_ratings_total }}</span>
      </div>
      <div>
        <span class="nowrap">地址：</span>
        <a style="color: #fff;" :href="googleMapUrl" target="_blank">
          {{ nearbyItem?.vicinity }}
        </a>
      </div>
      <div :class="{ 'not-open': !openNow }">
        <span class="nowrap">今天開店時間：</span>
        <span>{{ openTime }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { restaurantType } from "../constant/restaurant-type";
import { defineComponent, onMounted, ref, computed } from "vue";
import { getPhoto, getPlaceDetail } from "../fetchData.js";

export default defineComponent({
  name: "InfoModal",
  props: {
    nearbyItem: Object,
    isOpen: Boolean,
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const photosSrc = ref([]);
    const googleMapUrl = ref("");
    const weekday = ref([]);
    const iconType = ref([]);
    const openNow = ref(true);

    const fetchPlace = async () => {
      try {
        const { photos, url, opening_hours, types } = await getPlaceDetail({
          placeId: props.nearbyItem.place_id,
        });
        iconType.value = types;
        googleMapUrl.value = url;
        weekday.value = opening_hours?.weekday_text;
        openNow.value = opening_hours?.open_now;
        photos?.length > 0 &&
          photos.forEach(async photo => {
            const photoReference = photo.photo_reference;
            const res = await getPhoto({
              photo_reference: photoReference,
              maxwidth: 200,
              maxheight: 150,
            });
            const data = await convertFile(res);
            photosSrc.value.push(data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      if (props.isOpen) {
        await fetchPlace();
      }
    });

    function convertFile(imageData) {
      return new Promise(resolve => {
        const blob = new Blob([imageData], { type: "image/jpeg" });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
          // 取得轉換後的 base64 data URL
          const imageUrl = reader.result;
          resolve(imageUrl);
        };
        reader.onerror = error => {
          console.error(error);
        };
      });
    }

    function handleClick() {
      emit("closeModal", props.isOpen, !props.isOpen);
    }

    const openTime = computed(() => {
      const text = weekday.value[(new Date().getDay() + 6) % 7];
      const splitText = text?.split(": ");
      return splitText && splitText[1];
    });

    return {
      photosSrc,
      handleClick,
      googleMapUrl,
      openTime,
      openNow,
      iconType,
      restaurantType,
    };
  },
});
</script>
<style scoped>
.not-open {
  color: red;
}
.modal {
  position: absolute;
  padding: 2%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 45vw;
  max-height: 55vh;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 2;
  background: rgba(133, 45, 88, 0.9);
  color: white;
  border-radius: 5%;
}
.modal-item {
  display: grid;
  place-content: center;
  padding: 10px 0;
  gap: 10px;
}
.modal-item img {
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.6);
}
.modal-item .nowrap {
  white-space: nowrap;
}
.icons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.title {
  font-size: 1.5rem;
  text-align: center;
  font-weight: bolder;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: normal;
  max-height: 5rem;
}
.rate {
  color: yellow;
  font-weight: bold;
}
.close-btn {
  position: absolute;
  cursor: pointer;
  top: 2vh;
  right: 2vw;
}
.custom-arrow {
  font-size: 2rem;
  cursor: pointer;
}
.custom-loading {
  font-size: 3rem;
  animation: rotate 1.5s ease-in-out infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(358deg);
  }
}
@media (max-width: 800px) {
  .title {
    font-size: 1.3rem;
  }
  .modal {
    width: 70vw;
    font-size: 0.9rem;
  }
  .close-btn {
    top: 1vh;
  }
}
</style>
