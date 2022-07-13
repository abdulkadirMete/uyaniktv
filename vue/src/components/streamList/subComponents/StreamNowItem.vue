<template>
  <router-link :class="$style.streamNow" :to="`/`">
    <div :class="$style.container">
      <!-- info -->
      <div :class="$style.info">
        <circle-progress
          :is-bg-shadow="false"
          :show-percent="true"
          :percent="channel.progress"
          fill-color="#0faed9"
          :class="$style.progressBar"
        />
        <ul :class="$style.altInfo">
          <li :class="$style.altInfoItem">
            <!-- yayın saati -->
            <span :class="$style.currentStreamTitle">{{
              channel.streamNow.title
            }}</span>
            <div :class="$style.currentStreamInfo">
              <span :class="$style.itemHeading">Yayın Aralığı: </span>
              <span :class="$style.itemValue">{{
                channel.streamNow.start + "-" + channel.streamNow.end
              }}</span>
            </div>
            <!-- sonraki program  -->
            <div :class="$style.nextStream">
              <span :class="$style.nextStreamHeading">Sıradaki</span>
              <div :class="$style.nextStreamInfo">
                <!-- sonraki saat -->
                <span :class="$style.nextStreamTitle">{{
                  channel.next + ": "
                }}</span>
                <span :class="$style.itemValue">{{
                  channel.streamNow.start + "-" + channel.nextEnd
                }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div :class="$style.channelImgContainer">
        <img :src="channel.img" alt="channel" :class="$style.channelImg" />
      </div>
    </div>
  </router-link>
</template>
<script>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

export default {
  components: { CircleProgress },

  props: {
    channel: Object,
    id: Number,
  },
  setup() {
    const toast = (message, type) => {
      createToast(message, { type: type });
      return { toast };
    };
  },
};
</script>

<style>
.vue3-circular-progressbar {
  width: 80px !important;
  height: 80px !important;
  display: flex;
  align-items: center;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.current-counter {
  color: var(--color-white) !important;
  font-weight: 700;
}
</style>

<style module>
.streamNow {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  cursor: pointer;
}

.container {
  display: flex;
}

.info {
  display: flex;
  padding: 1rem;
  background-color: var(--color-divider-bg);
}

/* progress bar */

.progressBar > svg {
  width: 60px;
  height: 60px;
}

/* channel img */
.channelImgContainer {
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.channelImg {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

/* alt info */
.altInfo {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.altInfoItem {
  color: var(--color-white);
}

/* currentStream */

.currentStreamTitle {
  font-size: var(--font-size-xl);
  font-weight: 500;
}

.currentStreamInfo {
  margin-top: 5px;
  display: flex;
  column-gap: 5px;
}

.itemHeading {
  color: var(--color-light-gray);
}

.itemValue {
  color: var(--color-white);
}

.nextStream {
  margin-top: 1.5rem;
}

.nextStreamHeading {
  background-color: var(--color-gray);
  border-radius: var(--border-radius-sm);
  padding: 5px;
  color: var(--color-black-mute);
  font-weight: 500;
}

.nextStreamInfo {
  margin-top: 5px;
}

.nextStreamTitle {
  font-size: var(--font-size-l);
  font-weight: 500;
  color: var(--color-highlight-text2);
}

@media screen and (max-width: 568px) {
  .container {
    flex-direction: column-reverse;
  }
}

@media screen and (max-width: 468px) {
  .progressBar {
    display: none;
  }
}
</style>
