<template>
  <div
    class="modal"
    v-for="(item, index) in nearbyItems"
    :key="`info-${item.place_id}`"
    v-show="isOpen[index]"
  >
    <div class="close-btn" @click="handleClick(index)">X</div>
    <div class="modal-item">
      <span>{{ item?.name }}</span>
    </div>
    <div class="modal-item">
      <img :src="photoSrc" alt="photo" />
    </div>
    <div class="modal-item">
      <span>總共評價數：</span>
      <span>{{ item?.user_ratings_total }}</span>
    </div>
    <div class="modal-item">
      <span>{{ `地址：${item.vicinity}` }}</span>
    </div>
  </div>
</template>
<script>
import { getPhoto } from "../fetchData.js";
export default {
  name: "InfoModal",
  props: {
    nearbyItems: Array,
    isOpen: Array,
  },
  emits: ["updateModal"],
  data() {
    return {
      photoSrc: null,
    };
  },
  computed: {
    shouldFetch() {
      return this.$props.isOpen?.some(element => element === true);
    },
    photo_reference() {
      const openedItem = this.$props.isOpen?.findIndex(
        element => element === true,
      );
      if (openedItem > -1) {
        const { photos } = this.$props.nearbyItems[openedItem];
        if (photos?.length > 0) {
          return photos[0].photo_reference;
        }
      }
      return null;
    },
  },
  watch: {
    shouldFetch(val) {
      if (val) {
        getPhoto({
          photo_reference: this.photo_reference,
          maxwidth: 200,
          maxheight: 150,
        })
          .then(res => {
            this.convertFile(res)
              .then(data => {
                this.photoSrc = data;
              })
              .catch(error => console.error(error));
          })
          .catch(error => console.error(error));
      }
    },
  },
  methods: {
    convertFile(imageData) {
      return new Promise(resolve => {
        const blob = new Blob([imageData], { type: "image/jpeg" });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
          // 取得轉換後的 base64 data URL
          const imageUrl = reader.result;
          resolve(imageUrl);
        };
      });
    },
    handleClick(index) {
      this.$emit("updateModal", false, index);
    },
  },
};
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
