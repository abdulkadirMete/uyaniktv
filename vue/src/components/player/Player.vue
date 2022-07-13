<template>
  <div :class="$style.container">
    <StreamDates v-if="!hideControllers" />
    <div :class="$style.playerContainer" ref="playerContainer">
      <!-- settings indicator -->
      <div
        :class="[$style.settingsIndicator, { [$style.show]: showIndicator }]"
      >
        <ul :class="$style.indicatorMenu">
          <li :class="$style.indicatorItem">
            <span
              class="material-symbols-outlined"
              :class="$style.controllersIcon"
            >
              hd
            </span>
            <span :class="$style.indicatorText">Yüksek Kalite</span>
          </li>
          <li :class="$style.indicatorItem">
            <span
              class="material-symbols-outlined"
              :class="$style.controllersIcon"
            >
              cast
            </span>
            <span :class="$style.indicatorText">Canlı Yayın</span>
          </li>
          <li :class="$style.indicatorItem">
            <font-awesome-icon
              icon="fa-solid fa-backward"
              :class="$style.controllersIcon"
            />
            <span :class="$style.indicatorText">24 Saat Geri</span>
          </li>
        </ul>
      </div>
      <!-- settings indicator end -->
      <video
        ref="videoRef"
        :class="$style.video"
        v-on:loadeddata="loadVideoDuration"
      ></video>
      <div :class="$style.playerAlt">
        <!-- progress stick -->
        <input
          :class="$style.progressStick"
          type="range"
          min="0"
          max="1800"
          v-model="currentVideoTime"
        />
        <!-- controllers container -->
        <div :class="$style.controllersContainer">
          <div :class="$style.streamControllers">
            <!-- replay 5 -->
            <span
              class="material-symbols-outlined"
              :class="$style.controllersIcon"
              @click="rewind(300)"
            >
              replay_5
            </span>
            <!-- replay 1 -->
            <font-awesome-icon
              icon="fa-solid fa-backward-step"
              :class="$style.controllersIcon"
              @click="rewind(60)"
            />

            <!-- play  -->
            <font-awesome-icon
              v-if="!isPlay"
              icon="fa-solid fa-play"
              :class="$style.controllersIcon"
              @click="play"
            />

            <!-- pause -->
            <span
              v-if="isPlay"
              class="material-symbols-outlined"
              :class="$style.controllersIcon"
              @click="pause"
            >
              pause
            </span>

            <!-- forward 1 -->
            <font-awesome-icon
              icon="fa-solid fa-forward-step"
              :class="$style.controllersIcon"
              @click="forward(60)"
            />

            <!-- forward 5 -->
            <span
              class="material-symbols-outlined"
              :class="$style.controllersIcon"
              @click="forward(300)"
            >
              forward_5
            </span>

            <!-- volumes and stream -->
            <div :class="$style.volumeGroup">
              <!-- volume open  -->
              <span
                v-if="isMute"
                class="material-symbols-outlined"
                :class="$style.controllersIcon"
              >
                volume_up
              </span>
              <!-- volume close -->
              <span
                v-else
                class="material-symbols-outlined"
                :class="[$style.controllersIcon]"
              >
                volume_off
              </span>
              <!-- volume progress -->
              <input
                :class="$style.volumeStick"
                type="range"
                min="0"
                max="100"
                class="volume_range"
                @change="changeVolume($event.target.value)"
                :value="volume"
              />
            </div>
          </div>
          <div :class="$style.screenController">
            <!-- timer -->
            <span :class="$style.timer">{{ streamInfo || "Canlı" }}</span>

            <!-- settings -->
            <font-awesome-icon
              icon="fa-solid fa-gear"
              :class="$style.controllersIcon"
              @click="() => (showIndicator = !showIndicator)"
            />

            <!-- maximize -->
            <font-awesome-icon
              v-if="!isFullScreen"
              icon="fa-solid fa-maximize"
              :class="$style.controllersIcon"
              @click="toggleScreen"
            />
            <!-- minimize -->
            <font-awesome-icon
              v-if="isFullScreen"
              icon="fa-solid fa-minimize"
              :class="$style.controllersIcon"
              @click="toggleScreen"
            />
          </div>
        </div>
        <!-- end of controllers -->
      </div>
    </div>
    <PlayerChannels v-if="!hideControllers" />
  </div>
</template>
<script>
import Hls from "hls.js";
import { ref, watch, computed } from "vue";
import { secondToStringDate } from "../../helpers/helpers";
import PlayerChannels from "./subComponents/playerChannels/PlayerChannels.vue";
import StreamDates from "./subComponents/playerFeatures/StreamDates.vue";

export default {
  components: { PlayerChannels, StreamDates },
  props: {
    streamUrl: String,
  },

  setup(props) {
    // init variables
    let isPlay = ref(false);
    const videoRef = ref(null);
    const playerContainer = ref(null);
    let volume = ref(30);
    let currentVideoTime = ref(1800);
    let isFullScreen = ref(false);
    let streamInfo = ref("");
    let hideControllers = ref(false);
    let showIndicator = ref(false);

    // play
    const play = () => {
      videoRef.value.play();
      isPlay.value = true;
      let hls = new Hls();
      let video = videoRef.value;
      hls.loadSource(props.streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    };

    // pause
    const pause = () => {
      videoRef.value.pause();
      isPlay.value = false;
    };

    // forward
    const forward = (value) => {
      videoRef.value.currentTime += value;
    };

    // rewind
    const rewind = (value) => {
      videoRef.value.currentTime -= value;
    };

    //toggle screen
    const toggleScreen = () => {
      isFullScreen.value = !isFullScreen.value;

      if (isFullScreen.value) {
        playerContainer.value.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    };

    // change volume
    const changeVolume = (e) => {
      volume.value = e;
      videoRef.value.volume = volume.value / 100 || 0;
    };

    const isMute = computed(() => volume.value != 0);

    // change timer
    watch(currentVideoTime, (newTime, oldTime) => {
      const timeDif = newTime - (oldTime || 1800);
      const absoluteDif = Math.abs(timeDif);
      timeDif < 0 ? rewind(absoluteDif) : forward(absoluteDif);
      streamInfo.value = secondToStringDate(1800 - newTime);
    });

    // watch(isPlay, (newValue, oldValue) => {
    //   if (newValue) {
    //     const timeout = setTimeout(() => {
    //       hideControllers.value = true;
    //     }, 3000);
    //   } else {
    //     hideControllers.value = false;
    //   }
    // });

    return {
      play,
      pause,
      isPlay,
      videoRef,
      rewind,
      forward,
      volume,
      changeVolume,
      currentVideoTime,
      toggleScreen,
      playerContainer,
      isFullScreen,
      streamInfo,
      hideControllers,
      showIndicator,
      isMute,
    };
  },
};
</script>

<style module>
/* settings indicator */

.settingsIndicator {
  position: absolute;
  background-color: #333333;
  z-index: 2;
  right: 1rem;
  bottom: 70px;
  height: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.show {
  height: auto;
}

.indicatorMenu {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.indicatorItem {
  display: flex;
  align-items: center;
  column-gap: 1rem;
  cursor: pointer;
  padding: 0.5rem;
}

.indicatorItem:hover {
  color: var(--color-white) !important;
  background-color: var(--color-divider-bg);
  border-radius: var(--border-radius-sm);
}

.indicatorText {
  color: var(--color-light-gray);
  font-size: var(--font-size-l);
}

.container {
  display: flex;
  margin: 0 auto;
}

.playerContainer {
  flex: 6;
  display: flex;
  margin: 0 auto;
  background-color: var(--color-black);
  flex-direction: column;
  position: relative;
  height: var(--player-height);
  width: var(player-max-width);
  object-fit: fill;
  margin-bottom: 40px;
  max-width: var(--player-max-width);
}

/* video */
.video {
  background-color: var(--color-black-mute);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  object-fit: contain;
}

/* player alt */

.playerAlt {
  margin-top: auto;
  height: 70px;
  display: flex;
  flex-direction: column;
}

.progressStick {
  width: 100%;
  height: 12px;
  accent-color: #197b99;
  z-index: 2;
}

/* controllers */
.controllersContainer {
  flex: 2;
  background-color: darkblue;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  background-color: black;
  align-items: center;
  widows: 100%;
}

.streamControllers {
  display: flex;
  align-items: center;
  column-gap: 1.5rem;
  margin-right: auto;
}

/* icons */
.controllersIcon {
  color: var(--color-light-gray);
  font-size: var(--small-icon-size);
  cursor: pointer;
}
.controllersIcon:hover {
  color: white;
}

.disable {
  display: none;
}

/* volume group */
.volumeGroup {
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
}

.volumeTrack {
  width: 100px;
  height: 8px;
  background-color: var(--color-light-gray);
  margin-left: 5px;
  cursor: pointer;
}

.volumeStick {
  accent-color: #197b99;
}

/* screen and stream */
.timer {
  color: var(--color-light-gray);
  font-size: var(--font-size-ml);
  font-weight: 500;
  margin-left: 10px;
}

.screenController {
  display: flex;
  column-gap: 2.5rem;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .controllersIcon {
    font-size: var(--small-icon-size);
  }

  .volumeGroup {
    margin-left: 1rem;
  }

  .volumeTrack {
    display: none;
  }
}
</style>
