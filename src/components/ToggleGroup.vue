<template>
  <div class="group">
    <v-btn
      v-for="item in restaurantType"
      :key="item.value"
      :active="activeItem === item.value"
      @click="handleSelect(item.value)"
    >
      <template v-slot:default>
        <span class="material-symbols-outlined">{{ item.icon }}</span>
      </template>
    </v-btn>
  </div>
</template>
<script>
import { restaurantType } from "../constant/restaurant-type";
import { ref } from "vue";
export default {
  name: "toggle-group",
  props: { modelValue: String },
  setup(props, { emit }) {
    const activeItem = ref(props.modelValue);

    const handleSelect = item => {
      activeItem.value = item;
      emit("update:modelValue", item);
    };

    return { activeItem, handleSelect, restaurantType };
  },
};
</script>
<style scoped>
.group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
  height: 5vh;
  box-shadow: 0 1px 1px 1px gray;
}
</style>
