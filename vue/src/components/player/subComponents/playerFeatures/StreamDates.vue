<template>
    <div :class="$style.container">
        <CustomListHeading heading="Yayın akışı" :red="true" />
        <LoadingDot v-if="store.getters.getGuideLoading" />
        <DateHeader
            v-else-if="store.getters.getGuide"
            :guideObject="guide"
            v-for="guide in processedData"
            @toggleOpen="toggleOpen"
            @close="close"
            :isOpen="isOpen"
            :isCurrentDay="currentDay?.day === guide?.day"
            :currentProgramUnix="currentProgram.unixtime"
        />
        <span v-else="!isGuideExist">Geçerli yayın bilgisi yok</span>
    </div>
</template>
<script>
import CustomListHeading from "../playerChannels/subComponents/CustomListHeading.vue";
import DateHeader from "./subComponents/DateHeader.vue";
import DateItem from "./subComponents/DateItem.vue";
import store from "../../../../store";
import { watch, ref } from "vue";
import {
    getCurrentDayGuide,
    getCurrentProgram,
    processData,
} from "../../../../helpers/momentHelpers";
import LoadingDot from "../../../loading/LoadingDot.vue";

export default {
    components: { CustomListHeading, DateHeader, DateItem, LoadingDot },
    setup() {
        const processedData = ref(null);
        const currentDay = ref("");
        const currentProgram = ref("");
        const isOpen = ref(false);
        const isGuideExist = ref(true);

        watch(
            () => store.getters.getGuide,
            (guide) => {
                try {
                    processedData.value = processData(guide);
                    currentDay.value = getCurrentDayGuide(processedData.value);
                    currentProgram.value = getCurrentProgram(currentDay.value);
                } catch (error) {
                    isGuideExist.value = ref(false);
                    store.commit("toggleGuideLoading", false);
                }
            }
        );

        const toggleOpen = () => {
            isOpen.value = !isOpen.value;
        };

        const close = () => {
            isOpen.value = false;
        };

        return {
            store,
            processedData,
            toggleOpen,
            isOpen,
            currentDay,
            currentProgram,
            close,
            isGuideExist,
        };
    },
};
</script>
<style module>
.container {
    flex: 2;
    display: flex;
    flex-direction: column;
    margin-right: 5px;
}
</style>
