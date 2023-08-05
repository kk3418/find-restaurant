<template>
  <div class="group">
    <v-btn
      :active="activeItem === 'restaurant'"
      @click="handleSelect('restaurant')"
    >
      <template v-slot:default>
        <span class="material-symbols-outlined">restaurant</span>
      </template>
    </v-btn>
    <v-btn :active="activeItem === 'bar'" @click="handleSelect('bar')">
      <template v-slot:default>
        <span class="material-symbols-outlined">local_bar</span>
      </template>
    </v-btn>
    <v-btn :active="activeItem === 'cafe'" @click="handleSelect('cafe')">
      <template v-slot:default>
        <span class="material-symbols-outlined">local_cafe</span>
      </template>
    </v-btn>
  </div>
</template>
<script>
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

    return { activeItem, handleSelect };
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
