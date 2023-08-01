import { createVuetify } from "vuetify";
import { VDialog } from "vuetify/components/VDialog";
import { VCarousel, VCarouselItem } from "vuetify/components/VCarousel";

export default createVuetify({
  aliases: {
    VDialog: VDialog,
    VCarousel: VCarousel,
    VCarouselItem: VCarouselItem,
  },
  defaults: {},
});
