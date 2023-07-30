<template>
  <div class="modal">
    <div class="close-btn" @click="handleClick()">
      <span class="material-symbols-outlined">cancel</span>
    </div>
    <div class="modal-item title">
      <span>{{ nearbyItem?.name }}</span>
    </div>
    <div class="modal-item" v-for="photoSrc in photosSrc" :key="photoSrc">
      <img :src="photoSrc" alt="photo" />
    </div>
    <div class="modal-item">
      <div class="rate">{{ nearbyItem?.rating }}</div>
      <div>
        <span class="nowrap">總共評價數：</span>
        <span>{{ nearbyItem?.user_ratings_total }}</span>
      </div>
      <div>
        <span class="nowrap">地址：</span>
        <span>{{ nearbyItem.vicinity }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import { getPhoto } from "../fetchData.js";

export default defineComponent({
  name: "InfoModal",
  props: {
    nearbyItem: Object,
    isOpen: Boolean,
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const photosSrc = ref([]);

    const fetchPhoto = async () => {
      try {
        const { photos } = props.nearbyItem;
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
        await fetchPhoto();
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

    return { photosSrc, handleClick };
  },
});
</script>
<style scoped>
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
  object-fit: cover;
}
.modal-item .nowrap {
  white-space: nowrap;
}
.title {
  font-size: 1.5rem;
  text-align: center;
  font-weight: bolder;
}
.rate {
  color: yellow;
  font-weight: bold;
  justify-self: center;
}
.close-btn {
  position: absolute;
  cursor: pointer;
  top: 2vh;
  right: 2vw;
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
