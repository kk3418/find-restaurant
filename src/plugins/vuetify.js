import { createVuetify } from "vuetify";
import { VDialog } from "vuetify/lib/components/VDialog";
import { VCarousel, VCarouselItem } from "vuetify/lib/components/VCarousel";
import { VBtn } from "vuetify/lib/components/VBtn";

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
