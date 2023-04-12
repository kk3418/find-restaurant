<template>
  <div class="modal" v-show="isOpen">
    <div class="close-btn" @click="handleClick()">X</div>
    <div class="modal-item">
      <span>{{ nearbyItem?.name }}</span>
    </div>
    <div class="modal-item">
      <img :src="photoSrc" alt="photo" />
    </div>
    <div class="modal-item">
      <span>總共評價數：</span>
      <span>{{ nearbyItem?.user_ratings_total }}</span>
    </div>
    <div class="modal-item">
      <span>{{ `地址：${nearbyItem.vicinity}` }}</span>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
import { getPhoto } from "../fetchData.js";

export default defineComponent({
  name: "InfoModal",
  props: {
    nearbyItem: Object,
    isOpen: Boolean,
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const photoSrc = ref(null);

    const fetchPhoto = async () => {
      try {
        const { photos } = props.nearbyItem;
        if (photos?.length > 0) {
          const photoReference = photos[0].photo_reference;
          const res = await getPhoto({
            photo_reference: photoReference,
            maxwidth: 200,
            maxheight: 150,
          });
          const data = await convertFile(res);
          photoSrc.value = data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    watch(
      () => props.isOpen,
      async shouldFetch => {
        if (shouldFetch && props.isOpen > -1) {
          await fetchPhoto();
        }
      },
    );

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

    return { photoSrc, handleClick };
  },
});
</script>
<style scoped>
.modal {
  position: absolute;
  padding: 3%;
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
}
.modal-item {
  padding: 10px 0;
  width: 94%;
}
.modal-item img {
  object-fit: cover;
}
.close-btn {
  position: absolute;
  cursor: pointer;
  top: 1vh;
  right: 1vw;
}
</style>
