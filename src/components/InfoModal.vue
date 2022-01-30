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
      <span>總共評價數：</span>
      <span>{{ item?.user_ratings_total }}</span>
    </div>
    <div class="modal-item">
      <span>{{ `地址：${item.vicinity}` }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "InfoModal",
  props: {
    nearbyItems: Array,
    isOpen: Array,
  },
  emits: ["updateModal"],
  methods: {
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
.close-btn {
  position: absolute;
  cursor: pointer;
  top: 1vh;
  right: 1vw;
}
</style>
