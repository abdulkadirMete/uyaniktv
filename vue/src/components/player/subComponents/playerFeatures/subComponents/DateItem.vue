<template>
    <div
        ref="programRef"
        :class="[$style.container, { [$style.active]: isActive }]"
    >
        <span :class="$style.hour">{{ unixToHour(unixtime) }}</span>
        <span :class="$style.program">{{ program }}</span>
        <span
            class="material-symbols-outlined"
            v-if="isActive"
            :class="$style.activeIcon"
        >
            cast
        </span>
    </div>
</template>
<script>
import { unixToHour } from "../../../../../helpers/momentHelpers";
import { onMounted, ref } from "vue";
export default {
    props: {
        unixtime: String,
        program: String,
        isActive: Boolean,
    },

    setup({ isActive }) {
        const programRef = ref(null);

        onMounted(() => {
            isActive && programRef.value.scrollIntoView({ behavior: "smooth" });
        });

        return { unixToHour, programRef };
    },
};
</script>
<style module>
.container {
    display: flex;
    column-gap: 0.75rem;
    align-items: center;
    padding: 0.5rem;
    border-left: 1px solid var(--color-border);
    border-right: 1px solid var(--color-border);
    border-top: 1px solid var(--color-border);
    color: var(--color-divider-bg);
    cursor: pointer;
}

.container:hover {
    background-color: rgb(237, 232, 232);
}

.active {
    color: var(--color-success-green);
}
.activeIcon {
    color: var(--color-success-green);
    font-size: var(--small-icon-size);
}

.program {
    font-size: var(--font-size-xsm);
}

.hour {
    font-size: small;
}
</style>
