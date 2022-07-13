import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

// font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

//paginate
import Pagination from "v-pagination-3";

//show notify
import Notifications from "@kyvg/vue3-notification";

// loading component
import Loading from "./components/loading/Loading.vue";

const app = createApp(App)
  .use(router)
  .use(store)
  .use(Notifications)
  .component("loading", Loading)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("pagination", Pagination);

app.mount("#app");
