<template>
  <div
    class="list-item"
    v-for="(item, index) in nearbyItems"
    :key="item.place_id"
    @click="openModal(index)"
  >
    <div class="list-item-name" :rating="item.rating" :distance="item.distance">
      {{ item.name }}
    </div>
    <div class="is-open" v-if="item?.opening_hours?.open_now">
      營業中
    </div>
    <div class="is-close" v-else>
      休息
    </div>
  </div>
</template>
<script>
export default {
  name: "List",
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
    openModal(index) {
      this.isOpen[index] = !this.isOpen[index];
      this.$emit("updateModal", this.isOpen[index], index);
    },
  },
};
</script>
<style scoped>
.list-item {
  position: relative;
  font-size: 0.9rem;
  color: #fff;
  line-height: 2rem;
  box-shadow: 1px 1px 2px 1px gray;
  cursor: pointer;
  padding: 0 1vw;
}
.list-item-name::after {
  --scale: 0;
  display: block;
  content: "分數：" attr(rating) " 距離：" attr(distance);
  transform: scale(var(--scale));
  transform-origin: left top;
  transition: 200ms transform;
  padding: 2% 5%;
  text-align: left;
  max-width: 55%;
  white-space: normal;
  position: absolute;
  top: 5%;
  left: 3%;
  background-color: grey;
}
.list-item-name:hover::after {
  --scale: 1;
}
.list-item-name {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.is-open {
  color: black;
}
.is-close {
  color: darkblue;
}
</style>
