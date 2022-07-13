<template>
  <section class="customSection">
    <div :class="$style.container">
      <SectionDivider heading="Kanallar" />
      <div :class="$style.channelContainer">
        <ChannelItem
          v-for="(channel, index) in store.getters.getChannels"
          :key="index"
          :id="channel.id"
          :channel="channel"
        />
      </div>
    </div>
    <pagination
      v-model="page"
      :records="15"
      :per-page="5"
      @paginate="changePageCallBack"
    />
  </section>
</template>
<script>
import { ref } from "vue";
import "../../assets/paginate.css";
import store from "../../store";
import ChannelItem from "./subComponents/ChannelItem.vue";
import SectionDivider from "./subComponents/SectionDivider.vue";

export default {
  components: { SectionDivider, ChannelItem },
  setup() {
    const page = ref(1);
    const currentPage = ref(1);

    const changePageCallBack = (event) => {
      this.currentPage = event;
    };

    const loading = (state) => {
      store.commit("toggleLoading", state);
    };

    const getChannels = () => {
      if (!store.getters.startNewFetch) return;
      loading(true);
      store
        .dispatch("fetchChannels")
        .then(() => {
          loading(false);
        })
        .catch((error) => {
          console.log(error);
          loading(false);
        });
    };
    getChannels();
    return { page, currentPage, changePageCallBack, store };
  },
};
</script>
<style module>
.channelList {
  max-width: 90%;
  padding: 40px 1.5rem;
  margin: 0 auto;
}

.channelContainer {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  column-gap: 0.5rem;
  row-gap: 1rem;
  margin-top: 2rem;
}

/* media querys */
@media screen and (max-width: 1168px) {
  .channelContainer {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 1168px) {
  .channelContainer {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .channelContainer {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 468px) {
  .channelContainer {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

<!-- paginate style -->
<style scoped>
.page-link {
  background-color: var(--color-divider-bg);
}
</style>
