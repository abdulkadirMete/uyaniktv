<template>
    <div :class="$style.container">
        <div :class="$style.group">
            <img :src="channelImg" :class="$style.img" alt="channel" />
            <span :class="$style.name">{{ channelName }}</span>
        </div>
        <button v-if="!hideButton" class="btnSecondary" @click="openModal">
            Sorun Bildir
        </button>
    </div>
</template>
<script>
import store from '../../store';
export default {
    props: {
        channelImg: String,
        channelName: String,
        hideButton: Boolean,
    },
    setup(props) {
        const openModal = () => {
            store.commit("toggleReportModal", true);
        };

        return { openModal };
    },
};
</script>
<style module>
.container {
    -moz-box-shadow: 0 0 3px #ccc;
    -webkit-box-shadow: 0 0 3px #ccc;
    box-shadow: 0 0 3px rgb(211, 206, 206);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem !important;
    margin: 40px auto !important;
}

.group {
    display: flex;
    column-gap: 1rem;
    align-items: center;
}

.img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    padding: 1rem;
    border: 1px solid var(--color-border);
}

.name {
    color: var(--color-divider-bg);
    font-size: var(--font-size-xxl);
    font-weight: 500;
}
</style>
