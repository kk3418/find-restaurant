<template>
  <div
    class="modal"
    v-for="(item, index) in nearbyItems"
    :key="`info-${item.place_id}`"
    v-show="isOpen[index]"
  >
    <div class="modal-item">
      <span>{{ item?.name }}</span>
    </div>
    <div class="modal-item">
      <img class="restaurant-photo" />
    </div>
    <div class="modal-item">
      <span>總共評價數：</span>
      <span>{{ item?.user_ratings_total }}</span>
    </div>
    <div class="modal-item">{{ `地址：${item.vicinity}` }}</div>
  </div>
</template>
<script>
export default {
  name: "InfoModal",
  props: {
    nearbyItems: Array,
    isOpen: Array,
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
  width: 40vmin;
  height: 40vmin;
  z-index: 2;
  background: rgba(133, 45, 88, 0.9);
  color: white;
}
.modal-item {
  padding: 10px 0;
}
.modal-item:first-child {
  padding: 20px 0 10px;
}
.restaurant-photo {
  width: 200px;
  object-fit: cover;
}
</style>
