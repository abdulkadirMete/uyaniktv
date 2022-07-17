<template>
    <router-link :class="$style.streamNow" :to="`/`">
        <div :class="$style.container">
            <!-- info -->
            <div :class="$style.info">
                <!-- start of progress -->
                <div :class="$style.progressBar">
                    <div
                        ref="progressRef"
                        :class="[$style.progressBar, $style.progressBarFill]"
                    ></div>
                </div>
                <!-- end of progress -->
                <ul :class="$style.altInfo">
                    <li :class="$style.altInfoItem">
                        <!-- yayın saati -->
                        <div :class="$style.currentStream">
                            <span :class="$style.currentStreamTitle">{{
                                channel.streamNow.title
                            }}</span>
                            <div :class="$style.currentStreamInfo">
                                <span :class="$style.itemHeading"
                                    >Yayın Aralığı:
                                </span>
                                <span :class="$style.itemValue">{{
                                    channel.streamNow.start +
                                    "-" +
                                    channel.streamNow.end
                                }}</span>
                            </div>
                        </div>
                        <hr :class="$style.divider" />
                        <!-- sonraki program  -->
                        <div :class="$style.nextStream">
                            <span :class="$style.nextStreamHeading"
                                >Sıradaki</span
                            >
                            <div :class="$style.nextStreamInfo">
                                <!-- sonraki saat -->
                                <span :class="$style.nextStreamTitle">{{
                                    channel.next + ": "
                                }}</span>
                                <span :class="$style.itemValue">{{
                                    channel.streamNow.start +
                                    "-" +
                                    channel.nextEnd
                                }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div :class="$style.channelImgContainer">
                <img
                    :src="channel.img"
                    alt="channel"
                    :class="$style.channelImg"
                />
            </div>
        </div>
    </router-link>
</template>
<script>
import { onMounted, ref } from "vue";
export default {
    props: {
        channel: Object,
        id: Number,
    },
    setup(props) {
        const progressRef = ref(null);

        onMounted(() => {
            progressRef.value.style.width =
                280 * (props.channel.progress / 100) + "px";
        });

        return { progressRef };
    },
};
</script>

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
    flex-direction: column;
    padding: 0.75rem;
    background-color: var(--color-divider-bg);
}

/* progress bar */
.progressBar {
    width: 280px;
    height: 6px;
    border-radius: var(--border-radius-sm);
    background-color: var(--color-light-gray);
    margin-bottom: 0.75rem;
    position: relative;
}

.progressBarFill {
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    background: var(--color-brand-logo-bg);
}

/* divider */

.divider {
    height: 1px;
    color: rgb(121, 113, 113);
    background: rgb(121, 113, 113);
    font-size: 0;
    border: 0;
    margin: 0 -0.75rem;
    margin-top: 0.75rem;
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
    margin-top: 0.75rem;
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
    font-size: var(--font-size-normal);
    font-weight: 500;
    color: var(--color-highlight-text2);
}

@media screen and (max-width: 568px) {
    .container {
        flex-direction: column-reverse;
    }
}

@media screen and (max-width: 468px) {
}
</style>
