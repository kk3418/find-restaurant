<template>
  <div
    class="modal"
    v-for="(item, index) in nearbyItems"
    :key="`info-${item.place_id}`"
    v-show="isOpen[index]"
  >
    <div>{{ item?.name }}</div>
    <img :src="item?.icon" alt="icon" />
  </div>
</template>
<script>
export default {
  name: "InfoModal",
  props: {
    nearbyItems: Array,
  },
  data() {
    return {
      isOpen: [],
    };
  },
  mounted() {
    this.initialIsOpen();
  },
  unmounted() {
    this.isOpen = [];
  },
  methods: {
    initialIsOpen() {
      this.props?.nearbyItems.forEach(() => {
        this.isOpen.push(false);
      });
    },
    openMdal(index) {
      this.isOpen[index] = !this.isOpne[index];
    },
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
