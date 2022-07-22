<template>
    <div>
        <div class="dateItemLeft">
            <div
                ref="dateItemRef"
                class="datetime"
                :class="{ activeHeader: isCurrentDay }"
                @click="handleSingularOpen"
                v-if="show || !isOpen"
            >
                <font-awesome-icon icon="fa-solid fa-calendar-days" />
                <div class="date">
                    {{ readableDateFormatter(guideObject.day) }}
                </div>
                <font-awesome-icon
                    icon="fa-solid fa-circle-chevron-down"
                    class="switchDateIcon"
                    :class="{ turn: isOpen }"
                />
            </div>
        </div>
        <!-- dropdown menu -->

        <transition name="fade" appear>
            <div class="sub-menu" v-if="isOpen && show">
                <div v-for="(item, i) in guideObject.programsArray" :key="i">
                    <date-item
                        :unixtime="item.unixtime"
                        :program="item.program"
                        :isActive="item.unixtime === currentProgramUnix"
                    />
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import { ref } from "vue";
import { readableDateFormatter } from "../../../../../helpers/momentHelpers";
import DateItem from "./DateItem.vue";
import { onMounted, onBeforeUnmount } from "vue";

export default {
    props: {
        guideObject: Object,
        isOpen: Boolean,
        isCurrentDay: Boolean,
        currentProgramUnix: String,
    },
    setup({ isCurrentDay, isOpen }, { emit }) {
        const onceTrigger = ref(true);
        const dateItemRef = ref(null);
        const show = ref(false);
        const handleSingularOpen = () => {
            emit("toggleOpen");
            show.value = !show.value;
        };

        onMounted(() => {
            if (dateItemRef.value) {
                isCurrentDay && dateItemRef.value.click();
            }
        });

        onBeforeUnmount(() => {
            emit("close");
        });

        return {
            readableDateFormatter,
            show,
            handleSingularOpen,
            onceTrigger,
            dateItemRef,
            onBeforeUnmount,
        };
    },
    components: { DateItem },
};
</script>
<style>
.notActiveDateTime {
    font-size: var(--font-size-sm);
    background-color: var(--color-aside-bg);
    color: var(--color-black-soft);
    align-items: center;
    font-family: "Inter", sans-serif;
    padding: 8px;
    cursor: pointer;
    margin: 3px 0;
    column-gap: 0.5rem;
}

.notActiveDateTime:hover {
    color: var(--color-light-gray);
    background-color: var(--color-divider-bg);
}

.sub-menu {
    max-height: 425px;
    overflow: auto;
}

.sub-menu:last-child {
    border-bottom: 1px solid var(--color-border);
}

.datetime {
    font-size: var(--font-size-sm);
    background-color: #444444;
    display: flex;
    padding: 8px;
    align-items: center;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    column-gap: 0.5rem;
    border: 1px solid var(--color-border);
}

.datetime > * {
    color: var(--color-light-gray);
}

.datetime:hover {
    background-color: #36525c;
    color: white;
}

.date {
    font-size: var(--font-size-m);
    border-radius: var(--small-icon-size);
    font-weight: 500;
}

.activeHeader {
    background-color: #407385;
}

.activeHeader > div {
    color: var(--color-white);
    font-weight: 600;
}

.switchDateIcon {
    font-size: 1.25rem;
    margin-left: auto;
    transition: all 0.4s ease-in-out;
}

.turn {
    transform: rotate(180deg);
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
