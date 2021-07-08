<template>
  <div class="list-item" v-for="item in results" :key="item.place_id">
    <div class="list-item-name" :data-name="item.rating">
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
    results: Array,
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
}
.list-item-name::after {
  --scale: 0;
  display: block;
  content: attr(data-name);
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
  background-color: gray;
  z-index: 3;
}
.list-item-name:hover::after {
  --scale: 1;
}
.list-item-name {
  display: block;
  padding: 0 1vw;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.is-open {
  color: black;
}
.is-close {
  color: darkblue;
}
</style>
