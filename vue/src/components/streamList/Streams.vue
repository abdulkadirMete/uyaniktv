<template>
  <section
    class="customSection"
    @mouseenter="this.$store.commit('toggleDropdown', false)"
  >
    <SectionDivider heading="Yayında Olanlar" />
    <div :class="$style.container">
      <StreamNowItem
        v-for="(channel, index) in dummyStream"
        :key="index"
        :id="index"
        :channel="channel"
      />
    </div>
  </section>
</template>
<script>
import SectionDivider from "../channelList/subComponents/SectionDivider.vue";
import { dummyStream } from "../../data/dummyData";
import StreamNowItem from "./subComponents/StreamNowItem.vue";

export default {
  components: { SectionDivider, StreamNowItem },
  data() {
    return {
      dummyStream,
    };
  },
};
</script>

<style module>
.streams {
  box-shadow: inset 0px 7px 3px -3px rgba(50, 50, 50, 0.75);
}

.container {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 1rem;
  column-gap: 1.5rem;
}

@media screen and (max-width: 1368px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 968px) {
  .container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
