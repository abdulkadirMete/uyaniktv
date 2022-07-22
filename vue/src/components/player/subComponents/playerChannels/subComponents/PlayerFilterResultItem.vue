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
            <router-link
                :to="`/canli-izle/${channel.id}`"
                :class="$style.infoGroup"
            >
                <span :class="$style.channelName">{{ channel.title }}</span>
                <div :class="$style.streamInfoGroup"></div>
            </router-link>
        </div>
        <!-- icon -->
        <font-awesome-icon
            :icon="
                isItInList
                    ? 'fa-solid fa-circle-check'
                    : 'fa-solid fa-circle-plus'
            "
            @click="handleSelect"
            :class="[$style.icon, { [$style.selected]: isItInList }]"
        />
    </div>
</template>
<script>
import { notify } from "@kyvg/vue3-notification";
import { ref, onBeforeMount } from "vue";
import { notifyMaker } from "../../../../../helpers/utilHelpers";

export default {
    props: {
        channel: Object,
        favoriteChannels: Array,
    },
    setup(props, { emit }) {
        const isItInList = ref(false);
        // check channels if already listed
        onBeforeMount(() => {
            for (const channel of props.favoriteChannels) {
                if (channel.id == props.channel.id) {
                    isItInList.value = true;
                    break;
                }
            }
        });
        // add or remove as select
        const handleSelect = () => {
            if (!isItInList.value) {
                notify(notifyMaker("Kanal listenize eklendi", "success"));
                emit("addItem", props.channel);
                isItInList.value = true;
            } else {
                notify(notifyMaker("Kanal listenizden kaldırıldı", "warning"));
                emit("removeItem", props.channel.id);
                isItInList.value = false;
            }
        };

        return { handleSelect, isItInList };
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
