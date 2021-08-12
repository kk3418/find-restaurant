<template>
  <div
    class="modal"
    v-for="(item, index) in nearbyItems"
    :key="`info-${item.place_id}`"
    v-show="isOpen[index]"
  >
    <div>{{ item?.name }}</div>
    <div>{{ `評價：${item.rating}` }}</div>
    <div>{{ `地址：${item.vicinity}` }}</div>
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vmin;
  height: 40vmin;
  z-index: 2;
  background: blue;
  color: white;
}
</style>
