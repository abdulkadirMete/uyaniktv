<template>
    <div :class="$style.container" replace>
        <div :class="$style.resultGroup">
            <div :class="$style.resultImgContainer">
                <img
                    :src="channel.img"
                    alt="result"
                    :class="$style.resultImg"
                />
            </div>
            <router-link :to="`/canli-izle/${id}`" :class="$style.infoGroup">
                <span :class="$style.channelName">{{ channel.title }}</span>
                <div :class="$style.streamInfoGroup"></div>
            </router-link>
        </div>
        <!-- icon -->
        <font-awesome-icon
            :icon="
                selected
                    ? 'fa-solid fa-circle-check'
                    : 'fa-solid fa-circle-plus'
            "
            @click="handleSelect"
            :class="[$style.icon, { [$style.selected]: selected }]"
        />
    </div>
</template>
<script>
import { notify } from "@kyvg/vue3-notification";
import { notifyMaker } from "../../../../../helpers/helpers";
import { ref } from "vue";
import store from "../../../../../store";
export default {
    props: {
        channel: Object,
        id: Number,
    },
    setup(props) {
        const selected = ref(false);

        const handleSelect = () => {
            console.log(props.id);
            selected.value = !selected.value;
            if (selected.value) {
                notify(notifyMaker("Kanal listenize eklendi", "success"));
            } else {
                notify(notifyMaker("Kanal listenizden kaldırıldı", "warning"));
            }
        };

        return { selected, handleSelect };
    },
};
</script>
<style module>
.container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.resultGroup {
    display: flex;
    column-gap: 0.5rem;
    cursor: pointer;
}

.resultImgContainer {
    padding: 0.5rem;
    border-radius: 50%;
    background-color: var(--color-white);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-highlight-text2);
}

.resultImg {
    width: var(--small-icon-size);
    height: var(--small-icon-size);
    object-fit: cover;
}

.channelName {
    color: var(--color-divider-bg);
    font-weight: 600;
    font-size: var(--font-size-ml);
}

.streamInfoGroup {
    display: flex;
    flex-direction: column;
}

.icon {
    font-size: var(--small-icon-size);
    color: var(--color-divider-bg);
}

.selected {
    color: var(--color-success-green);
}
</style>
