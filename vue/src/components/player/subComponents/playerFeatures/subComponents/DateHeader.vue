<template>
    <div>
        <div
            class="datetime"
            :class="{ activeHeader: isCurrentDate(guideObject.day) }"
            @click="handleSingularOpen"
            v-if="show || !isOpen"
        >
            <font-awesome-icon icon="fa-solid fa-calendar-days" />
            <div class="date">
                {{ readableDateFormatter(guideObject.day) }}
            </div>
        </div>
        <!-- dropdown menu -->

        <transition name="fade" appear>
            <div class="sub-menu" v-if="isOpen && show">
                <div v-for="(item, i) in guideObject.programsArray" :key="i">
                    <date-item
                        :hour="item.hour"
                        :program="item.program"
                        :isActive="isCurrentHour(item.hour)"
                    />
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import { ref } from "vue";
import DateItem from "./DateItem.vue";
import { readableDateFormatter } from "../../../../../helpers/helpers";
import moment from "moment";

export default {
    props: {
        guideObject: Object,
        isOpen: Boolean,
    },
    setup(props, { emit }) {
        const show = ref(false);

        const handleSingularOpen = () => {
            emit("toggleOpen");
            show.value = !show.value;
        };
        const isCurrentDate = (date) => {
            return moment().day() === moment(date, "YYYY-MM-DD").day();
        };

        const isCurrentHour = (itemHour) => {
            return false;
        };

        return {
            readableDateFormatter,
            show,
            handleSingularOpen,
            isCurrentDate,
            isCurrentHour,
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
    border-left: 5px solid var(--color-success-green);
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s linear;
}
.fade-enter,
.fade-leave-to {
    height: 0;
}
</style>
