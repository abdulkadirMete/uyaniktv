<template>
  <div
    :class="$style.container"
    @mouseenter="this.$store.commit('toggleDropdown', false)"
  >
    <PlayerHeading
      :channelImg="store.getters.getSingleChannel.img"
      :channelName="store.getters.getSingleChannel.title"
    />
    <Player :streamUrl="store.getters.getSingleChannel.streamLink" />
  </div>
</template>
<script setup>
import { notify } from "@kyvg/vue3-notification";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Player from "../components/player/Player.vue";
import PlayerHeading from "../components/playerHeading/PlayerHeading.vue";

const route = useRoute();
const store = useStore();
const id = route.params.id;

// loading
const loading = (state) => {
  store.commit("toggleLoading", state);
};

loading(true);
store
  .dispatch("fetchSingleChannel", id)
  .then(() => loading(false))
  .catch((error) => {
    loading(false);
    notify(notifyMaker("Bir hata oluştu daha sonra tekrar deneyiniz", "error"));
  });
</script>
<style module>
.container {
  max-width: 90%;
  margin: 0 auto;
}
</style>
