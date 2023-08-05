import { createVuetify } from "vuetify";
import { VDialog } from "vuetify/components/VDialog";
import { VCarousel, VCarouselItem } from "vuetify/components/VCarousel";
import { VBtn } from "vuetify/components/VBtn";

export default createVuetify({
  aliases: {
    VDialog: VDialog,
    VCarousel: VCarousel,
    VCarouselItem: VCarouselItem,
    VBtn: VBtn,
  },
  defaults: {
    VBtn: {
      variant: "text",
      density: "comfortable",
      rounded: true,
    },
  },
});
