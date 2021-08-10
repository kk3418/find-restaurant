<template>
  <div class="modal" v-for="item in info" :key="item.name">
    {{ item.name }}
  </div>
</template>
<script>
export default {
  props: {
    info: Array,
  },
  mounted() {
    this.setClick();
  },
  data() {
    return {
      isOpen: [],
    };
  },
  methods: {
    openMdal(index) {
      this.isOpen[index] = !this.isOpne[index];
    },
    setClick() {
      this.props.info.forEach(() => {
        this.isOpen.push(false);
      });
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
