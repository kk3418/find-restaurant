import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import "vuetify/styles";
import "./style/util.css";

createApp(App)
  .use(vuetify)
  .mount("#app");
