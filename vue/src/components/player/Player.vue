<template>
    <div :class="$style.container">
        <StreamDates v-if="!hideControllers" />
        <div :class="$style.playerContainer" ref="mainContainerRef">
            <!-- show tips  -->
            <div
                :class="[$style.tipContainer, { [$style.tipShow]: true }]"
                ref="tipRef"
            >
                <span :class="$style.tipText">{{ tipText }}</span>
                <div :class="$style.triangle"></div>
            </div>
            // end of show tips
            <!-- end of show tips -->
            <!-- settings indicator -->
            <div
                :class="[
                    $style.settingsIndicator,
                    { [$style.show]: showIndicator },
                ]"
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
                :class="[$style.video, { [$style.fullscreen]: isFullScreen }]"
                v-on:loadeddata="loadVideoDuration"
            ></video>
            <div :class="$style.playerAlt" ref="controllersRef">
                <!-- progress stick -->
                <input
                    :class="$style.progressStick"
                    type="range"
                    min="0"
                    :max="recordedVideoDuration"
                    v-model="currentVideoTime"
                />
                <!-- controllers container -->
                <div :class="$style.controllersContainer">
                    <div :class="$style.streamControllers">
                        <!-- replay 5 -->
                        <span
                            class="material-symbols-outlined"
                            :class="$style.controllersIcon"
                            @click="rewind(longRewindForwardNumber)"
                            @mouseover="showTips($event, '5dk geri')"
                            @mouseleave="hideTips"
                        >
                            replay_5
                        </span>
                        <!-- replay 1 -->
                        <font-awesome-icon
                            icon="fa-solid fa-backward-step"
                            :class="$style.controllersIcon"
                            @click="rewind(shortRewindForwardNumber)"
                            @mouseover="showTips($event, '1dk geri')"
                            @mouseleave="hideTips"
                        />

                        <!-- play  -->
                        <font-awesome-icon
                            v-if="!isPlay"
                            icon="fa-solid fa-play"
                            :class="$style.controllersIcon"
                            @click="play"
                            @mouseover="showTips($event, 'Oynat')"
                            @mouseleave="hideTips"
                        />

                        <!-- pause -->
                        <font-awesome-icon
                            icon="fa-solid fa-pause"
                            v-if="isPlay"
                            class="material-symbols-outlined"
                            :class="$style.controllersIcon"
                            @click="pause"
                            @mouseover="showTips($event, 'Durdur')"
                            @mouseleave="hideTips"
                        />

                        <!-- forward 1 -->
                        <font-awesome-icon
                            icon="fa-solid fa-forward-step"
                            :class="$style.controllersIcon"
                            @click="forward(shortRewindForwardNumber)"
                            @mouseover="showTips($event, '1dk ileri')"
                            @mouseleave="hideTips"
                        />

                        <!-- forward 5 -->
                        <span
                            class="material-symbols-outlined"
                            :class="$style.controllersIcon"
                            @click="forward(longRewindForwardNumber)"
                            @mouseover="showTips($event, '5dk ileri')"
                            @mouseleave="hideTips"
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
                                @mouseover="showTips($event, 'Sesi Kapat')"
                                @mouseleave="hideTips"
                                @click="closeVolume"
                            >
                                volume_up
                            </span>
                            <!-- volume close -->
                            <span
                                v-else
                                class="material-symbols-outlined"
                                :class="[$style.controllersIcon]"
                                @mouseover="showTips($event, 'Sesi Aç')"
                                @mouseleave="hideTips"
                                @click="openVolume"
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
                        <span :class="$style.timer">{{
                            streamInfo || "Canlı"
                        }}</span>

                        <!-- settings -->
                        <font-awesome-icon
                            icon="fa-solid fa-gear"
                            :class="$style.controllersIcon"
                            @click="() => (showIndicator = !showIndicator)"
                            @mouseover="showTips($event, 'Ayarlar')"
                            @mouseleave="hideTips"
                        />

                        <!-- maximize -->
                        <font-awesome-icon
                            v-if="!isFullScreen"
                            icon="fa-solid fa-maximize"
                            :class="$style.controllersIcon"
                            @click="toggleScreen"
                            @mouseover="showTips($event, 'Büyüt')"
                            @mouseleave="hideTips"
                        />
                        <!-- minimize -->
                        <font-awesome-icon
                            v-if="isFullScreen"
                            icon="fa-solid fa-minimize"
                            :class="$style.controllersIcon"
                            @click="toggleScreen"
                            @mouseover="showTips($event, 'Küçült')"
                            @mouseleave="hideTips"
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
import { fromEvent, switchMap, tap, timer } from "rxjs";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
    defaultVolumeLevel,
    hideCursorTime,
    longRewindForwardNumber,
    maxVolumeLevel,
    recordedVideoDuration,
    shortRewindForwardNumber,
} from "../../data/options";
import { getElementPosition, secondToStringDate } from "../../helpers/helpers";
import store from "../../store";
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
        const controllersRef = ref(null);
        const mainContainerRef = ref(null);
        let volume = ref(defaultVolumeLevel);
        let currentVideoTime = ref(recordedVideoDuration);
        let isFullScreen = ref(false);
        let streamInfo = ref("");
        let hideControllers = ref(false);
        let showIndicator = ref(false);
        let tipText = ref("");
        let tipRef = ref(null);

        // play
        const play = () => {
            let hls = new Hls();
            hls.loadSource(props.streamUrl);
            hls.attachMedia(videoRef.value);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                videoRef.value.play();
                isPlay.value = true;
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
            if (!isFullScreen.value && document.fullscreenElement === null) {
                mainContainerRef.value.requestFullscreen();
                isFullScreen.value = true;
            } else {
                document.exitFullscreen();
                isFullScreen.value = false;
            }
        };

        // open volume
        const openVolume = () => {
            volume.value = defaultVolumeLevel;
            isMute.value = false;
        };

        const closeVolume = () => {
            volume.value = 0;
            isMute.value = true;
        };

        // change volume
        const changeVolume = (e) => {
            volume.value = e;
            videoRef.value.volume = volume.value / maxVolumeLevel || 0;
        };

        const isMute = computed(() => volume.value != 0);

        // change timer
        watch(currentVideoTime, (newTime, oldTime) => {
            const timeDif = newTime - (oldTime || recordedVideoDuration);
            const absoluteDif = Math.abs(timeDif);
            timeDif < 0 ? rewind(absoluteDif) : forward(absoluteDif);
            streamInfo.value = secondToStringDate(
                recordedVideoDuration - newTime
            );
        });

        // specific key listiners
        const keyListiner = (event) => {
            const key = event.key;
            //   play pause
            if (key === " ") {
                isPlay.value ? pause() : play();
            }
            // esc
            if (key === "Escape") {
            }
        };
        // add listiner
        document.addEventListener("keydown", keyListiner);

        // hide controllers if need
        let observable;
        onMounted(() => {
            observable = fromEvent(document, "mousemove")
                .pipe(
                    tap(() => {
                        videoRef.value.classList.remove("hideCursor");
                        controllersRef.value?.classList.remove("hide");
                    }),
                    switchMap((event) =>
                        timer(hideCursorTime).pipe(
                            tap(() => {
                                videoRef.value.classList.add("hideCursor");
                                controllersRef?.value.classList.add("hide");
                                hideTips();
                            })
                        )
                    )
                )
                .subscribe();
        });
        // remove subscribe
        onBeforeUnmount(() => {
            observable.unsubscribe();
            document.removeEventListener("keydown", keyListiner);
        });

        // show tips on hover
        const showTips = (event, text) => {
            const position = getElementPosition(
                event.target,
                mainContainerRef.value
            );
            tipText.value = text;
            // position
            tipRef.value.style.position = "absolute";
            tipRef.value.style.left = position.x + "px";
            tipRef.value.style.top = 380 + "px";
            tipRef.value.style.display = "block";
            // sub half of icon width
            tipRef.value.style.transform = "translateX(calc(-50% + 12px))";
        };

        const hideTips = () => {
            tipRef.value.style.display = "none";
        };

        // channel changes listiner
        watch(
            () => props.streamUrl,
            (streamUrl) => {
                currentVideoTime.value = recordedVideoDuration;
                play();
            }
        );
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
            mainContainerRef,
            isFullScreen,
            streamInfo,
            hideControllers,
            showIndicator,
            isMute,
            controllersRef,
            showTips,
            tipRef,
            tipText,
            hideTips,
            openVolume,
            closeVolume,
            store,
            // player options
            recordedVideoDuration,
            hideCursorTime,
            maxVolumeLevel,
            defaultVolumeLevel,
            longRewindForwardNumber,
            shortRewindForwardNumber,
        };
    },
};
</script>
// toggle visibility css
<style scoped>
.hideCursor {
    cursor: none;
}
.hide {
    transform: translateY(100%);
    opacity: 0;
}
</style>

<style module>
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
    overflow: hidden;
}

/* video */
.video {
    background-color: var(--color-black);
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
}

.fullscreen {
    object-fit: cover;
}

/* player alt */
.playerAlt {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    background: transparent;
    height: 70px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s linear;
    transform: translateY(0%);
}

.progressStick {
    margin-bottom: -8px;
    width: 100%;
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
    background-color: var(--color-black);
    align-items: center;
    max-height: 100px;
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

/*  settings indicators    */
.settingsIndicator {
    position: absolute;
    background-color: #333333;
    z-index: 2;
    right: 1rem;
    bottom: 70px;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    border-radius: var(--border-radius-sm);
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

/* Tips */
.tipContainer {
    background-color: var(--color-light-gray);
    padding: 0.5rem;
    border-radius: var(--border-radius-sm);
    z-index: 2;
    position: relative;
    display: none;
}

.tipText {
    color: var(--color-black);
    font-size: var(--font-size-sm);
}

.triangle {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-top: 10px solid var(--color-light-gray);
}

/*media querys*/

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
