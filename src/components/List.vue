<template>
  <div
    class="list-item"
    :distance="item.distance"
    v-for="item in nearbyItems"
    :key="item.place_id"
    @click="openModal(item)"
  >
    <div class="list-item-name">
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
  emits: ["openModal"],
  setup(props, { emit }) {
    const openModal = item => {
      emit("openModal", item);
    };

    return { openModal };
  },
};
</script>
<style scoped>
.list-item {
  position: relative;
  font-size: 0.9rem;
  color: #fff;
  line-height: 2rem;
  box-shadow: 0 1px 1px 1px gray;
  cursor: pointer;
  padding: 0 1vw;
  margin-bottom: 1vh;
}
.list-item::after {
  --scale: 0;
  display: block;
  content: " 距離：" attr(distance);
  transform: scale(var(--scale));
  transform-origin: left top;
  transition: 200ms transform;
  padding: 1vw;
  text-align: left;
  max-width: 65%;
  white-space: normal;
  position: absolute;
  top: 0;
  left: 0;
  background-color: grey;
  line-height: normal;
  border-radius: 1rem;
}
.list-item:hover::after {
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
