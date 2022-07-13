import { createStore } from "vuex";
import utilStore from "./utilsStore";
import channelStore from "./channelStore";
import authStore from "./authStore";

// Create a new store instance.
const store = createStore({
  modules: {
    util: utilStore,
    channel: channelStore,
    auth:authStore,
  },
});

export default store;
